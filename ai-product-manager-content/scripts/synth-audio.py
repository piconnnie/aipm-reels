#!/usr/bin/env python3
"""Synthesize an original music bed + SFX for a reel, fully locally.

Reads scene durations and sfx cues from the reel's content JSON, so every
whoosh/tick lands on the exact frame of its visual reveal. No stock music,
no network, deterministic output (fixed RNG seed).

Usage: python3 scripts/synth-audio.py <reelId>
Writes: public/audio/<reelId>-bed.wav (48 kHz, stereo, 16-bit)
"""
import json
import sys
import wave
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
ROOT = Path(__file__).resolve().parent.parent


def load_reel(reel_id):
    path = ROOT / "src" / "content" / "reels" / f"{reel_id}.json"
    return json.loads(path.read_text())


def adsr(n, a, r):
    env = np.ones(n)
    a_n, r_n = int(a * SR), int(r * SR)
    if a_n:
        env[:a_n] = np.linspace(0, 1, a_n)
    if r_n:
        env[-r_n:] *= np.linspace(1, 0, r_n)
    return env


def note_hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def pad(duration):
    """Warm, slow chord pad: Am9 - Fmaj7 - Cmaj7 - G6, 4 s each."""
    chords = [[57, 60, 64, 67, 71], [53, 57, 60, 64, 69], [48, 55, 59, 64, 67], [55, 59, 62, 64, 71]]
    n = int(duration * SR)
    out = np.zeros(n)
    seg = 4.0
    t_seg = np.arange(int(seg * SR)) / SR
    for k in range(int(np.ceil(duration / seg))):
        chord = chords[k % len(chords)]
        tone = np.zeros_like(t_seg)
        for m in chord:
            f = note_hz(m)
            for detune in (-0.12, 0.12):
                ff = f * 2 ** (detune / 12)
                tone += np.sin(2 * np.pi * ff * t_seg) + 0.25 * np.sin(2 * np.pi * 2 * ff * t_seg)
        tone *= adsr(len(t_seg), 0.9, 1.2)
        start = int(k * seg * SR)
        end = min(n, start + len(tone))
        out[start:end] += tone[: end - start]
    sos = butter(2, 1800, "low", fs=SR, output="sos")
    out = sosfilt(sos, out)
    return out / (np.max(np.abs(out)) + 1e-9)


def pulse(duration, bpm=100, start=2.9):
    """Soft sub pulse on the beat + very quiet filtered hat on offbeats."""
    n = int(duration * SR)
    out = np.zeros(n)
    beat = 60 / bpm
    kick_t = np.arange(int(0.18 * SR)) / SR
    kick = np.sin(2 * np.pi * (55 + 60 * np.exp(-kick_t * 30)) * kick_t) * np.exp(-kick_t * 18)
    rng = np.random.default_rng(7)
    hat = rng.standard_normal(int(0.05 * SR)) * np.exp(-np.arange(int(0.05 * SR)) / SR * 90)
    hat = sosfilt(butter(2, 7000, "high", fs=SR, output="sos"), hat)
    t = start
    i = 0
    while t < duration - 1.0:
        s = int(t * SR)
        e = min(n, s + len(kick))
        out[s:e] += kick[: e - s] * 0.9
        hs = int((t + beat / 2) * SR)
        he = min(n, hs + len(hat))
        if hs < n:
            out[hs:he] += hat[: he - hs] * 0.18
        t += beat
        i += 1
    return out


def sfx(kind):
    rng = np.random.default_rng({"whoosh": 1, "tick": 2, "chime": 3, "low": 4, "impact": 5}[kind])
    if kind == "whoosh":
        d = 0.38
        n = int(d * SR)
        noise = rng.standard_normal(n)
        # Rising band-pass sweep built from short filtered blocks.
        out = np.zeros(n)
        blocks = 12
        for b in range(blocks):
            s, e = b * n // blocks, (b + 1) * n // blocks
            fc = 500 + 3500 * (b / blocks)
            sos = butter(2, [fc * 0.7, fc * 1.3], "band", fs=SR, output="sos")
            out[s:e] = sosfilt(sos, noise[s:e])
        env = np.sin(np.linspace(0, np.pi, n)) ** 2
        return out * env * 2.2
    if kind == "tick":
        d = 0.06
        t = np.arange(int(d * SR)) / SR
        return np.sin(2 * np.pi * 1760 * t) * np.exp(-t * 70) * 0.55
    if kind == "chime":
        d = 0.9
        t = np.arange(int(d * SR)) / SR
        return (np.sin(2 * np.pi * 880 * t) + 0.6 * np.sin(2 * np.pi * 1318.5 * t)) * np.exp(-t * 4.5) * 0.45
    if kind == "low":
        d = 0.5
        t = np.arange(int(d * SR)) / SR
        f = 220 * (0.75 ** (t / d))
        phase = 2 * np.pi * np.cumsum(f) / SR
        return np.sin(phase) * np.exp(-t * 5) * 0.6
    if kind == "impact":
        d = 0.35
        t = np.arange(int(d * SR)) / SR
        thump = np.sin(2 * np.pi * (48 + 40 * np.exp(-t * 25)) * t) * np.exp(-t * 11)
        noise = sosfilt(butter(2, 1200, "low", fs=SR, output="sos"), rng.standard_normal(len(t))) * np.exp(-t * 30) * 0.4
        return (thump + noise) * 0.9
    raise ValueError(kind)


def limiter(x, ceiling_db=-2.5, release_s=0.08, look_s=0.005):
    """Peak limiter with short look-ahead window and smoothed release."""
    ceiling = 10 ** (ceiling_db / 20)
    level = np.max(np.abs(x), axis=1)
    win = max(1, int(look_s * SR))
    # Look-ahead: running max over the next `win` samples.
    padded = np.concatenate([level, np.zeros(win)])
    ahead = np.lib.stride_tricks.sliding_window_view(padded, win + 1).max(axis=1)[: len(level)]
    target = np.minimum(1.0, ceiling / np.maximum(ahead, 1e-9))
    # Instant attack, exponential release (implemented as a one-pole on 1-gain).
    alpha = np.exp(-1.0 / (release_s * SR))
    reduction = sosfilt(np.array([[1 - alpha, 0, 0, 1, -alpha, 0]]), 1 - target)
    gain = np.minimum(target, 1 - np.minimum(reduction, 1 - target))
    return x * gain[:, None]


def master(stereo, target_rms_db=-19.0):
    """Bring the mix to a consistent loudness, then limit peaks (no clipping)."""
    rms = np.sqrt(np.mean(stereo ** 2))
    stereo = stereo * (10 ** (target_rms_db / 20) / (rms + 1e-12))
    stereo = limiter(stereo)
    return np.clip(stereo, -0.999, 0.999)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    reel_id = sys.argv[1]
    reel = load_reel(reel_id)
    fps = reel["fps"]
    total_frames = sum(s["durationInFrames"] for s in reel["scenes"])
    duration = total_frames / fps
    n = int(round(duration * SR))

    music = pad(duration) * 0.30 + pulse(duration) * 0.22
    music = music[:n]
    # Fade the bed in quickly and out over the last 1.2 s.
    music *= adsr(n, 0.25, 1.2)

    fx = np.zeros(n)
    start = 0
    cues = []
    for scene in reel["scenes"]:
        for cue in scene.get("sfx", []):
            t = (start + cue["at"]) / fps
            s = int(t * SR)
            clip = sfx(cue["kind"])
            e = min(n, s + len(clip))
            if s < n:
                fx[s:e] += clip[: e - s]
                cues.append((round(t, 3), cue["kind"]))
        start += scene["durationInFrames"]

    # Duck the music slightly under each SFX for clarity.
    duck = np.ones(n)
    for t, _ in cues:
        s = int(t * SR)
        e = min(n, s + int(0.25 * SR))
        duck[s:e] = np.minimum(duck[s:e], 0.8)
    mix_mono = music * duck + fx * 0.5

    # Gentle stereo width: tiny delay on the right channel for the bed only.
    delay = int(0.012 * SR)
    right_bed = np.concatenate([np.zeros(delay), (music * duck)[:-delay]])
    left = mix_mono
    right = right_bed + fx * 0.5

    stereo = np.stack([left, right], axis=1)
    stereo = master(stereo)

    out = ROOT / "public" / "audio" / f"{reel_id}-bed.wav"
    out.parent.mkdir(parents=True, exist_ok=True)
    pcm = (stereo * 32767).astype(np.int16)
    with wave.open(str(out), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"Wrote {out.relative_to(ROOT)} ({duration:.2f}s, {len(cues)} SFX cues)")


if __name__ == "__main__":
    main()

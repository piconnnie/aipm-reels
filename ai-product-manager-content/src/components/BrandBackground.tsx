import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../brand/tokens';

// Calm navy field with a faint engineering grid and one slow indigo glow.
// Deterministic: the glow drifts as a pure function of the frame.
export const BrandBackground: React.FC<{glow?: boolean}> = ({glow = true}) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const drift = interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1]);
  const gx = 78 - drift * 18;
  const gy = 18 + drift * 10;
  const step = 72;
  const vLines = Math.ceil(width / step);
  const hLines = Math.ceil(height / step);

  return (
    <AbsoluteFill style={{backgroundColor: colors.navy}}>
      {glow ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(900px 900px at ${gx}% ${gy}%, rgba(91,92,240,0.20), rgba(91,92,240,0) 70%)`,
          }}
        />
      ) : null}
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: vLines}, (_, i) => (
          <line key={`v${i}`} x1={i * step} y1={0} x2={i * step} y2={height} stroke={colors.offWhite} strokeOpacity={0.035} strokeWidth={1} />
        ))}
        {Array.from({length: hLines}, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * step} x2={width} y2={i * step} stroke={colors.offWhite} strokeOpacity={0.035} strokeWidth={1} />
        ))}
      </svg>
      <AbsoluteFill
        style={{background: 'linear-gradient(180deg, rgba(11,16,32,0) 60%, rgba(11,16,32,0.85) 100%)'}}
      />
    </AbsoluteFill>
  );
};

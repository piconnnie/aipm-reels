import React from 'react';
import {colors, fonts, safe} from '../brand/tokens';

// Proposed AIPM monogram (vector). Not a registered or approved trademark.
export const Monogram: React.FC<{size?: number}> = ({size = 56}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <rect x="4" y="4" width="112" height="112" rx="26" fill={colors.navy} stroke={colors.indigo} strokeWidth="5" />
    <text
      x="60"
      y="72"
      textAnchor="middle"
      fontFamily={fonts.display}
      fontWeight={700}
      fontSize="34"
      letterSpacing="-1"
      fill={colors.offWhite}
    >
      AIPM
    </text>
    <circle cx="92" cy="30" r="7" fill={colors.cyan} />
  </svg>
);

// Small persistent brand label inside the top of the safe area.
export const BrandSignature: React.FC<{opacity?: number}> = ({opacity = 1}) => (
  <div
    style={{
      position: 'absolute',
      top: safe.top,
      left: safe.left,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      opacity,
    }}
  >
    <div style={{width: 10, height: 10, borderRadius: 2, background: colors.cyan}} />
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 24,
        letterSpacing: 4,
        color: colors.slate,
        fontWeight: 700,
      }}
    >
      AI PRODUCT MANAGER
    </span>
  </div>
);

import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../brand/tokens';
import {useColors} from '../brand/theme';
import {Monogram} from './BrandSignature';
import {enter, riseStyle} from './motion';

// Subtle end-card branding: monogram + name + promise. Short, never a long logo sting.
export const EndCard: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const colors = useColors();
  const {fps} = useVideoConfig();
  const p = enter(frame, fps, start);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24, ...riseStyle(p, 20)}}>
      <Monogram size={84} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <span style={{fontFamily: fonts.mono, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: colors.offWhite}}>
          AI PRODUCT MANAGER
        </span>
        <span style={{fontFamily: fonts.body, fontSize: 30, color: colors.slate}}>Practical AI product lessons</span>
      </div>
    </div>
  );
};

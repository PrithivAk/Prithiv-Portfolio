import React from 'react';

interface MechanicalGearProps {
  size?: number;
  teeth?: number;
  speedSec?: number;
  direction?: 'cw' | 'ccw';
  color?: string;
  className?: string;
}

export const MechanicalGear: React.FC<MechanicalGearProps> = ({
  size = 64,
  teeth = 12,
  speedSec = 10,
  direction = 'cw',
  color = '#06b6d4',
  className = '',
}) => {
  const outerRadius = size / 2;
  const innerRadius = outerRadius * 0.75;
  const holeRadius = outerRadius * 0.3;

  const points: string[] = [];
  const angleStep = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const angle1 = i * angleStep;
    const angle2 = angle1 + angleStep * 0.35;
    const angle3 = angle1 + angleStep * 0.65;
    const angle4 = (i + 1) * angleStep;

    // Inner trough
    const x1 = outerRadius + innerRadius * Math.cos(angle1);
    const y1 = outerRadius + innerRadius * Math.sin(angle1);
    // Outer tooth top left
    const x2 = outerRadius + outerRadius * Math.cos(angle2);
    const y2 = outerRadius + outerRadius * Math.sin(angle2);
    // Outer tooth top right
    const x3 = outerRadius + outerRadius * Math.cos(angle3);
    const y3 = outerRadius + outerRadius * Math.sin(angle3);
    // Inner trough right
    const x4 = outerRadius + innerRadius * Math.cos(angle4);
    const y4 = outerRadius + innerRadius * Math.sin(angle4);

    points.push(`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
  }

  const animClass = direction === 'cw' ? 'animate-spin' : 'animate-spin-reverse';

  return (
    <div
      className={`inline-block relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`w-full h-full ${animClass}`}
        style={{
          animationDuration: `${speedSec}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {/* Gear Body */}
        <polygon
          points={points.join(' ')}
          fill="rgba(15, 23, 42, 0.9)"
          stroke={color}
          strokeWidth="1.5"
        />
        {/* Center Shaft Hole */}
        <circle
          cx={outerRadius}
          cy={outerRadius}
          r={holeRadius}
          fill="rgba(2, 6, 23, 0.95)"
          stroke={color}
          strokeWidth="1.5"
        />
        {/* Center Accent Pin */}
        <circle cx={outerRadius} cy={outerRadius} r={holeRadius * 0.4} fill={color} />
      </svg>
    </div>
  );
};

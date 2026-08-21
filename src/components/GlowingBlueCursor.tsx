import React, { useEffect, useState } from 'react';

export const GlowingBlueCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Blue Glowing Light Aura Ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(6, 182, 212, 0.1) 60%, transparent 100%)',
          border: '1.5px solid rgba(0, 240, 255, 0.7)',
          boxShadow: isHovered
            ? '0 0 25px rgba(0, 240, 255, 0.8), inset 0 0 15px rgba(0, 240, 255, 0.4)'
            : '0 0 15px rgba(0, 240, 255, 0.5)',
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 0.75 : 1})`,
        }}
      />

      {/* Center Bright Blue Pointer Dot */}
      <div
        className="fixed pointer-events-none z-[10000] rounded-full -translate-x-1/2 -translate-y-1/2 bg-cyan-400"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '8px',
          height: '8px',
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #06b6d4, 0 0 30px #3b82f6',
        }}
      />
    </>
  );
};

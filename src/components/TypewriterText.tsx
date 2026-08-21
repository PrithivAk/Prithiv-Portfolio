import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/audioSynth';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per char
  delay?: number; // ms initial delay
  cursor?: boolean;
  cursorColor?: 'cyan' | 'amber' | 'emerald' | 'blue' | 'purple' | 'white';
  className?: string;
  as?: React.ElementType;
  triggerOnScroll?: boolean;
  playSound?: boolean;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 18,
  delay = 0,
  cursor = true,
  cursorColor = 'cyan',
  className = '',
  as: Component = 'span',
  triggerOnScroll = true,
  playSound = false,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(!triggerOnScroll);

  // Intersection observer to start typing on scroll
  useEffect(() => {
    if (!triggerOnScroll || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll, hasStarted]);

  // Typing logic
  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);

      const typeNextChar = () => {
        if (index < text.length) {
          const nextIndex = Math.min(index + 2, text.length); // speed boost for longer text
          setDisplayedText(text.slice(0, nextIndex));
          index = nextIndex;

          if (playSound && nextIndex % 4 === 0) {
            soundFX.playMechanicalClick(900);
          }

          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setDisplayedText(text);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, hasStarted, playSound, onComplete]);

  const getCursorColorClass = () => {
    switch (cursorColor) {
      case 'amber':
        return 'bg-amber-400 text-amber-400 shadow-[0_0_8px_#f59e0b]';
      case 'emerald':
        return 'bg-emerald-400 text-emerald-400 shadow-[0_0_8px_#10b981]';
      case 'blue':
        return 'bg-blue-400 text-blue-400 shadow-[0_0_8px_#3b82f6]';
      case 'purple':
        return 'bg-purple-400 text-purple-400 shadow-[0_0_8px_#a855f7]';
      case 'white':
        return 'bg-white text-white shadow-[0_0_8px_#ffffff]';
      case 'cyan':
      default:
        return 'bg-cyan-400 text-cyan-400 shadow-[0_0_8px_#00f0ff]';
    }
  };

  return (
    <Component ref={containerRef} className={`inline-relative font-mono ${className}`}>
      <span>{displayedText}</span>
      {cursor && (
        <span
          className={`inline-block w-[2px] h-[1em] ml-0.5 align-baseline ${getCursorColorClass()} ${
            isTyping ? 'animate-pulse' : 'animate-ping opacity-75'
          }`}
          style={{ verticalAlign: '-0.15em' }}
        />
      )}
    </Component>
  );
};

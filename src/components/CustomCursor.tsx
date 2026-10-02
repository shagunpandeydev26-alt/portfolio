import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useReducedMotion } from '../hooks/usePortfolio';

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useSpring(-100, { stiffness: 450, damping: 30 });
  const mouseY = useSpring(-100, { stiffness: 450, damping: 30 });

  useEffect(() => {
    // Detect touch-only device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element for data attributes
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]') as HTMLElement | null;
      const clickableEl = target?.closest('a, button, input, textarea, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant(text ? 'text' : 'hover');
      } else if (clickableEl) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || reducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorVariant === 'text' ? 1 : cursorVariant === 'hover' ? 1.5 : 1,
          width: cursorText ? 'auto' : cursorVariant === 'hover' ? 36 : 10,
          height: cursorText ? 'auto' : cursorVariant === 'hover' ? 36 : 10,
          backgroundColor: cursorText
            ? 'rgba(15, 23, 42, 0.9)'
            : cursorVariant === 'hover'
            ? 'rgba(56, 189, 248, 0.15)'
            : '#38bdf8',
          borderColor: cursorVariant === 'hover' ? 'rgba(56, 189, 248, 0.8)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-transparent backdrop-blur-xs px-2.5 py-1 text-center font-mono text-[10px] font-semibold tracking-wider text-sky-300 shadow-sm"
      >
        {cursorText && (
          <span className="whitespace-nowrap uppercase tracking-widest">{cursorText}</span>
        )}
      </motion.div>
    </div>
  );
};

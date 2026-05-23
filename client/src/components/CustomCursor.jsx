import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos,      setPos]      = useState({ x: -100, y: -100 });
  const [isHover,  setIsHover]  = useState(false);
  const [isClick,  setIsClick]  = useState(false);
  const [isTouch,  setIsTouch]  = useState(false);

  useEffect(() => {
    // Detect touch device — hide cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const move  = e => setPos({ x: e.clientX, y: e.clientY });
    const down  = () => setIsClick(true);
    const up    = () => setIsClick(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);

    // Detect hoverable elements
    const addListeners = () => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover], input, textarea');
      els.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHover(true));
        el.addEventListener('mouseleave', () => setIsHover(false));
      });
    };
    addListeners();

    // Re-run when DOM changes (SPA route changes)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isClick ? 0.5 : isHover ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring — lags slightly behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isClick ? 0.8 : isHover ? 1.8 : 1,
          opacity: isHover ? 0.6 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
      >
        <div
          className="w-10 h-10 rounded-full border border-white"
          style={{
            boxShadow: isHover ? '0 0 20px rgba(255,255,255,0.15)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </motion.div>

      {/* Glow trail — very slow, large, glowy */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        animate={{
          x: pos.x - 80,
          y: pos.y - 80,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
      >
        <div
          className="w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  );
}

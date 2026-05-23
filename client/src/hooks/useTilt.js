import { useRef, useCallback } from 'react';

/**
 * Returns ref + event handlers that apply a 3D tilt CSS transform on mouse move.
 * @param {number} max - Maximum tilt angle in degrees (default 12)
 */
export function useTilt(max = 12) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) *  max;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = 'transform 0.1s ease';
  }, [max]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = 'transform 0.4s ease';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

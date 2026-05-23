import { useRef, useCallback } from 'react';

/**
 * Makes a button magnetically follow the cursor slightly on hover.
 * @param {number} strength - How far it follows (default 0.3)
 */
export function useMagnet(strength = 0.3) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width  / 2);
    const y = e.clientY - (rect.top  + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    el.style.transition = 'transform 0.2s ease';
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

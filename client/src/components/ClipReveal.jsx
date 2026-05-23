import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Reveals text with a clip-path wipe from left to right.
 * Use this for section headings.
 */
export default function ClipReveal({ children, className = '', delay = 0 }) {
  const { ref, visible } = useScrollAnimation(0.2);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
        animate={visible
          ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
          : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
        }
        transition={{ duration: 0.9, delay, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

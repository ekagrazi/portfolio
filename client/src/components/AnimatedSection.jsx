import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const { ref, visible } = useScrollAnimation();

  const variants = {
    up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    fade:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  };

  const v = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

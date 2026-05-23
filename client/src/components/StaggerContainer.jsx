import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Wraps children and staggers their entrance animations.
 * Each direct child gets a staggered delay.
 */
export default function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.07,
}) {
  const { ref, visible } = useScrollAnimation(0.05);

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };
  const item = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
}

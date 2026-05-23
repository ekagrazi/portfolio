import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          exit={{   opacity: 0, y: 16  }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center
                     border border-white/15 bg-dark-800/80 backdrop-blur-sm
                     text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

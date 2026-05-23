import { motion } from 'framer-motion';

export default function NebulaBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Top Left Orb */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 80, -40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-15%] left-[-10%] w-[60vw] max-w-[800px] aspect-square bg-white/[0.03] rounded-full blur-[120px]"
      />
      
      {/* Bottom Right Orb */}
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, -60, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] max-w-[700px] aspect-square bg-white/[0.02] rounded-full blur-[100px]"
      />
      
      {/* Center Subtle Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] left-[30%] w-[30vw] max-w-[400px] aspect-square bg-white/[0.015] rounded-full blur-[80px]"
      />
    </div>
  );
}

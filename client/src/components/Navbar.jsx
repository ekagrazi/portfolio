import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMagnet } from '../hooks/useMagnet';

const links = [
  { to: '/',         label: 'HOME'     },
  { to: '/resume',   label: 'RESUME'   },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/skills',   label: 'SKILLS'   },
  { to: '/about',    label: 'ABOUT'    },
  { to: '/contact',  label: 'CONTACT'  },
];

function NavLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`relative text-xs tracking-[0.15em] transition-colors duration-200
                  group ${isActive ? 'text-white' : 'text-white/30 hover:text-white'}`}
    >
      {label}
      {/* Animated underline */}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  // Hide the global navbar entirely on all admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-dark-900/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-white text-sm tracking-widest uppercase
                     hover:text-white/60 transition-colors duration-200"
        >
          Ekagra<span className="text-white/30">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              label={label}
              isActive={location.pathname === to}
            />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden text-white/40 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
              : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
            }
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-dark-900/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={to}
                    className={`text-xs tracking-[0.15em] transition-colors py-1 block
                                ${location.pathname === to ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

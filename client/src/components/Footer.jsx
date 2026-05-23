import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';
import toast from 'react-hot-toast';
import { owner } from '../data/portfolioData';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(owner.email);
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const location = window.location;
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white text-sm font-medium tracking-wide">
              Ekagra Gupta<span className="text-white/20">.</span>
            </p>
            <p className="text-white/20 text-xs mt-1">{owner.role}</p>
          </motion.div>

          {/* Center — copy email */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={copyEmail}
            className="flex items-center gap-2 text-white/25 hover:text-white text-xs transition-colors duration-200 group"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{owner.email}</span>
          </motion.button>

          {/* Right — social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a
              href={owner.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={owner.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${owner.email}`}
              className="text-white/20 hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-white/5 text-center"
        >
          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Ekagra Gupta. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

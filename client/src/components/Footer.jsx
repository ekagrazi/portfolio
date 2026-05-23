import { useState } from 'react';
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
          <div>
            <p className="text-white text-sm font-medium tracking-wide">
              Ekagra Gupta<span className="text-white/20">.</span>
            </p>
            <p className="text-white/20 text-xs mt-1">{owner.role}</p>
          </div>

          {/* Center — copy email */}
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 text-white/25 hover:text-white text-xs transition-colors duration-200 group"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{owner.email}</span>
          </button>

          {/* Right — social links */}
          <div className="flex items-center gap-4">
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
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Ekagra Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

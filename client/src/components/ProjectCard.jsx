import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
import { useTilt } from '../hooks/useTilt';

export default function ProjectCard({ project, index, compact = false }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useTilt(compact ? 6 : 8);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className="group border border-white/5 hover:border-white/15
                 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Thumbnail image area */}
      <div className="relative overflow-hidden bg-dark-700 aspect-video flex-shrink-0">
        {/* Badge */}
        {project.badge && (
          <span className="absolute top-3 left-3 z-10 text-xs border border-white/20
                           bg-dark-900/80 backdrop-blur-sm text-white/60 px-2 py-0.5
                           tracking-wide">
            {project.badge}
          </span>
        )}
        {/* Number */}
        <span className="absolute top-3 right-3 z-10 text-white/20 text-xs
                         font-light tracking-[0.2em]">
          {project.number}
        </span>

        {/* Image or placeholder */}
        {project.image && !project.image.includes('placeholder') ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105
                       transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center
                          border-b border-white/5">
            <span className="text-white/10 text-xs tracking-widest uppercase">
              Image Coming Soon
            </span>
          </div>
        )}

        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-2 border border-white/30 text-white/70 hover:text-white
                         hover:border-white transition-colors duration-200"
              title="View on GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-2 border border-white/30 text-white/70 hover:text-white
                         hover:border-white transition-colors duration-200"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Subtitle */}
        <p className="text-white/25 text-xs tracking-[0.18em] uppercase mb-1.5">
          {project.subtitle}
        </p>

        {/* Title */}
        <h3 className="text-white font-semibold text-sm md:text-base leading-snug mb-2
                       group-hover:text-white/80 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-white/35 text-xs leading-relaxed mb-3 flex-1">
          {project.description.length > 120
            ? project.description.slice(0, 120) + '…'
            : project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 border border-white/8
                                      text-white/30 font-light">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-0.5 text-white/20 font-light">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Expand button for long description */}
        {project.longDesc && (
          <>
            <button
              onClick={() => setExpanded(p => !p)}
              className="flex items-center gap-1 text-xs text-white/25 hover:text-white/60
                         transition-colors duration-200 mb-3 w-fit"
            >
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              {expanded ? 'Less' : 'View details'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/25 text-xs leading-relaxed mb-3
                                border-l border-white/10 pl-3">
                    {project.longDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Year */}
        <p className="text-white/15 text-xs mt-auto">{project.year}</p>
      </div>
    </motion.article>
  );
}

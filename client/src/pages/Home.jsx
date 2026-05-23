import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/Icons';

import SphereBg          from '../components/SphereBg';
import AnimatedSection   from '../components/AnimatedSection';
import StaggerContainer  from '../components/StaggerContainer';
import ClipReveal        from '../components/ClipReveal';
import Marquee           from '../components/Marquee';
import ProjectCard       from '../components/ProjectCard';
import PageTransition    from '../components/PageTransition';
import { useMagnet }     from '../hooks/useMagnet';
import { useTypewriter } from '../hooks/useTypewriter';
import { owner, projects } from '../data/portfolioData';

function MagneticBtn({ to, href, children, external = false }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnet(0.25);

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      <span className="btn">
        {children}
      </span>
    </div>
  );

  if (to)   return <Link to={to}>{inner}</Link>;
  if (href) return <a href={href} target={external ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>;
  return inner;
}

const techStrip1 = [
  'Python', 'React', 'Node.js', 'FastAPI', 'PyTorch', 'Flask',
  'MongoDB', 'Three.js', 'MediaPipe', 'Scikit-Learn', 'Cybersecurity',
];
const techStrip2 = [
  'Machine Learning', 'BiLSTM', 'WebSockets', 'Electron', 'PyQt6',
  'REST APIs', 'OWASP ZAP', 'Gen AI', 'Docker', 'Git',
];

export default function Home() {
  const featured = projects.slice(0, 3);
  const role     = useTypewriter(
    owner.typewriterRoles,
    75, 45, 2000
  );

  return (
    <PageTransition>
      <main>
        <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 overflow-hidden grain-overlay">
          <SphereBg />

          {/* Radial gradient vignette over sphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 70% at 70% 50%, transparent 0%, #0a0a0a 70%)',
              zIndex: 1,
            }}
          />

          <div className="max-w-6xl mx-auto w-full relative" style={{ zIndex: 2 }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/25 text-xs tracking-[0.35em] uppercase mb-6"
            >
              {owner.subrole}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white
                         leading-none mb-3 tracking-tight"
            >
              {owner.name}
              <span className="text-white/20">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-10 md:h-14 flex items-center mb-4"
            >
              <span className="text-xl md:text-3xl text-white/50 font-light">
                {role}
                <span className="inline-block w-0.5 h-6 md:h-8 bg-white/50 ml-1 animate-pulse" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <MagneticBtn to="/projects">
                <span>View Projects</span>
                <span><ArrowRight size={14} /></span>
              </MagneticBtn>
              <MagneticBtn to="/contact">
                <span>Contact Me</span>
              </MagneticBtn>
              <MagneticBtn href={owner.social.github} external>
                <span><Github size={14} /></span>
                <span>GitHub</span>
              </MagneticBtn>
              <MagneticBtn href={owner.social.linkedin} external>
                <span><Linkedin size={14} /></span>
                <span>LinkedIn</span>
              </MagneticBtn>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href={`mailto:${owner.email}`}
                className="flex items-center gap-2 text-white/25 hover:text-white text-xs transition-colors duration-200">
                <Mail size={12} /> {owner.email}
              </a>
              <a href={`tel:${owner.phone}`}
                className="flex items-center gap-2 text-white/25 hover:text-white text-xs transition-colors duration-200">
                <Phone size={12} /> {owner.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-3"
            >
              {['Full-Stack', 'AWS', 'GenAI', 'Security'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                  className="px-4 py-2 border border-white/15 text-white/50 text-xs
                             tracking-[0.2em] uppercase font-light
                             hover:border-white/40 hover:text-white/80
                             transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="py-0">
          <Marquee items={techStrip1} />
          <Marquee items={techStrip2} reverse />
        </div>

        <section className="section">
          <AnimatedSection>
            <p className="section-label">Selected Work</p>
            <ClipReveal>
              <h2 className="section-heading">Projects</h2>
            </ClipReveal>
            <div className="flex items-center justify-between">
              <p className="section-sub">Here's what I've built.</p>
              <Link to="/projects" className="btn-sm mb-12">
                <span>All 7 projects</span>
                <span><ArrowRight size={12} /></span>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} index={i} compact />
              </AnimatedSection>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="section">
          <AnimatedSection className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label">Who I am</p>
              <ClipReveal>
                <h2 className="section-heading">About</h2>
              </ClipReveal>
              <p className="text-white/40 text-sm leading-loose mb-8">{owner.bio}</p>
              <Link to="/about" className="btn-sm">
                <span>More about me</span>
                <span><ArrowRight size={12} /></span>
              </Link>
            </div>

            <div>
              <p className="section-label">Expertise</p>
              <ClipReveal delay={0.1}>
                <h2 className="section-heading">Skills</h2>
              </ClipReveal>

              <StaggerContainer className="flex flex-wrap gap-2 mb-8" staggerDelay={0.04}>
                {['Python','React','Node.js','FastAPI','PyTorch','MediaPipe',
                  'Scikit-Learn','Flask','MongoDB','Wireshark','OWASP ZAP','Git'].map(s => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </StaggerContainer>

              <Link to="/skills" className="btn-sm">
                <span>Full skill set</span>
                <span><ArrowRight size={12} /></span>
              </Link>
            </div>
          </AnimatedSection>
        </section>

        <div className="divider" />

        <AnimatedSection>
          <section className="section text-center">
            <p className="section-label">Open to opportunities</p>
            <ClipReveal className="mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Let's build something.
              </h2>
            </ClipReveal>
            <p className="text-white/30 text-sm mb-10 max-w-md mx-auto">
              Internships, collaborations, open-source, freelance — interested in all of it.
            </p>
            <MagneticBtn to="/contact">
              <span>Get in touch</span>
              <span><ArrowRight size={14} /></span>
            </MagneticBtn>
          </section>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}

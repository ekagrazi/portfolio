import { useState } from 'react';
import AnimatedSection  from '../components/AnimatedSection';
import ClipReveal       from '../components/ClipReveal';
import ProjectCard      from '../components/ProjectCard';
import PageTransition   from '../components/PageTransition';
import { projects }     from '../data/portfolioData';
import ShootingStars    from '../components/ShootingStars';

const FILTERS = ['All', 'AI', 'Security', 'ML', 'Java', 'GUI', 'Automation'];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.badge?.toLowerCase().includes(active.toLowerCase()));

  return (
    <PageTransition>
      <ShootingStars />
      <main className="pt-24">
        <div className="section">
          <AnimatedSection>
            <p className="section-label">Portfolio</p>
            <ClipReveal><h1 className="section-heading">All Projects</h1></ClipReveal>
            <p className="section-sub">
              7 projects spanning AI, cybersecurity, machine learning, and desktop engineering.
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-xs px-4 py-2 border tracking-wide transition-all duration-200 ${
                  active === f
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 text-white/40 hover:border-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} index={i} compact />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

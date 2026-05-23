import AnimatedSection  from '../components/AnimatedSection';
import ClipReveal       from '../components/ClipReveal';
import StaggerContainer from '../components/StaggerContainer';
import SkillGroup       from '../components/SkillGroup';
import PageTransition   from '../components/PageTransition';
import { skillGroups }  from '../data/portfolioData';
import ShootingStars    from '../components/ShootingStars';

export default function Skills() {
  return (
    <PageTransition>
      <ShootingStars />
      <main className="pt-24">
        <div className="section">
          <AnimatedSection>
            <p className="section-label">Expertise</p>
            <ClipReveal><h1 className="section-heading">Skills</h1></ClipReveal>
            <p className="section-sub">
              Technologies I use to build AI systems, security tools, and full-stack applications.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {skillGroups.map(group => (
              <SkillGroup key={group.label} group={group} />
            ))}
          </StaggerContainer>
        </div>
      </main>
    </PageTransition>
  );
}

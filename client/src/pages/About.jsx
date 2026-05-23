import AnimatedSection   from '../components/AnimatedSection';
import ClipReveal        from '../components/ClipReveal';
import StaggerContainer  from '../components/StaggerContainer';
import EducationCard     from '../components/EducationCard';
import ExperienceCard    from '../components/ExperienceCard';
import AchievementCard   from '../components/AchievementCard';
import CertCard          from '../components/CertCard';
import PageTransition    from '../components/PageTransition';
import { owner, education, experience, achievements, certifications } from '../data/portfolioData';
import ShootingStars    from '../components/ShootingStars';

export default function About() {
  return (
    <PageTransition>
      <ShootingStars />
      <main className="pt-24">
        <div className="section">
          <AnimatedSection>
            <p className="section-label">Background</p>
            <ClipReveal><h1 className="section-heading">About Me</h1></ClipReveal>
            <p className="text-white/40 text-sm leading-loose max-w-2xl mb-4">{owner.bio}</p>
            <p className="text-white/25 text-xs">{owner.location}</p>
          </AnimatedSection>
        </div>

        <div className="divider" />

        <div className="section">
          <AnimatedSection>
            <p className="section-label">Academic</p>
            <ClipReveal><h2 className="section-heading">Education</h2></ClipReveal>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4" staggerDelay={0.08}>
            {education.map((item, i) => (
              <EducationCard key={i} item={item} />
            ))}
          </StaggerContainer>
        </div>

        <div className="divider" />

        <div className="section">
          <AnimatedSection>
            <p className="section-label">Work</p>
            <ClipReveal><h2 className="section-heading">Experience</h2></ClipReveal>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4" staggerDelay={0.08}>
            {experience.map((item, i) => (
              <ExperienceCard key={i} item={item} />
            ))}
          </StaggerContainer>
        </div>

        <div className="divider" />

        <div className="section">
          <AnimatedSection>
            <p className="section-label">Recognition</p>
            <ClipReveal><h2 className="section-heading">Achievements</h2></ClipReveal>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {achievements.map((item, i) => (
              <AchievementCard key={i} item={item} />
            ))}
          </StaggerContainer>
        </div>

        <div className="divider" />

        <div className="section">
          <AnimatedSection>
            <p className="section-label">Credentials</p>
            <ClipReveal><h2 className="section-heading">Certifications</h2></ClipReveal>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
            {certifications.map((cert, i) => (
              <CertCard key={i} cert={cert} />
            ))}
          </StaggerContainer>
        </div>
      </main>
    </PageTransition>
  );
}

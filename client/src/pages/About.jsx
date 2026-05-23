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
          <AnimatedSection className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="flex-1">
              <p className="section-label">Background</p>
              <ClipReveal><h1 className="section-heading">About Me</h1></ClipReveal>
              <p className="text-white/40 text-sm leading-loose mb-4">{owner.bio}</p>
              <p className="text-white/25 text-xs">{owner.location}</p>
            </div>
            
            <div className="w-48 md:w-64 shrink-0 rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl">
              {/* Subtle dark tint that clears on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src="/images/profilePhoto.webp" 
                alt={owner.name}
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>
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

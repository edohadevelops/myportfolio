import { useEffect } from 'react';
import {
  AboutSection,
  ContactSection,
  FooterSection,
  HeroSection,
  LandingNavbar,
  ProjectSection,
  SkillsSection,
  StackSection,
  WorkExperienceSection,
  EducationSection,
  InterestsSection,
  ServicesSection,
} from '../../../components';
import { useTrack } from '../../../context/TrackContext';
import './style.css';

const Landing = ({ initialTrack }) => {
  const { setActiveTrack } = useTrack();

  // Set track from URL on mount
  useEffect(() => {
    if (initialTrack) setActiveTrack(initialTrack);
  }, [initialTrack]);

  return (
    <div className="landing-page">
      <LandingNavbar />
      <HeroSection />
      <div className="landing-page-limit"><AboutSection /></div>
      <div className="landing-page-limit"><SkillsSection /></div>
      <div className="landing-page-limit"><ServicesSection /></div>
      <div className="landing-page-limit"><ProjectSection /></div>
      <div className="landing-page-limit"><WorkExperienceSection /></div>
      <div className="landing-page-limit"><EducationSection /></div>
      <div className="landing-page-limit"><StackSection /></div>
      <div className="landing-page-limit"><InterestsSection /></div>
      <div className="landing-page-limit"><ContactSection /></div>
      <FooterSection />
    </div>
  );
};

export default Landing;

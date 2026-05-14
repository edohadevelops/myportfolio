import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import techvibesLogo from '../../../../assets/companies/techvibes.svg';
import msuLogo from '../../../../assets/companies/msu.svg';
import { FiExternalLink, FiMapPin, FiCalendar } from 'react-icons/fi';
import './style.css';

const LOGOS = { techvibes: techvibesLogo, msu: msuLogo };

const ExperienceCard = ({ exp, index, accentColor, inView }) => (
  <motion.div
    className="exp-card"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    {/* Logo column */}
    <div className="exp-logo-col">
      <div className="exp-logo-wrap">
        <img
          src={LOGOS[exp.logo]}
          alt={exp.company}
          className="exp-logo"
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="exp-logo-fallback"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {exp.company.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </div>

    {/* Content column */}
    <div className="exp-content">
      <div className="exp-header">
        <div className="exp-header-left">
          <h3 className="exp-role">{exp.role}</h3>
          <div className="exp-meta-row">
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="exp-company"
              style={{ color: accentColor }}
            >
              {exp.company}
              <FiExternalLink size={11} />
            </a>
            <span className="exp-type-badge">{exp.type}</span>
          </div>
        </div>
        <div className="exp-time-loc">
          <span className="exp-detail"><FiCalendar size={11} />{exp.period}</span>
          <span className="exp-detail"><FiMapPin size={11} />{exp.location}</span>
        </div>
      </div>

      <div className="exp-divider" />

      <p className="exp-description">{exp.description}</p>

      <ul className="exp-bullets">
        {exp.bullets.map((b, i) => (
          <li key={i} className="exp-bullet">
            <span className="exp-bullet-dot" style={{ background: accentColor }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const WorkExperience = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Experience
        </div>
        <h2 className="section-title font-display">Work Experience</h2>
        <p className="section-subtitle">
          Where I have applied my skills in the real world.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <div key={activeTrack} className="exp-list">
          {track.experience.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              accentColor={track.color}
              inView={inView}
            />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default WorkExperience;

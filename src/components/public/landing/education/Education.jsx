import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import msuEduLogo from '../../../../assets/education/msu_edu.svg';
import covenantLogo from '../../../../assets/education/covenant.svg';
import { FiExternalLink, FiMapPin, FiAward } from 'react-icons/fi';
import './style.css';

const EDU_LOGOS = { msu_edu: msuEduLogo, covenant: covenantLogo };

const EducationCard = ({ edu, index, accentColor, inView }) => (
  <motion.div
    className="edu-card"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
  >
    <div className="edu-card-top">
      <div className="edu-logo-wrap">
        <img
          src={EDU_LOGOS[edu.logo]}
          alt={edu.school}
          className="edu-logo"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className="edu-logo-fallback" style={{ background: `${accentColor}18`, color: accentColor }}>
          {edu.school.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div>
        <h3 className="edu-degree">{edu.degree}</h3>
        <a
          href={edu.schoolUrl}
          target="_blank"
          rel="noreferrer"
          className="edu-school"
          style={{ color: accentColor }}
        >
          {edu.school} <FiExternalLink size={11} />
        </a>
      </div>
    </div>

    <div className="edu-meta">
      <span className="edu-meta-item"><FiMapPin size={11} />{edu.location}</span>
      <span className="edu-meta-item"><FiAward size={11} />GPA: {edu.gpa}</span>
      <span className="edu-meta-item edu-period">{edu.period}</span>
    </div>

    <div className="edu-courses">
      <p className="edu-courses-label">Relevant Coursework</p>
      <div className="edu-course-tags">
        {edu.courses.map(c => (
          <span key={c} className="edu-course-tag" style={{ background: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}25` }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Education = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="education" className="education-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Education
        </div>
        <h2 className="section-title font-display">Academic Background</h2>
        <p className="section-subtitle">
          The foundation everything else is built on.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <div key={activeTrack} className="edu-grid">
          {track.education.map((edu, i) => (
            <EducationCard
              key={edu.id}
              edu={edu}
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

export default Education;

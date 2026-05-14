import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import {
  FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaShieldAlt, FaBolt,
  FaLightbulb, FaChalkboardTeacher, FaClipboardList, FaCheckDouble,
  FaUsers, FaBrain, FaTools, FaChartBar, FaChartLine, FaStream,
  FaCalendarAlt, FaBookOpen, FaUserFriends, FaCogs, FaRobot, FaTable,
  FaMobileAlt, FaLaptop, FaBook,
} from 'react-icons/fa';
import { MdFunctions } from 'react-icons/md';
import { SiPython } from 'react-icons/si';
import { GiStarsStack } from 'react-icons/gi';
import './style.css';

const ICON_MAP = {
  FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaShieldAlt, FaBolt,
  FaLightbulb, FaChalkboardTeacher, FaClipboardList, FaCheckDouble,
  FaUsers, FaBrain, FaTools, FaChartBar, FaChartLine, FaStream,
  FaCalendarAlt, FaBookOpen, FaUserFriends, FaCogs, FaRobot, FaTable,
  FaMobileAlt, FaLaptop, FaBook,
  MdFunctions,
  SiPython,
};

const LEVEL_STYLE = {
  Experienced: { label: 'Experienced', bg: 'rgba(34,197,94,0.12)', color: '#16A34A' },
  Learning:    { label: 'Learning',    bg: 'rgba(245,158,11,0.12)', color: '#D97706' },
  Beginner:    { label: 'Beginner',    bg: 'rgba(249,115,22,0.12)', color: '#EA580C' },
  Planned:     { label: 'Planned',     bg: 'rgba(156,163,175,0.12)', color: '#6B7280' },
};

const SkillCard = ({ skill, index, accentColor, inView }) => {
  const Icon = ICON_MAP[skill.icon] || GiStarsStack;
  const lvl = LEVEL_STYLE[skill.level] || LEVEL_STYLE.Planned;

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="skill-card-top">
        <div className="skill-icon-wrapper" style={{ background: `${accentColor}14`, color: accentColor }}>
          <Icon size={22} />
        </div>
        <span className="skill-level-badge" style={{ background: lvl.bg, color: lvl.color }}>
          {lvl.label}
        </span>
      </div>
      <h4 className="skill-name">{skill.name}</h4>
      <p className="skill-description">{skill.desc}</p>
    </motion.div>
  );
};

const Skills = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? track.skills : track.skills.slice(0, 6);

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Skills
        </div>
        <h2 className="section-title font-display">What I Bring to the Table</h2>
        <p className="section-subtitle">
          Honest about experience level — each card shows where I am today.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`skills-${activeTrack}`}
          className="skills-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayed.map((skill, i) => (
            <SkillCard
              key={`${activeTrack}-${skill.name}`}
              skill={skill}
              index={i}
              accentColor={track.color}
              inView={inView}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {track.skills.length > 6 && (
        <motion.div
          className="skills-show-more"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button
            className="skills-toggle-btn"
            style={{ borderColor: track.color, color: track.color }}
            onClick={() => setShowAll(s => !s)}
          >
            {showAll ? 'Show Less' : `Show All ${track.skills.length} Skills`}
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Skills;

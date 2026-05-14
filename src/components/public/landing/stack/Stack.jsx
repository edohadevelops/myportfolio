import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import {
  FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaWordpress, FaPython
} from 'react-icons/fa';
import {
  SiRedux, SiExpress, SiMysql, SiMongodb, SiTailwindcss, SiBootstrap,
  SiMui, SiJavascript, SiTypescript, SiR, SiSocketdotio, SiVite,
  SiGithub, SiNetlify, SiPostman, SiNodedotjs, SiLatex
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import './style.css';

const ALL_STACKS = {
  software: [
    { name: 'React JS',     Icon: FaReact,          color: '#61DAFB' },
    { name: 'Node.js',      Icon: FaNodeJs,          color: '#68A063' },
    { name: 'Express',      Icon: SiExpress,         color: '#888888' },
    { name: 'Redux',        Icon: SiRedux,           color: '#764ABC' },
    { name: 'MySQL',        Icon: SiMysql,           color: '#4479A1' },
    { name: 'MongoDB',      Icon: SiMongodb,         color: '#47A248' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss,     color: '#38BDF8' },
    { name: 'JavaScript',   Icon: SiJavascript,      color: '#F7DF1E' },
    { name: 'HTML5',        Icon: FaHtml5,           color: '#E34F26' },
    { name: 'CSS3',         Icon: FaCss3Alt,         color: '#1572B6' },
    { name: 'Git',          Icon: FaGitAlt,          color: '#F05032' },
    { name: 'GitHub',       Icon: SiGithub,          color: '#181717' },
    { name: 'Socket.IO',    Icon: SiSocketdotio,     color: '#010101' },
    { name: 'Material UI',  Icon: SiMui,             color: '#007FFF' },
    { name: 'Bootstrap',    Icon: SiBootstrap,       color: '#7952B3' },
    { name: 'Vite',         Icon: SiVite,            color: '#646CFF' },
  ],
  teaching: [
    { name: 'LaTeX',        Icon: SiLatex,           color: '#008080' },
    { name: 'Python',       Icon: FaPython,          color: '#3776AB' },
    { name: 'JavaScript',   Icon: SiJavascript,      color: '#F7DF1E' },
    { name: 'R',            Icon: SiR,               color: '#276DC3' },
    { name: 'Git',          Icon: FaGitAlt,          color: '#F05032' },
    { name: 'GitHub',       Icon: SiGithub,          color: '#181717' },
    { name: 'HTML5',        Icon: FaHtml5,           color: '#E34F26' },
    { name: 'MySQL',        Icon: SiMysql,           color: '#4479A1' },
    { name: 'React JS',     Icon: FaReact,           color: '#61DAFB' },
  ],
  data: [
    { name: 'Python',       Icon: FaPython,          color: '#3776AB' },
    { name: 'MySQL',        Icon: SiMysql,           color: '#4479A1' },
    { name: 'MongoDB',      Icon: SiMongodb,         color: '#47A248' },
    { name: 'R',            Icon: SiR,               color: '#276DC3' },
    { name: 'JavaScript',   Icon: SiJavascript,      color: '#F7DF1E' },
    { name: 'Git',          Icon: FaGitAlt,          color: '#F05032' },
    { name: 'GitHub',       Icon: SiGithub,          color: '#181717' },
    { name: 'Node.js',      Icon: FaNodeJs,          color: '#68A063' },
    { name: 'Express',      Icon: SiExpress,         color: '#888888' },
    { name: 'React JS',     Icon: FaReact,           color: '#61DAFB' },
    { name: 'LaTeX',        Icon: SiLatex,           color: '#008080' },
  ],
};

const Stack = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const stacks = ALL_STACKS[activeTrack];

  return (
    <section id="stack" className="stack-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Tech Stack
        </div>
        <h2 className="section-title font-display">Tools of the Trade</h2>
        <p className="section-subtitle">
          The technologies I work with to build, analyse, and teach.
        </p>
      </motion.div>

      <div className="stack-grid">
        {stacks.map((s, i) => (
          <motion.div
            key={`${activeTrack}-${s.name}`}
            className="stack-chip"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
            whileHover={{ y: -3, scale: 1.05, transition: { duration: 0.15 } }}
          >
            <span className="stack-icon" style={{ color: s.color }}>
              <s.Icon size={26} />
            </span>
            <span className="stack-name">{s.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stack;

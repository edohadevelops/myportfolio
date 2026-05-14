import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import {
  FaSitemap, FaRobot, FaFutbol, FaGamepad, FaChalkboardTeacher,
  FaLaptop, FaBook, FaBookOpen, FaChartLine, FaPray,
} from 'react-icons/fa';
import { MdFunctions } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';
import './style.css';

const ICON_MAP = {
  FaSitemap, FaRobot, FaFutbol, FaGamepad, FaChalkboardTeacher,
  FaLaptop, FaBook, FaBookOpen, FaChartLine, FaPray,
  MdFunctions,
};

const Interests = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="interests" className="interests-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Interests
        </div>
        <h2 className="section-title font-display">Beyond the Work</h2>
        <p className="section-subtitle">
          What I think about when I am not writing code or doing mathematics.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          className="interests-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {track.interests.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || GiStarsStack;
            return (
              <motion.div
                key={item.label}
                className="interest-card"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <div
                  className="interest-icon-wrap"
                  style={{ background: `${track.color}14`, color: track.color }}
                >
                  <Icon size={22} />
                </div>
                <h4 className="interest-label">{item.label}</h4>
                <p className="interest-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Interests;

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import {
  FaCode, FaShoppingCart, FaGlobe, FaUserCircle, FaBolt, FaServer,
  FaChalkboardTeacher, FaUsers, FaBookOpen, FaClipboardList, FaLaptop,
  FaDatabase, FaChartLine, FaCogs,
} from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { GiStarsStack } from 'react-icons/gi';
import './style.css';

const ICON_MAP = {
  FaCode, FaShoppingCart, FaGlobe, FaUserCircle, FaBolt, FaServer,
  FaChalkboardTeacher, FaUsers, FaBookOpen, FaClipboardList, FaLaptop,
  FaDatabase, FaChartLine, FaCogs,
};

const Services = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="services-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Services
        </div>
        <h2 className="section-title font-display">What I Can Do For You</h2>
        <p className="section-subtitle">
          Real work, clearly scoped. Here is what I offer and what you can expect when we work together.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          className="services-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {track.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || GiStarsStack;
            return (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <div className="service-card-top">
                  <div
                    className="service-icon-wrap"
                    style={{ background: `${track.color}14`, color: track.color }}
                  >
                    <Icon size={22} />
                  </div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-deliverables">
                  {service.deliverables.map(item => (
                    <li key={item} className="service-deliverable-item">
                      <span className="service-check" style={{ color: track.color }}>
                        <FaCheck size={10} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Services;

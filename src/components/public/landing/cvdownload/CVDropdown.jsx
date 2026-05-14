import { useState, useRef, useEffect } from 'react';
import { FiDownload, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

const CV_FILES = [
  {
    id: 'software',
    label: 'Software Engineer',
    sub: 'React, Node.js, Full-Stack',
    dot: '#2D6BE4',
    file: '/CV_Software.pdf',
    filename: 'Amen_Edoha_Software_CV.pdf',
  },
  {
    id: 'teaching',
    label: 'Teaching and Academia',
    sub: 'Mathematics, Graduate TA',
    dot: '#16A34A',
    file: '/CV_Teaching.pdf',
    filename: 'Amen_Edoha_Teaching_CV.pdf',
  },
  {
    id: 'data',
    label: 'Data Science',
    sub: 'Statistics, SQL, Python',
    dot: '#9333EA',
    file: '/CV_DataScience.pdf',
    filename: 'Amen_Edoha_DataScience_CV.pdf',
  },
];

const CVDropdown = ({ accentColor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="cv-dropdown-wrapper" ref={ref}>
      <button
        className="cv-dropdown-trigger"
        style={{ background: accentColor }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FiDownload size={15} />
        <span>Download CV</span>
        <motion.span
          className="cv-chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cv-dropdown-menu"
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <p className="cv-dropdown-heading">Choose a version</p>
            {CV_FILES.map(cv => (
              <a
                key={cv.id}
                href={cv.file}
                download={cv.filename}
                className="cv-dropdown-item"
                role="option"
                onClick={() => setOpen(false)}
              >
                <div className="cv-item-left">
                  <span className="cv-item-dot" style={{ background: cv.dot }} />
                  <div className="cv-item-text">
                    <span className="cv-item-label">{cv.label}</span>
                    <span className="cv-item-sub">{cv.sub}</span>
                  </div>
                </div>
                <FiDownload size={13} className="cv-item-icon" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CVDropdown;

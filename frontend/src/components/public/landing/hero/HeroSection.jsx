import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrack } from '../../../../context/TrackContext';
import './style.css';

const TypedText = ({ strings }) => {
  const [index,    setIndex]    = useState(0);
  const [text,     setText]     = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx,  setCharIdx]  = useState(0);
  const prevStrings = useRef(strings);

  // Reset animation state whenever the strings array changes (track switch)
  useEffect(() => {
    if (prevStrings.current !== strings) {
      prevStrings.current = strings;
      setIndex(0);
      setText('');
      setDeleting(false);
      setCharIdx(0);
    }
  }, [strings]);

  useEffect(() => {
    if (!strings || strings.length === 0) return;
    const current = strings[index % strings.length];
    if (!current) return;

    const speed = deleting ? 35 : 60;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1;
        setText(current.slice(0, next));
        if (next >= current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx(next);
        }
      } else {
        const next = charIdx - 1;
        if (next <= 0) {
          // Finished deleting — reset atomically to avoid ci hitting -1
          setText('');
          setCharIdx(0);
          setDeleting(false);
          setIndex(i => (i + 1) % strings.length);
        } else {
          setText(current.slice(0, next));
          setCharIdx(next);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, charIdx, index, strings]);

  return (
    <span className="typed-text">
      {text}
      <span className="typed-cursor">|</span>
    </span>
  );
};

const TRACK_BG = {
  software: { orb1: '#2D6BE4', orb2: '#4F8EF7', noise: '#1a1a2e' },
  teaching: { orb1: '#16A34A', orb2: '#34D399', noise: '#0a2818' },
  data:     { orb1: '#9333EA', orb2: '#A78BFA', noise: '#1a0a2e' },
};

const HeroSection = () => {
  const { track, activeTrack } = useTrack();
  const bg = TRACK_BG[activeTrack];

  return (
    <section id="home" className="hero-section">
      {/* Animated background orbs */}
      <div className="hero-bg-orbs">
        <motion.div
          className="hero-orb hero-orb-1"
          style={{ background: bg.orb1 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          key={`orb1-${activeTrack}`}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          style={{ background: bg.orb2 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          key={`orb2-${activeTrack}`}
        />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-inner"
          >
            {/* Track badge */}
            <motion.div
              className="hero-track-badge"
              style={{ background: `${track.color}18`, borderColor: `${track.color}40`, color: track.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>{track.portfolioStatement}</span>
            </motion.div>

            <p className="hero-greeting">
              Hey! I'm
            </p>
            <h1 className="hero-name font-display">
              Amen Edoha
            </h1>
            <h2 className="hero-typed-line">
              <span className="hero-typed-prefix">I'm a </span>
              <TypedText strings={track.heroRoles} />
            </h2>
            <p className="hero-subtitle">{track.heroTagline}</p>

            <div className="hero-actions">
              <button
                className="hero-cta-primary"
                style={{ background: track.color }}
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See My Work
              </button>
              <button
                className="hero-cta-secondary"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hero-scroll-dot" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

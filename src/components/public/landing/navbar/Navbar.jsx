import React, { useState, useEffect } from 'react';
import './style.css';
import { useTrack, TRACKS } from '../../../../context/TrackContext';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const NAVLINKS = [
  { id: 'home',       label: 'Home'       },
  { id: 'about',      label: 'About'      },
  { id: 'projects',   label: 'Projects'   },
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
  { id: 'stack',      label: 'Stack'      },
  { id: 'contact',    label: 'Contact'    },
];

const TRACK_ROUTES = {
  software: '/portfolio/software',
  teaching: '/portfolio/teaching',
  data:     '/portfolio/data',
};

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { activeTrack, setActiveTrack, track, TRACKS } = useTrack();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastScrollY && y > 100);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const switchTrack = (id) => {
    setActiveTrack(id);
    navigate(TRACK_ROUTES[id]);
    setMobileOpen(false);
  };

  return (
    <>
      <div
        className={`navbar-root ${hidden ? 'navbar-hidden' : ''} ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
      >
        <div className="navbar-inner landing-page-limit">
          {/* Logo */}
          <div className="navbar-logo">
            <span className={`logo-text font-display ${scrolled ? 'logo-dark' : 'logo-light'}`}>A.E</span>
            <span className="logo-dot" style={{ background: scrolled ? track.color : 'rgba(255,255,255,0.7)' }} />
          </div>

          {/* Desktop nav links */}
          <nav className="navbar-links">
            {NAVLINKS.map(link => (
              <button
                key={link.id}
                className={`navbar-link ${scrolled ? 'navbar-link-dark' : 'navbar-link-light'}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Track pills — desktop */}
          <div className="navbar-track-switcher">
            {Object.values(TRACKS).map(t => {
              const isActive = activeTrack === t.id;
              return (
                <button
                  key={t.id}
                  className={`track-pill ${isActive ? 'track-pill-active' : ''} ${scrolled ? 'track-pill-dark-bg' : 'track-pill-light-bg'}`}
                  style={isActive ? { background: t.accentBg, borderColor: t.accentBorder, color: t.color } : {}}
                  onClick={() => switchTrack(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className={`mobile-menu-btn ${scrolled ? 'mobile-btn-dark' : 'mobile-btn-light'}`}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay">
          <div className="mobile-nav-links">
            {NAVLINKS.map(link => (
              <button key={link.id} className="mobile-nav-link" onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
          </div>
          <div className="mobile-track-switcher">
            <p className="mobile-track-label">Switch track</p>
            <div className="mobile-track-pills">
              {Object.values(TRACKS).map(t => {
                const isActive = activeTrack === t.id;
                return (
                  <button
                    key={t.id}
                    className={`track-pill ${isActive ? 'track-pill-active' : ''}`}
                    style={isActive ? { background: t.accentBg, borderColor: t.accentBorder, color: t.color } : {}}
                    onClick={() => switchTrack(t.id)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

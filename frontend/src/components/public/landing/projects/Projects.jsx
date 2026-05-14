import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CATEGORIES, PROJECTS } from './constants';
import ProjectCard from './ProjectCard';
import { useTrack } from '../../../../context/TrackContext';
import './style.css';

const ComingSoon = ({ accentColor }) => (
  <motion.div
    className="projects-coming-soon"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="projects-coming-icon" style={{ background: `${accentColor}14`, color: accentColor }}>
      🚧
    </div>
    <h3 className="projects-coming-title">Projects Coming Soon</h3>
    <p className="projects-coming-desc">
      I'm currently compiling teaching resources, lesson materials, and academic work for this section.
      Check back soon — or switch to the Software Engineer track to see my full project portfolio.
    </p>
  </motion.div>
);

const Projects = () => {
  const { track, activeTrack } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [selected, setSelected] = useState('All');
  const [sortBy,   setSortBy]   = useState('newest');
  const [page,     setPage]     = useState(6);

  // Filter to this track's project IDs
  const trackProjects = PROJECTS.filter(p => track.projectIds.includes(p.id));

  const filtered = trackProjects.filter(p =>
    selected === 'All' || p.category.includes(selected)
  );

  const sorted = sortBy === 'alpha'
    ? [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    : filtered;

  const displayed = sorted.slice(0, page);

  useEffect(() => { setSelected('All'); setPage(6); }, [activeTrack]);

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Projects
        </div>
        <h2 className="section-title font-display">What I've Built</h2>
        <p className="section-subtitle">
          Real projects shipped to real users. Click any card to explore features and tech in detail.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {trackProjects.length === 0 ? (
          <ComingSoon key="coming-soon" accentColor={track.color} />
        ) : (
          <motion.div key={`proj-${activeTrack}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Filters */}
            <div className="projects-filters">
              <div className="projects-categories">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    className={`projects-cat-btn ${selected === cat.value ? 'projects-cat-active' : ''}`}
                    style={selected === cat.value ? { background: `${track.color}18`, color: track.color, borderColor: `${track.color}50` } : {}}
                    onClick={() => { setSelected(cat.value); setPage(6); }}
                  >
                    {cat.label}
                    <span className="projects-cat-count">
                      {cat.value === 'All'
                        ? trackProjects.length
                        : trackProjects.filter(p => p.category.includes(cat.value)).length}
                    </span>
                  </button>
                ))}
              </div>
              <select
                className="projects-sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest</option>
                <option value="alpha">Sort: A–Z</option>
              </select>
            </div>

            <div className="projects-grid">
              {displayed.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={i}
                  accentColor={track.color}
                  inView={inView}
                />
              ))}
            </div>

            {filtered.length > 6 && (
              <div className="projects-load-more">
                {page < filtered.length && (
                  <button
                    className="projects-load-btn"
                    style={{ background: track.color }}
                    onClick={() => setPage(p => p + 4)}
                  >
                    Load More Projects
                  </button>
                )}
                {page > 6 && (
                  <button
                    className="projects-load-btn-outline"
                    style={{ borderColor: track.color, color: track.color }}
                    onClick={() => setPage(6)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

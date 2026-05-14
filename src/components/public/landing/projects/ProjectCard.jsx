import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project, index, accentColor, inView }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/projects/${project.title}`)}
    >
      {/* Image */}
      <div className="project-card-img">
        <img src={project.img} alt={project.title} />
        <div className="project-card-img-overlay">
          <span className="project-card-view-btn" style={{ background: accentColor }}>
            View Details <FaArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="project-card-content">
        <div className="project-card-header">
          <h3 className="project-card-title font-display">{project.title}</h3>
          <span className="project-card-date">{project.createdAt}</span>
        </div>

        <p className="project-card-desc">{project.short_description}</p>

        {/* Category badges */}
        <div className="project-card-cats">
          {project.category.map(cat => (
            <span key={cat} className="project-card-cat">{cat}</span>
          ))}
        </div>

        {/* Stack */}
        <div className="project-card-stack">
          {project.stack.slice(0, 4).map(s => (
            <span key={s} className="project-card-stack-item">{s}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="project-card-stack-more">+{project.stack.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

import React, { useState, useEffect, useRef } from 'react';
import PROJECTS, { GITHUB } from './projects';
import { useParams } from 'react-router-dom';
import { useTrack } from '../../../context/TrackContext';
import './style.css';
import { GiStarsStack } from 'react-icons/gi';
import { HiBriefcase } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import FullImage from '../../../components/modals/FullImage/FullImage';

const Project = () => {
  const { projectName } = useParams();
  const { track } = useTrack();

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject]     = useState({});
  const [error, setError]         = useState('...loading');
  const [entityView, setEntityView]         = useState('features');
  const [selectedImage, setSelectedImage]   = useState(null);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [windowWidth, setWindowWidth]       = useState(window.innerWidth);
  const [fullScreen, setFullScreen]         = useState(false);
  const [curtainOpen, setCurtainOpen]       = useState(false);

  const previewRef = useRef();

  const accentBg   = `${track.color}18`;
  const accentText = track.color;

  const handleCurtainAnimation = (entity) => {
    setCurtainOpen(true);
    setTimeout(() => {
      setCurtainOpen(false);
      setSelectedEntity(entity);
    }, 800);
  };

  const handleEntityClick = (id, type) => {
    previewRef?.current?.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });

    if (id === selectedEntity?.entity_id && type === selectedEntity?.type) {
      setSelectedImage(project?.main_img);
      return handleCurtainAnimation({});
    }

    let chosenEntity;
    if (type === 'stack') {
      chosenEntity = project?.stack?.find(s => s.stack_id === id);
      handleCurtainAnimation({ ...chosenEntity, type: 'stack', entity_id: chosenEntity?.stack_id });
    } else if (type === 'feature') {
      chosenEntity = project?.features?.find(f => f.feature_id === id);
      handleCurtainAnimation({ ...chosenEntity, type: 'feature', entity_id: chosenEntity?.feature_id });
    }

    const entityImage = project?.project_images?.find(img => img?.entity_id === id && img?.entity_type === type);
    setSelectedImage(entityImage ? entityImage?.img_url : project?.main_img);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const found = PROJECTS?.find(item => item?.title === projectName);
    if (found) {
      setProject(found);
      setSelectedImage(found?.main_img);
      setIsLoading(false);
    } else {
      setError('Project does not exist in the system');
    }
  }, [projectName]);

  useEffect(() => {
    setSelectedEntity({});
    setSelectedImage(project?.main_img);
  }, [entityView]);

  if (isLoading) {
    return <div className="loading-page">{error}</div>;
  }

  return (
    <div
      className="landing-page-limit"
      style={{ '--track-color': accentText, '--track-color-bg': accentBg }}
    >
      <div className="project-page">
        <div className="project-page-img-feature-section" ref={previewRef}>
          {(windowWidth > 1023 || selectedImage !== project?.main_img) && (
            <div className="project-page-main-img" onClick={() => setFullScreen(true)}>
              <img src={selectedImage} alt={project?.title} />
              <div className="project-page-img-cover">View full Screen</div>
            </div>
          )}
          <div className="project-page-details-entity-details min-h-[280px]">
            <>
              <header className="project-page-details-entity-header">
                <span className="project-page-details-entity-header-icon">
                  {selectedEntity?.entity_id ? <GiStarsStack /> : <HiBriefcase />}
                </span>
                <p className="project-page-details-entity-header-title">
                  {selectedEntity?.name ?? project?.title}
                </p>
              </header>
              <div className={`${!selectedEntity?.entity_id && 'flex flex-col items-center justify-center py-12'}`}>
                {selectedEntity?.entity_id ? (
                  <p className="project-page-details-entity-description">{selectedEntity?.description}</p>
                ) : (
                  <p className="text-gray-600 italic text-sm text-center">
                    Select a project feature or a stack to preview the full details of that project feature.
                  </p>
                )}
              </div>
            </>
            <div className={`project-page-details-entity-curtain ${!curtainOpen ? '-translate-x-full' : 'translate-x-0'}`} />
          </div>
        </div>

        <div className="project-page-details-section">
          <h4 className="project-page-details-title">{project?.title}</h4>
          <div className="project-details-category-cards">
            {project?.category?.map((cat, i) => (
              <p key={i} className="project-page-details-category">{cat}</p>
            ))}
          </div>
          <div className="project-page-main-img lg:hidden" onClick={() => setFullScreen(true)}>
            <img src={project?.main_img} alt={project?.title} />
            <div className="project-page-img-cover">View full Screen</div>
          </div>
          <div className="project-details-page-description-section">
            <p className="project-details-page-description-title">Description</p>
            <p className="project-details-page-description">{project?.long_description}</p>
          </div>
          <div className="project-details-page-preview">
            <a href={project?.github ?? GITHUB} target="_blank" rel="noreferrer" className="project-details-view-github-btn">
              <FaGithub /> View on Github
            </a>
            <a href={project?.site} target="_blank" rel="noreferrer" className="project-details-view-site-btn">
              <FaEye /> View Site
            </a>
          </div>

          <div className="project-details-page-tabs">
            <button
              className={`project-details-page-tab ${entityView === 'features' ? 'project-details-page-active-tab' : ''}`}
              onClick={() => setEntityView('features')}
            >
              Features
            </button>
            <button
              className={`project-details-page-tab ${entityView === 'stack' ? 'project-details-page-active-tab' : ''}`}
              onClick={() => setEntityView('stack')}
            >
              Tech Stack
            </button>
          </div>

          <div className="project-details-page-entity-cards">
            {entityView === 'features' && project?.features?.map((feature, i) => {
              const isSelected = selectedEntity?.entity_id === feature.feature_id;
              return (
                <button
                  key={feature.feature_id}
                  className="project-details-page-entity-card"
                  style={isSelected ? { background: accentBg } : {}}
                  onClick={() => handleEntityClick(feature?.feature_id, 'feature')}
                >
                  <span
                    className="project-details-page-entity-number"
                    style={isSelected
                      ? { background: accentText, color: '#fff' }
                      : { background: '#F3F4F6', color: '#111827' }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="project-details-page-entity-name"
                    style={isSelected ? { color: accentText, fontWeight: 600 } : {}}
                  >
                    {feature?.name}
                  </p>
                </button>
              );
            })}
            {entityView === 'stack' && project?.stack?.map((stack, i) => {
              const isSelected = selectedEntity?.entity_id === stack.stack_id;
              return (
                <button
                  key={stack.stack_id}
                  className="project-details-page-entity-card"
                  style={isSelected ? { background: accentBg } : {}}
                  onClick={() => handleEntityClick(stack?.stack_id, 'stack')}
                >
                  <span
                    className="project-details-page-entity-number"
                    style={isSelected
                      ? { background: accentText, color: '#fff' }
                      : { background: '#F3F4F6', color: '#111827' }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="project-details-page-entity-name"
                    style={isSelected ? { color: accentText, fontWeight: 600 } : {}}
                  >
                    {stack?.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {fullScreen && (
        <FullImage name="project image view" img={selectedImage} setFullScreen={setFullScreen} />
      )}
    </div>
  );
};

export default Project;

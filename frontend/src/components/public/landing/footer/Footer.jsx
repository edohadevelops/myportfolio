import { useTrack } from '../../../../context/TrackContext';
import './style.css';

const Footer = () => {
  const { track } = useTrack();
  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <span className="footer-logo font-display">A.E</span>
        <p className="footer-copy">
          © 2026 Amen Edoha Engworo.
        </p>
        <p className="footer-sub">Springfield, MO · aee9552s@MissouriState.edu</p>
      </div>
    </footer>
  );
};

export default Footer;

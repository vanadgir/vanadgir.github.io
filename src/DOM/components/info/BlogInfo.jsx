import OverlayContentLink from "../OverlayContentLink";
import AboutMeOverlay from "../../content/AboutMeOverlay";

const BlogInfo = ({ planet, openDetail }) => {
  const handleAboutMe = () => {
    if (!openDetail) return;
    openDetail("about");
  };

  return (
    <div>
      <h2>{planet.label}</h2>
      <p>Dev logs, writeups, and thoughts.</p>

      <ul className="info-item-list">
        <li className="info-item-list-item">
          <OverlayContentLink
            title="About Me"
            description="My background, skills, hobbies, etc"
            onActivate={handleAboutMe}
          />
        </li>
      </ul>
    </div>
  );
};

export default BlogInfo;

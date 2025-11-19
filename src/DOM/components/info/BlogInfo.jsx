import OverlayContentLink from "../OverlayContentLink";

const BlogInfo = ({ planet, openDetail }) => {
  const handleAboutMe = () => {
    if (!openDetail) return;
    openDetail("about");
  };

  const handleRoadtrip = () => {
    if (!openDetail) return;
    openDetail("roadtrip");
  };

  return (
    <div className="blog-info">
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
        <li className="info-item-list-item">
          <OverlayContentLink
            title="Roadtrip2020"
            description="A journal of my cross-country adventure"
            onActivate={handleRoadtrip}
          />
        </li>

      </ul>
    </div>
  );
};

export default BlogInfo;

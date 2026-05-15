import OverlayContentLink from "../OverlayContentLink";

const DocsInfo = ({ planet, openDetail }) => {
  const openResume = () => {
    openDetail?.("docs:resume");
  };

  const openElvtr = () => {
    openDetail?.("docs:elvtr");
  };

  const openDataSci = () => {
    openDetail?.("docs:datasci");
  };

  return (
    <div className="blog-info">
      <h2>{planet.label}</h2>
      <p>View or Download</p>

      <ul className="info-item-list">
        <li className="info-item-list-item">
          <OverlayContentLink
            title="Resume"
            description="Skills & Work History"
            onActivate={openResume}
          />
        </li>
        <li className="info-item-list-item">
          <OverlayContentLink
            title="ELVTR Tech Art"
            description="Certificate & Letter of Recommendation"
            onActivate={openElvtr}
          />
        </li>
        <li className="info-item-list-item">
          <OverlayContentLink
            title="Data Science"
            description="Courses & Certificates"
            onActivate={openDataSci}
          />
        </li>
      </ul>
    </div>
  );
};

export default DocsInfo;

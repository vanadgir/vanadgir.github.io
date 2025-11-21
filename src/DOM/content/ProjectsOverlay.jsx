import { projectsById } from "./entries/projectMedia";

const ProjectsOverlay = ({ projectId }) => {
  const project = projectsById[projectId];

  if (!project) {
    return (
      <article className="detail-pane">
        <header className="detail-pane-header">
          <h2>Project</h2>
          <p className="detail-pane-subtitle">No project found.</p>
        </header>
      </article>
    );
  }

  const {
    title,
    summary,
    subtitle,
    description,
    technologies,
    imageUrl,
    hyperlinks,
    previewDocUrl,
  } = project;

  return (
    <article className="detail-pane detail-pane--project">
      <header className="detail-pane-header">
        <h2>{title}</h2>
        {subtitle && <p className="detail-pane-subtitle">{subtitle}</p>}
        {summary && <p className="detail-pane-subtitle">{summary}</p>}
      </header>

      <section className="detail-pane-body">
        {imageUrl && (
          <div className="detail-pane-project-image-wrapper">
            <img
              src={imageUrl}
              alt={`${title} preview`}
              className="detail-pane-project-image"
            />
          </div>
        )}

        {description && (
          <p className="detail-pane-description">{description}</p>
        )}

        {previewDocUrl && (
          <div className="detail-pane-doc-preview">
            <iframe
              src={previewDocUrl}
              title={`${title} document preview`}
              className="detail-pane-doc-iframe"
            />
          </div>
        )}

        {hyperlinks && hyperlinks.length > 0 && (
          <div className="detail-pane-links">
            <div className="detail-pane-links-buttons">
              {hyperlinks.map((link) => (
                <button
                  key={link.id}
                  className="detail-pane-link-button"
                  onClick={() =>
                    window.open(link.href, "_blank", "noopener,noreferrer")
                  }
                >
                  {link.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {technologies && technologies.length > 0 && (
          <div className="detail-pane-tech-section">
            <div className="detail-pane-tech-strip">
              {technologies.map((tech) =>
                tech.iconUrl ? (
                  <div
                    key={tech.id}
                    className="detail-pane-tech-icon-wrapper"
                    title={tech.label}
                  >
                    <img
                      src={tech.iconUrl}
                      alt={tech.label}
                      className="detail-pane-tech-icon"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </section>
    </article>
  );
};

export default ProjectsOverlay;

import OverlayContentLink from "../OverlayContentLink";
import { projectList } from "../../content/entries/projectMedia";

const ProjectsInfo = ({ planet, openDetail }) => {
  const handleOpenProject = (projectId) => {
    openDetail?.(`project:${projectId}`);
  };

  return (
    <div className="blog-info">
      <h2>{planet.label}</h2>
      <p>Games, Web Apps, Data Science</p>

      <ul className="info-item-list">
        {projectList.map((project) => (
          <li key={project.id} className="info-item-list-item">
            <OverlayContentLink
              title={project.title}
              description={project.subtitle || project.summary}
              onActivate={() => handleOpenProject(project.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsInfo;

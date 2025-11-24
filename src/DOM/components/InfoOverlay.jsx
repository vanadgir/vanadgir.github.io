import { useState, useCallback } from "react";

import BlogOverlay from "../content/BlogOverlay";
import DocumentsOverlay from "../content/DocumentsOverlay";
import ProjectsOverlay from "../content/ProjectsOverlay";
import MusicOverlay from "../content/MusicOverlay";

import { useLocation } from "wouter";

import { useGTag } from "../../contexts/GTagContext";

const renderDetail = (detailId) => {
  if (detailId.startsWith("docs:")) {
    const topicId = detailId.split(":")[1];
    return <DocumentsOverlay key={topicId} topicId={topicId} />;
  }

  if (detailId.startsWith("project:")) {
    const projectId = detailId.split(":")[1];
    return <ProjectsOverlay key={projectId} projectId={projectId} />;
  }

  if (detailId.startsWith("music:")) {
    const platformId = detailId.split(":")[1];
    return <MusicOverlay key={platformId} platformId={platformId} />;
  }

  if (detailId.startsWith("blog:")) {
    const blogId = detailId.split(":")[1];
    return <BlogOverlay key={blogId} blogId={blogId} />;
  }

  return null;
};

const InfoOverlay = ({ planet }) => {
  if (!planet) return null;
  const { trackOverlayClose, trackOverlayOpen } = useGTag();
  const [detailId, setDetailId] = useState(null);
  const [, navigate] = useLocation();

  const openDetail = useCallback(
    (id) => {
      setDetailId((current) => {
        const next = current === id ? null : id;
        if (next) {
          // opened
          trackOverlayOpen?.("detail", id);
        } else {
          // closed via toggle
          trackOverlayClose?.("detail", id);
        }
        return next;
      });
    },
    [trackOverlayOpen, trackOverlayClose]
  );

  const closeDetail = useCallback(() => {
    if (detailId) {
      trackOverlayClose?.("detail", detailId);
    }
    setDetailId(null);
  }, [detailId, trackOverlayClose]);

  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/");
  };

  const InfoComponent = planet.InfoComponent ?? DefaultInfo;

  return (
    <div className="planet-overlay-root">
      {detailId && (
        <div className="planet-overlay-box planet-overlay-box--left">
          <button
            type="button"
            style={{
              fontFamily: `"alagard", system-ui, sans-serif`,
              color: "red",
            }}
            className="overlay-close-button"
            onClick={closeDetail}
            aria-label="Close detail panel"
          >
            X
          </button>
          {renderDetail(detailId)}
        </div>
      )}

      <div className="planet-overlay-box planet-overlay-box--right">
        <InfoComponent
          planet={planet}
          openDetail={openDetail}
          closeDetail={closeDetail}
          hasDetail={!!detailId}
        />
        <button
          type="button"
          style={{
            fontFamily: `"alagard", system-ui, sans-serif`,
            color: "red",
          }}
          className="overlay-close-button"
          onClick={handleClick}
          aria-label="Close detail panel"
        >
          X
        </button>
      </div>
    </div>
  );
};

const DefaultInfo = ({ planet }) => (
  <div>
    <h2>{planet.label}</h2>
    <p>Content coming soon.</p>
  </div>
);

export default InfoOverlay;

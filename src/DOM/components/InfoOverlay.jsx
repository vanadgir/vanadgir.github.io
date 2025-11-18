// src/DOM/components/InfoOverlay.jsx
import { useState, useCallback } from "react";

const InfoOverlay = ({ planet }) => {
  if (!planet) return null;

  const [detailNode, setDetailNode] = useState(null);

  const openDetail = useCallback((node) => {
    setDetailNode(node);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailNode(null);
  }, []);

  const InfoComponent = planet.InfoComponent ?? DefaultInfo;

  return (
    <div className="planet-overlay-root">
      {detailNode && (
        <div className="planet-overlay-box planet-overlay-box--left">
          <button
            type="button"
            className="overlay-close-button"
            onClick={closeDetail}
            aria-label="Close detail panel"
          >
            ×
          </button>
          {detailNode}
        </div>
      )}

      <div className="planet-overlay-box planet-overlay-box--right">
        <InfoComponent
          planet={planet}
          openDetail={openDetail}
          closeDetail={closeDetail}
          hasDetail={!!detailNode}
        />
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

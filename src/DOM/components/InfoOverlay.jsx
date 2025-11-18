import { useState, useCallback } from "react";

import AboutMeOverlay from "../content/AboutMeOverlay";

const renderDetail = (detailId) => {
  switch (detailId) {
    case "about":
      return <AboutMeOverlay />;
    // case "something-else": return <SomethingElseOverlay />;
    default:
      return null;
  }
};

const InfoOverlay = ({ planet }) => {
  if (!planet) return null;

  const [detailId, setDetailId] = useState(null);

  const openDetail = useCallback((id) => {
    setDetailId(id);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailId(null);
  }, []);

  const InfoComponent = planet.InfoComponent ?? DefaultInfo;

  return (
    <div className="planet-overlay-root">
      {detailId && (
        <div className="planet-overlay-box planet-overlay-box--left">
          <button
            type="button"
            style={{
              fontFamily: `"alagard", system-ui, sans-serif`,
              color: "red"
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

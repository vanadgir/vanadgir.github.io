import { usePlanetUI } from "../../contexts/PlanetUIContext";

const InfoOverlay = ({ planet }) => {
  if (!planet) return null;

  const InfoComponent = planet.InfoComponent ?? DefaultInfo;

  return (
    <div className="planet-overlay-root">
      <div className="planet-overlay-box">
        <InfoComponent planet={planet} />
      </div>
    </div>
  );
};

const DefaultInfo = ({ planet }) => (
  <div >
    <h2>{planet.label}</h2>
    <p>Content coming soon.</p>
  </div>
);

export default InfoOverlay;

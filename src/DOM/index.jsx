import { useLocation } from "wouter";
import { PLANETS } from "../config/planets";
import GithubIcon from "../assets/images/github.svg";
import LinkedInIcon from "../assets/images/linkedin.svg";
import SettingsIcon from "../assets/images/settings.svg";
import PlanetInfoOverlay from "./components/InfoOverlay";
import { usePlanetUI } from "../contexts/PlanetUIContext";
import { useSettings } from "../contexts/SettingsContext";

const DOM = () => {
  const [location, navigate] = useLocation();
  const { cameraLockedOnPlanet, activePlanetId } = usePlanetUI();
  const {
    paused,
    togglePaused,
    showOrbits,
    toggleShowOrbits,
    settingsOpen,
    toggleSettingsOpen,
  } = useSettings();

  const isHome = location === "/";
  const activePlanet = !isHome
    ? PLANETS.find((c) => c.id === activePlanetId) ?? null
    : null;

  return (
    <div className="dom-root">
      <nav className="dom-nav" aria-label="Planet navigation">
        {/* Router-controlled buttons */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-pressed={isHome}
        >
          Home
        </button>

        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            type="button"
            onClick={() => navigate(planet.path)}
            aria-pressed={location === planet.path}
          >
            {planet.label}
          </button>
        ))}

        <a
          href="https://github.com/vanadgir"
          target="_blank"
          rel="noreferrer"
          className="dom-nav-icon external-icon"
          aria-label="GitHub"
          title="GitHub"
        >
          <img src={GithubIcon} alt="" />
        </a>

        <a
          href="https://www.linkedin.com/in/varun-nadgir/"
          target="_blank"
          rel="noreferrer"
          className="dom-nav-icon external-icon"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <img src={LinkedInIcon} alt="" />
        </a>
      </nav>

      {isHome && (
        <div className="dom-body">
          <h1>Welcome, Visitor</h1>
          I'm Varun. I'd like to make an apple pie from scratch, so I invented a
          universe. <br />
          Hope you enjoy your stay. Visit the planets to learn more about me!
        </div>
      )}

      {!isHome && activePlanet && cameraLockedOnPlanet && (
        <PlanetInfoOverlay planet={activePlanet} />
      )}

      {/* Bottom-left settings gear + tray */}
      <div className="dom-footer" aria-label="Simulation controls">
        {/* Gear: always visible */}
        <button
          type="button"
          className="dom-nav-icon settings-gear-button"
          onClick={toggleSettingsOpen}
          aria-label="Simulation settings"
          aria-pressed={settingsOpen}
        >
          <img src={SettingsIcon} alt="" />
        </button>

        {/* Tray: slides out to the right of the gear */}
        <div
          className={`settings-tray ${
            settingsOpen ? "settings-tray--open" : ""
          }`}
        >
          <button type="button" onClick={togglePaused} aria-pressed={paused}>
            {paused ? "Resume" : "Pause"}
          </button>

          <button
            type="button"
            onClick={toggleShowOrbits}
            aria-pressed={showOrbits}
          >
            {showOrbits ? "Hide orbits" : "Show orbits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DOM;

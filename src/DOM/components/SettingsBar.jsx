import SettingsIcon from "../../assets/images/settings.svg";
import { useSettings } from "../../contexts/SettingsContext";

const SettingsBar = () => {
  const {
    paused,
    togglePaused,
    showOrbits,
    toggleShowOrbits,
    settingsOpen,
    toggleSettingsOpen,
    shadowsEnabled,
    toggleShadowsEnabled,
    debugEnabled,
    toggleDebugEnabled,
  } = useSettings();

  return (
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
        className={`settings-tray ${settingsOpen ? "settings-tray--open" : ""}`}
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

        <button
          type="button"
          onClick={toggleShadowsEnabled}
          aria-pressed={shadowsEnabled}
        >
          {shadowsEnabled ? "Disable Shadows" : "Enable Shadows"}
        </button>

        <button
          type="button"
          onClick={toggleDebugEnabled}
          aria-pressed={debugEnabled}
        >
          {debugEnabled ? "Hide Debug" : "Show Debug"}
        </button>
      </div>
    </div>
  );
};

export default SettingsBar;

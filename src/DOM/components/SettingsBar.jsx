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
    quality,
    toggleQuality,
    showMoons,
    toggleShowMoons,
  } = useSettings();

  const qualityLabel =
    quality === "low" ? "L" : quality === "medium" ? "M" : "H";

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
        {/* Pause/Resume */}
        <button type="button" onClick={togglePaused} aria-pressed={paused} title="Pauses/Resumes the simulation">
          {paused ? "Resume" : "Pause"}
        </button>

        {/* Debug Toggle */}
        <button
          type="button"
          onClick={toggleDebugEnabled}
          aria-pressed={debugEnabled}
          title="Toggle simulation details"
        >
          {debugEnabled ? "Hide Debug" : "Show Debug"}
        </button>

        {/* Show Orbit Toggle */}
        <button
          type="button"
          onClick={toggleShowOrbits}
          aria-pressed={showOrbits}
          title="Toggle orbits of moving bodies"
        >
          {showOrbits ? "Hide orbits" : "Show orbits"}
        </button>

        {/* Shadows Toggle */}
        <button
          type="button"
          onClick={toggleShadowsEnabled}
          aria-pressed={shadowsEnabled}
          title="Toggle shadows. Turn off for better performance"
        >
          {shadowsEnabled ? "Disable Shadows" : "Enable Shadows"}
        </button>

        {/* Quality Cycle */}
        <button
          type="button"
          onClick={toggleQuality}
          aria-label="Cycle visual quality"
          title="Determines ambient star count and vertex count of planet geometries"
        >
          Quality: {qualityLabel}
        </button>

        {/* Moons Toggle */}
        <button
          type="button"
          onClick={toggleShowMoons}
          aria-pressed={showMoons}
          title="Toggles moons. Turn off for better performance"
        >
          {showMoons ? "Hide Moons" : "Show Moons"}
        </button>
      </div>
    </div>
  );
};

export default SettingsBar;

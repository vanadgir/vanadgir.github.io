import { createContext, useContext, useMemo, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [paused, setPaused] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [quality, setQuality] = useState("low"); // low, medium, high
  const [showMoons, setShowMoons] = useState(true);
  const [prioritizeDom, setPrioritizeDom] = useState("off"); // off, light, aggressive
  const [domHeavyActive, setDomHeavyActive] = useState(false);

  const value = useMemo(
    () => ({
      // simulation pause/resume
      paused,
      setPaused,
      togglePaused: () => setPaused((p) => !p),

      // orbit visibility
      showOrbits,
      setShowOrbits,
      toggleShowOrbits: () => setShowOrbits((v) => !v),

      // settings tray visibility
      settingsOpen,
      setSettingsOpen,
      toggleSettingsOpen: () => setSettingsOpen((v) => !v),

      // shadows toggle
      shadowsEnabled,
      setShadowsEnabled,
      toggleShadowsEnabled: () => setShadowsEnabled((v) => !v),

      // debug toggle
      debugEnabled,
      setDebugEnabled,
      toggleDebugEnabled: () => setDebugEnabled((v) => !v),

      // quality controls
      quality,
      setQuality,
      toggleQuality: () =>
        setQuality((q) =>
          q === "low" ? "medium" : q === "medium" ? "high" : "low"
        ),

      // throttling controls
      prioritizeDom,
      setPrioritizeDom,
      togglePrioritizeDom: () =>
        setPrioritizeDom((v) =>
          v === "off" ? "light" : v === "light" ? "aggressive" : "off"
        ),

      domHeavyActive,
      setDomHeavyActive,

      // moon toggle
      showMoons,
      setShowMoons,
      toggleShowMoons: () => setShowMoons((v) => !v),
    }),
    [
      paused,
      showOrbits,
      settingsOpen,
      shadowsEnabled,
      debugEnabled,
      quality,
      showMoons,
      prioritizeDom,
      domHeavyActive,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};

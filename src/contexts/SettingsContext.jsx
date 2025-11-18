import { createContext, useContext, useMemo, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [paused, setPaused] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    }),
    [paused, showOrbits, settingsOpen]
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

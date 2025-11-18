import { createContext, useContext, useMemo, useState } from "react";

const PlanetUIContext = createContext(null);

export const PlanetUIProvider = ({ children }) => {
  const [cameraLockedOnPlanet, setCameraLockedOnPlanet] = useState(false);
  const [activePlanetId, setActivePlanetId] = useState(null);

  const value = useMemo(
    () => ({
      cameraLockedOnPlanet,
      setCameraLockedOnPlanet,
      activePlanetId,
      setActivePlanetId,
    }),
    [cameraLockedOnPlanet, activePlanetId]
  );

  return (
    <PlanetUIContext.Provider value={value}>
      {children}
    </PlanetUIContext.Provider>
  );
};

export const usePlanetUI = () => {
  const ctx = useContext(PlanetUIContext);
  if (!ctx) {
    throw new Error("usePlanetUI must be used within PlanetUIProvider");
  }
  return ctx;
};

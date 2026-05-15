import { useLocation } from "wouter";
import { PLANETS } from "../config/planets";
import { useEffect } from "react";

import PlanetInfoOverlay from "./components/InfoOverlay";

import { usePlanetUI } from "../contexts/PlanetUIContext";
import { useSettings } from "../contexts/SettingsContext";
import { useGTag } from "../contexts/GTagContext";

import NavBar from "./components/NavBar";
import SettingsBar from "./components/SettingsBar";
import DebugPanel from "./components/DebugPanel";

const DOM = () => {
  const [location] = useLocation();
  const { cameraLockedOnPlanet, activePlanetId } = usePlanetUI();
  const { setDomHeavyActive } = useSettings();
  const { trackNavigation, trackPageView } = useGTag();

  const isHome = location === "/";
  const activePlanet = !isHome
    ? PLANETS.find((c) => c.id === activePlanetId) ?? null
    : null;

  const overlayOpen = !isHome && activePlanet && cameraLockedOnPlanet;

  useEffect(() => {
    setDomHeavyActive(Boolean(overlayOpen));
  }, [overlayOpen, setDomHeavyActive]);

  useEffect(() => {
    const path =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : location;

    trackNavigation(path);
    trackPageView(path);
  }, [location, trackNavigation, trackPageView]);
  return (
    <div className="dom-root">
      <NavBar />

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

      <SettingsBar />

      <DebugPanel />
    </div>
  );
};

export default DOM;

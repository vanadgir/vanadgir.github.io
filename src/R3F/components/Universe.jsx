import { useMemo, useState, useEffect, useRef } from "react";
import { Stars } from "@react-three/drei";
import { useLocation } from "wouter";

import CameraRig from "./CameraRig";
import Planet from "./Planet";
import SolarBody from "./SolarBody";
import SpaceDust from "./SpaceDust";

import { PLANETS, HOME_FOCUS } from "../../config/planets";
import { usePlanetUI } from "../../contexts/PlanetUIContext";
import { useSettings } from "../../contexts/SettingsContext";

const Universe = () => {
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  const { setCameraLockedOnPlanet, setActivePlanetId } = usePlanetUI();

  const { quality } = useSettings();

  const planetPositionsRef = useRef(
    Object.fromEntries(PLANETS.map((c) => [c.id, null]))
  );

  const updatePlanetPos = (id, pos) => {
    planetPositionsRef.current[id] = pos;
  };

  const selectedPlanet = useMemo(() => {
    if (location === "/") return null;
    return PLANETS.find((c) => c.path === location) ?? null;
  }, [location]);

  const hasCameraTarget = isHome || selectedPlanet != null;

  // Track active Planet
  useEffect(() => {
    setActivePlanetId(selectedPlanet?.id ?? null);
  }, [selectedPlanet?.id, setActivePlanetId]);

  const starCountByQuality = {
    low: 3000,
    medium: 5000,
    high: 9000,
  };

  const dustCountByQuality = {
    low: 1500,
    medium: 2500,
    high: 4000,
  };

  const starCount = starCountByQuality[quality] ?? starCountByQuality.low;
  const dustCount = dustCountByQuality[quality] ?? dustCountByQuality.low;

  return (
    <>
      <Stars
        radius={150}
        depth={80}
        count={starCount}
        factor={4}
        saturation={0}
      />

      <SpaceDust count={dustCount} />

      <SolarBody />

      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          selected={selectedPlanet?.id === planet.id}
          onSelect={(path) => navigate(path)}
          onUpdate={updatePlanetPos}
        />
      ))}

      {hasCameraTarget && (
        <CameraRig
          homeFocus={HOME_FOCUS}
          getFollowPos={() =>
            selectedPlanet
              ? planetPositionsRef.current[selectedPlanet.id]
              : null
          }
          selectedPlanetId={selectedPlanet?.id ?? null}
          isHome={isHome}
          onTransitionStart={() => {
            // whenever a move begins, hide overlay
            setCameraLockedOnPlanet(false);
          }}
          onTransitionEnd={({ isHome: endedAtHome }) => {
            // show only when we end on a Planet
            setCameraLockedOnPlanet(!endedAtHome);
          }}
        />
      )}
    </>
  );
};

export default Universe;

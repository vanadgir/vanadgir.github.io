import { useMemo, useState, useEffect, useRef } from "react";
import { Stars } from "@react-three/drei";
import { useLocation } from "wouter";
import { PLANETS, HOME_FOCUS } from "../../config/planets";
import CameraRig from "./CameraRig";
import Planet from "./Planet";
import { usePlanetUI } from "../../contexts/PlanetUIContext";
import SolarBody from "./SolarBody";
import SpaceDust from "./SpaceDust";

const Universe = () => {
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  const { setCameraLockedOnPlanet, setActivePlanetId } = usePlanetUI();

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

  return (
    <>
      <Stars radius={150} depth={80} count={3000} factor={4} saturation={0} />

      <SpaceDust />

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

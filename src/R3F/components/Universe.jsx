import { useMemo, useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import { useLocation } from "wouter";
import { PLANETS, HOME_FOCUS } from "../../config/planets";
import CameraRig from "./CameraRig";
import Planet from "./Planet";
import { usePlanetUI } from "../../contexts/PlanetUIContext";
import SolarBody from "./SolarBody";

const Universe = () => {
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  const { setCameraLockedOnPlanet, setActivePlanetId } = usePlanetUI();

  const [planetPositions, setPlanetPositions] = useState(
    Object.fromEntries(PLANETS.map((c) => [c.id, null]))
  );

  const updatePlanetPos = (id, pos) => {
    setPlanetPositions((prev) => ({ ...prev, [id]: pos }));
  };

  const selectedPlanet = useMemo(() => {
    if (location === "/") return null;
    return PLANETS.find((c) => c.path === location) ?? null;
  }, [location]);

  const followPos =
    selectedPlanet != null ? planetPositions[selectedPlanet.id] : null;
  const hasCameraTarget = isHome || followPos != null;

  // Track active Planet
  useEffect(() => {
    setActivePlanetId(selectedPlanet?.id ?? null);
  }, [selectedPlanet?.id, setActivePlanetId]);

  return (
    <>
      <Stars radius={150} depth={80} count={9000} factor={4} saturation={0} />

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
          followPos={followPos}
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

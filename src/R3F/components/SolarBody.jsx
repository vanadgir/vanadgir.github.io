import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Outlines } from "@react-three/drei";

import { useThrottledFrame } from "../../hooks/useThrottledFrame";

import { useSettings } from "../../contexts/SettingsContext";
import { usePlanetUI } from "../../contexts/PlanetUIContext";
import sunTextureUrl from "../../assets/textures/sun.png";

const SolarBody = () => {
  const meshRef = useRef();

  const sunTexture = useLoader(THREE.TextureLoader, sunTextureUrl);
  const { paused, shadowsEnabled } = useSettings();

  const [hovered, setHovered] = useState(false);
  const [location, navigate] = useLocation();
  const { requestHomeRecenter } = usePlanetUI();

  useEffect(() => {
    sunTexture.wrapS = THREE.ClampToEdgeWrapping;
    sunTexture.wrapT = THREE.ClampToEdgeWrapping;

    sunTexture.anisotropy = 2;
    sunTexture.center.set(0.5, 0.5);
  }, [sunTexture]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // const scrollSpeed = 0.1; // horizontal UV scroll
  const rotationSpeed = 0.25; // mesh rotation

  useThrottledFrame((_, delta) => {
    if (paused) return;

    if (meshRef.current) {
      meshRef.current.rotation.y -= rotationSpeed * delta;
    }
  });

  const shadowMapSize = shadowsEnabled ? 1024 : 1;
  const shadowDistance = shadowsEnabled ? 180 : 0;


  const handleClick = (e) => {
    e.stopPropagation();

    if (location === "/") {
      // already on home: just recenter camera
      requestHomeRecenter();
    } else {
      // go to / (Universe will handle initial transition)
      navigate("/");
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Central sun mesh */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial
          map={sunTexture}
          color="#ffffff"
          emissive="#ffe9b3"
          emissiveMap={sunTexture}
          emissiveIntensity={1.5}
          roughness={1}
          metalness={0.6}
        />

        {hovered && <Outlines thickness={1.5} color="white" />}
      </mesh>

      {/* Strong radial light to illuminate planets */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3600}
        distance={shadowDistance}
        decay={2}
        color="#ffe9c4"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
      />

      <ambientLight position={[0, 0, 0]} intensity={0.05} />
    </group>
  );
};

export default SolarBody;

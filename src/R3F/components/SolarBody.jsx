import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";

import { useThrottledFrame } from "../../hooks/useThrottledFrame";

import { useSettings } from "../../contexts/SettingsContext";
import sunTextureUrl from "../../assets/textures/sun.png";

const SolarBody = () => {
  const meshRef = useRef();

  const sunTexture = useLoader(THREE.TextureLoader, sunTextureUrl);

  useEffect(() => {
    sunTexture.wrapS = THREE.ClampToEdgeWrapping;
    sunTexture.wrapT = THREE.ClampToEdgeWrapping;

    sunTexture.anisotropy = 2;
    sunTexture.center.set(0.5, 0.5);
  }, [sunTexture]);

  // const scrollSpeed = 0.1; // horizontal UV scroll
  const rotationSpeed = 0.25; // mesh rotation

  const { paused, shadowsEnabled } = useSettings();

  useThrottledFrame((_, delta) => {
    if (paused) return;

    if (meshRef.current) {
      meshRef.current.rotation.y -= rotationSpeed * delta;
    }
  });

  const shadowMapSize = shadowsEnabled ? 1024 : 1;
  const shadowDistance = shadowsEnabled ? 180 : 0;

  return (
    <group position={[0, 0, 0]}>
      {/* Central sun mesh */}
      <mesh ref={meshRef}>
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
      </mesh>

      {/* Strong radial light to illuminate planets */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3500}
        distance={shadowDistance}
        decay={2}
        color="#ffe9c4"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
      />
    </group>
  );
};

export default SolarBody;

import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

import { useSettings } from "../../contexts/SettingsContext";
import sunTextureUrl from "../../assets/textures/sun.png";

const SolarBody = () => {
  const meshRef = useRef();

  const sunTexture = useLoader(THREE.TextureLoader, sunTextureUrl);

  useEffect(() => {
    sunTexture.wrapS = THREE.RepeatWrapping;
    sunTexture.wrapT = THREE.RepeatWrapping;
    sunTexture.anisotropy = 8;
    sunTexture.center.set(0.5, 0.5);
  }, [sunTexture]);

  const scrollSpeed = 0.1; // horizontal UV scroll
  const rotationSpeed = 0.25; // mesh rotation

  const { paused, shadowsEnabled } = useSettings();

  useFrame((_, delta) => {
    if (paused) return;

    sunTexture.offset.x = (sunTexture.offset.x + scrollSpeed * delta) % 1.0;

    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central sun mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[8, 64, 64]} />
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
        intensity={6000} // crank this up a lot
        distance={0} // 0 = no falloff; all planets get light
        decay={2}
        color="#ffe9c4"
        castShadow={shadowsEnabled}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
};

export default SolarBody;

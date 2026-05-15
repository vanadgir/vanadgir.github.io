// SkySphere.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { SkyMaskMaterial } from "../shaders/SkyMaskMaterial";
import { useSettings } from "../../contexts/SettingsContext";
import { useThrottledFrame } from "../../hooks/useThrottledFrame";

const skyboxModules = import.meta.glob("../../assets/skybox/*.jpg", {
  eager: true,
});

export const SKYBOX_TEXTURES = Object.values(skyboxModules).map(
  (mod) => mod.default
);

const SkySphere = ({ index = 0 }) => {
  const { camera } = useThree();
  const meshRef = useRef();
  const matRef = useRef();
  const { paused, quality } = useSettings();

  const [threshold, setThreshold] = useState(0.34);

  const textures = useTexture(SKYBOX_TEXTURES);
  const texture =
    textures && textures.length ? textures[index % textures.length] : null;

  useEffect(() => {
    if (!texture) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

    const scale = 3;
    texture.repeat.set(scale, scale);
  }, [texture]);

  useThrottledFrame((state, delta) => {
    if (!meshRef.current) return;

    if (matRef.current) {
      const t = state.clock.elapsedTime;
      const minT = 0.35;
      const maxT = 0.7;
      const s = (Math.sin(t * 0.3) + 1.0) * 0.5;
      const thresholdValue = minT + (maxT - minT) * s;

      matRef.current.uTime = t;
      matRef.current.uThreshold = thresholdValue;
      setThreshold(thresholdValue);
    }

    if (paused) return;

    // keep sphere around camera
    meshRef.current.position.copy(camera.position);

    // very slow rotation
    meshRef.current.rotation.y += delta * 0.002;
    meshRef.current.rotation.x += delta * 0.004;
    meshRef.current.rotation.z += delta * 0.003;
  });

  const showNebula = useMemo(() => {
    switch (quality) {
      case "high":
      case "medium":
      default:
        return true;
      case "low":
        return false;
    }
  }, [quality]);

  return (
    <>
      {showNebula && (
        <mesh ref={meshRef} renderOrder={-1}>
          <sphereGeometry args={[500, 64, 64]} />
          {texture && (
            <skyMaskMaterial
              ref={matRef}
              uTexture={texture}
              uOpacity={0.9}
              uThreshold={threshold}
              uWaveAmp={1.5}
              uWaveFreq={8.0}
              side={THREE.BackSide}
              depthWrite={false}
              transparent
              toneMapped={false}
            />
          )}
        </mesh>
      )}
    </>
  );
};

export default SkySphere;

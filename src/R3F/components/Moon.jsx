import { useRef, useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

import { useThrottledFrame } from "../../hooks/useThrottledFrame.js";

import { useSettings } from "../../contexts/SettingsContext.jsx";
import normalRoughUrl from "../../assets/textures/normalrough.png";
import normalRough2Url from "../../assets/textures/normalrough2.jpg";
import normalRough3Url from "../../assets/textures/normalrough3.jpg";

const Moon = ({ parentSize = 1, color = "#aaaaaa" }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const geomRef = useRef();
  const tempVec = useRef(new THREE.Vector3());
  const angleRef = useRef(Math.random() * Math.PI * 2);

  const { paused, showOrbits, shadowsEnabled } = useSettings();

  // Load normal/rough textures (same set as planet)
  const normalTextures = useLoader(THREE.TextureLoader, [
    normalRoughUrl,
    normalRough2Url,
    normalRough3Url,
  ]);

  const [normalA, normalB] = useMemo(() => {
    if (!normalTextures || normalTextures.length === 0) {
      return [null, null];
    }
    if (normalTextures.length === 1) {
      return [normalTextures[0], normalTextures[0]];
    }
    const i = Math.floor(Math.random() * normalTextures.length);
    let j = Math.floor(Math.random() * normalTextures.length);
    if (j === i) j = (j + 1) % normalTextures.length;
    return [normalTextures[i], normalTextures[j]];
  }, [normalTextures]);

  // Per-moon parameters: orbit radius, tilt, speed, size, roughness
  const [params] = useState(() => {
    const radiusBase = parentSize * 1.6;
    const radiusJitter = parentSize * 0.6;
    const radius = radiusBase + Math.random() * radiusJitter;

    // Fully random tilt so orbit can go in any direction
    const tiltX = (Math.random() - 0.5) * Math.PI; // [-π/2, π/2]
    const tiltZ = (Math.random() - 0.5) * Math.PI; // [-π/2, π/2]

    const orbitSpeed = 0.6 + Math.random() * 0.8; // faster than planet orbit

    // Moons stay small regardless of parent size
    const moonSize = THREE.MathUtils.clamp(
      parentSize * (0.18 + Math.random() * 0.12),
      0.15,
      0.6
    );

    // Roughness variation
    const roughnessValue = 0.6 + Math.random() * 0.3;

    const direction = Math.random() >= 0.5 ? -1 : 1;

    // Subtle self-rotation
    const selfRotationSpeed = (0.05 + Math.random() * 0.15) * direction;

    return {
      radius,
      tiltX,
      tiltZ,
      orbitSpeed,
      moonSize,
      roughnessValue,
      selfRotationSpeed,
    };
  });

  const orbitEuler = useMemo(
    () => new THREE.Euler(params.tiltX, 0, params.tiltZ),
    [params.tiltX, params.tiltZ]
  );

  // Orbit path visualization around the planet (local space)
  const orbitPoints = useMemo(() => {
    const pts = [];
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const localX = params.radius * Math.cos(theta);
      const localZ = params.radius * Math.sin(theta);
      const v = new THREE.Vector3(localX, 0, localZ);
      v.applyEuler(orbitEuler);
      pts.push(v);
    }
    return pts;
  }, [params.radius, orbitEuler]);

  // Animate orbit + self-rotation
  useThrottledFrame((_, delta) => {
    if (paused) return;
    if (!groupRef.current) return;

    angleRef.current += params.orbitSpeed * delta;

    const localX = params.radius * Math.cos(angleRef.current);
    const localZ = params.radius * Math.sin(angleRef.current);

    const v = tempVec.current.set(localX, 0, localZ);
    v.applyEuler(orbitEuler);

    groupRef.current.position.copy(v);

    if (meshRef.current) {
      meshRef.current.rotation.y += params.selfRotationSpeed * delta;
    }
  });

  return (
    <group>
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={color}
          lineWidth={0.75}
          transparent
          opacity={0.4}
        />
      )}

      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          raycast={null}
          castShadow={shadowsEnabled}
          receiveShadow={shadowsEnabled}
        >
          <sphereGeometry ref={geomRef} args={[params.moonSize, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive="#000000"
            emissiveIntensity={0.0}
            roughness={params.roughnessValue}
            metalness={0.1}
            normalMap={normalA || undefined}
            bumpMap={normalB || undefined}
            bumpScale={0.25}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Moon;

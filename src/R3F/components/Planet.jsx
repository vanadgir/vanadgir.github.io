import { useState, useEffect, useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Outlines, Html, Line } from "@react-three/drei";
import * as THREE from "three";

import { useSettings } from "../../contexts/SettingsContext.jsx";
import normalRoughUrl from "../../assets/textures/normalrough.png";
import normalRough2Url from "../../assets/textures/normalrough2.jpg";
import normalRough3Url from "../../assets/textures/normalrough3.jpg";

import Moon from "./Moon.jsx";

const Planet = ({ planet, onSelect, selected, onUpdate }) => {
  const { position, color, secondaryColor, label, path, speed, size } = planet;

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Orbit angle
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Refs
  const groupRef = useRef();
  const meshRef = useRef();
  const geomRef = useRef();
  const tempVec = useRef(new THREE.Vector3());

  const { paused, showOrbits } = useSettings();

  const moonCount = useMemo(() => {
    if (size >= 6) return 2;
    if (size >= 3.5) return 1;
    return 0;
  }, [size]);

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const moons = useMemo(
    () =>
      Array.from({ length: moonCount }, () => ({
        color: randomColor(),
        secondaryColor: randomColor(),
      })),
    [moonCount]
  );

  // Load all candidate normal/rough textures
  const normalTextures = useLoader(THREE.TextureLoader, [
    normalRoughUrl,
    normalRough2Url,
    normalRough3Url,
  ]);

  // Pick two textures per planet (one as normal, one as bump)
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

  // Roughness variation per planet
  const roughnessValue = useMemo(() => 0.6 + Math.random() * 0.3, []);

  // Color objects for vertex coloring
  const primaryColor = useMemo(() => new THREE.Color(color), [color]);

  const secondaryColorObj = useMemo(
    () => new THREE.Color(secondaryColor || color),
    [secondaryColor, color]
  );

  // Generate vertex colors on the sphere: blend primary + secondary
  useEffect(() => {
    const geom = geomRef.current;
    if (!geom) return;

    const pos = geom.getAttribute("position");
    const count = pos.count;

    const colors = new Float32Array(count * 3);
    const c1 = primaryColor;
    const c2 = secondaryColorObj;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Normalized height: -1 (south pole) to +1 (north pole)
      const r = Math.sqrt(x * x + y * y + z * z) || 1;
      const ny = y / r;

      // Poles vs equator factor
      const poleFactor = Math.abs(ny); // 0 at equator, 1 at poles

      // Some simple band noise using x/z to break up lat bands
      const bandNoise = 0.5 * (Math.sin(x * 1.3) * Math.sin(z * 1.7)) + 0.5;

      // Final mixing factor in [0,1]
      const mixFactor = THREE.MathUtils.clamp(
        0.3 * poleFactor + 0.7 * bandNoise,
        0,
        1
      );

      const mixed = c1.clone().lerp(c2, mixFactor);

      colors[i * 3 + 0] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.attributes.color.needsUpdate = true;
  }, [primaryColor, secondaryColorObj]);

  // Per-planet orbital parameters: ellipse + tilt
  const [ellipse] = useState(() => {
    const r = Math.sqrt(position[0] ** 2 + position[2] ** 2) || 1;

    const stretch = 0.6 + Math.random() * 0.8;
    const a = r;
    const b = r * stretch;

    const tiltX = (Math.random() - 0.5) * 0.35;
    const tiltZ = (Math.random() - 0.5) * 0.35;

    return { a, b, tiltX, tiltZ };
  });

  const orbitEuler = useMemo(
    () => new THREE.Euler(ellipse.tiltX, 0, ellipse.tiltZ),
    [ellipse]
  );

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (path) onSelect(path);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  const selfRotationSpeed = useMemo(() => Math.random() * 0.5 + 0.1, []);

  // Random starting rotation so seams don't line up
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  }, []);

  // Animate orbit + self-rotation
  useFrame((_, delta) => {
    if (paused) return;
    if (!groupRef.current) return;

    angleRef.current += speed * delta;

    const localX = ellipse.a * Math.cos(angleRef.current);
    const localZ = ellipse.b * Math.sin(angleRef.current);

    const v = tempVec.current.set(localX, 0, localZ);
    v.applyEuler(orbitEuler);

    groupRef.current.position.copy(v);
    onUpdate?.(planet.id, [v.x, v.y, v.z]);

    if (meshRef.current) {
      meshRef.current.rotation.y += selfRotationSpeed * delta;
    }
  });

  // Precompute orbit line
  const orbitPoints = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const localX = ellipse.a * Math.cos(theta);
      const localZ = ellipse.b * Math.sin(theta);
      const v = new THREE.Vector3(localX, 0, localZ);
      v.applyEuler(orbitEuler);
      pts.push(v);
    }
    return pts;
  }, [ellipse, orbitEuler]);

  return (
    <>
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      )}

      <group ref={groupRef} visible={visible}>
        <mesh
          castShadow
          receiveShadow
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry ref={geomRef} args={[size, 32, 32]} />
          <meshStandardMaterial
            vertexColors
            emissive="#000000"
            emissiveIntensity={0.6}
            roughness={roughnessValue}
            metalness={0.1}
            normalMap={normalA || undefined}
            bumpMap={normalB || undefined}
            bumpScale={0.25}
          />
          {hovered && <Outlines thickness={1.5} color="white" />}
        </mesh>

        {hovered && !selected && (
          <Html
            transform={false}
            position={[0, size * 1.5, 0]}
            center
            style={{
              fontFamily: `"alagard", system-ui, sans-serif`,
              fontSize: "20px",
              letterSpacing: "0.08em",
              color: "white",
              textShadow: "0 0 6px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {label}
          </Html>
        )}

        {moons.map((moon, i) => (
          <Moon
            key={i}
            parentSize={size}
            color={moon.color}
            secondaryColor={moon.secondaryColor}
          />
        ))}
      </group>
    </>
  );
};

export default Planet;

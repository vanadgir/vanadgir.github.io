import { useState, useEffect, useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Outlines, Html, Line } from "@react-three/drei";
import * as THREE from "three";

import alagardFontUrl from "../../assets/fonts/alagard.ttf";
import { useSettings } from "../../contexts/SettingsContext.jsx";
import normalRoughUrl from "../../assets/textures/normalrough.png";

const Planet = ({ planet, onSelect, selected, onUpdate }) => {
  const { position, color, label, path, speed, size } = planet;

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Angle along the orbit
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // This group is the moving planet (world-space position)
  const groupRef = useRef();
  // This mesh rotates around its own axis
  const meshRef = useRef();

  const { paused, showOrbits } = useSettings();

  // Base roughness/normal-like texture
  const baseRoughTex = useLoader(THREE.TextureLoader, normalRoughUrl);

  const roughnessMap = useMemo(() => {
    const t = baseRoughTex.clone();

    // No repeat: just sample the texture once
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1, 1);
    t.offset.set(0, 0);
    t.anisotropy = 4;
    t.needsUpdate = true;

    return t;
  }, [baseRoughTex]);

  const roughnessValue = useMemo(() => 0.6 + Math.random() * 0.3, []);

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

  // optional: random starting rotation so planets don't share seam orientation
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  }, []);

  useFrame((_, delta) => {
    if (paused) return;
    if (!groupRef.current) return;

    angleRef.current += speed * delta;

    const localX = ellipse.a * Math.cos(angleRef.current);
    const localZ = ellipse.b * Math.sin(angleRef.current);

    const v = new THREE.Vector3(localX, 0, localZ);
    v.applyEuler(orbitEuler);

    groupRef.current.position.copy(v);
    onUpdate?.(planet.id, [v.x, v.y, v.z]);

    // Self-spin around local Y axis
    if (meshRef.current) {
      meshRef.current.rotation.y += selfRotationSpeed * delta;
    }
  });

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

  const showLabel = hovered || selected;

  return (
    <>
      {showOrbits && (
        <Line
          points={orbitPoints}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      )}

      <group ref={groupRef} visible={visible}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive="#000000"
            emissiveIntensity={0.2}
            roughness={roughnessValue}
            metalness={0.1}
            normalMap={roughnessMap}
            normalScale={new THREE.Vector2(5, 5)}
          />
          {hovered && <Outlines thickness={1.5} color="white" />}
        </mesh>

        {showLabel && hovered && (
          <Html
            position={[0, 3, 0]}
            center
            style={{
              pointerEvents: "none",
              fontFamily: `"alagard", ${alagardFontUrl}, sans-serif`,
              fontSize: "24px",
              color: "white",
              textShadow: "0 0 6px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Html>
        )}
      </group>
    </>
  );
};

export default Planet;

import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";

import alagardFontUrl from "../../assets/fonts/alagard.ttf";

let firstInit = true;

const ClusterStar = ({ cluster, onSelect, selected, onUpdate }) => {
  const { position, color, label, path } = cluster;
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(0);
  const sizeRef = useRef(1);

  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    // randomize starting angle only on the very first full app load
    if (firstInit) {
      angleRef.current = Math.random() * Math.PI * 2;
    } else {
      // each star needs a unique persistent angle even after firstInit becomes false
      angleRef.current = Math.random() * Math.PI * 2;
    }

    const r = Math.sqrt(position[0] ** 2 + position[2] ** 2);

    const startX = Math.cos(angleRef.current) * r;
    const startZ = Math.sin(angleRef.current) * r;

    groupRef.current.position.set(startX, 0, startZ);
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

  if (firstInit) {
    angleRef.current = Math.random() * Math.PI * 2;
    sizeRef.current = Math.random() * 3 + 1;
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!visible) setVisible(true);

    const { position, speed } = cluster;

    angleRef.current += speed * delta;

    const r = Math.sqrt(position[0] ** 2 + position[2] ** 2);

    const newX = Math.cos(angleRef.current) * r;
    const newZ = Math.sin(angleRef.current) * r;

    groupRef.current.position.set(newX, 0, newZ);

    onUpdate?.(cluster.id, [newX, 0, newZ]);
  });

  const showLabel = hovered || selected;

  return (
    <group ref={groupRef} visible={visible}>
      {/* Central star mesh */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[sizeRef.current, 32, 32]} />
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={1.6}
          color={color}
        />
        {/* White outline only when hovered */}
        {hovered && <Edges color="#fff" threshold={40} />}
      </mesh>

      {/* DOM label: appears on hover, persists when selected */}
      {(showLabel && hovered) && (
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
  );
};

firstInit = false;

export default ClusterStar;

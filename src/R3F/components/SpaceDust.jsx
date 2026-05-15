import { useRef, useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { useThrottledFrame } from "../../hooks/useThrottledFrame";

import { useSettings } from "../../contexts/SettingsContext";

const SpaceDust = ({ count = 1500, radius = 100 }) => {
  const pointsRef = useRef();
  // const frameCount = useRef(0);

  const { paused } = useSettings();

  const { basePositions, positions, colors, phases } = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random spherical distribution
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      basePositions.set([x, y, z], i3);
      positions.set([x, y, z], i3);

      // Slightly tinted whites/blues/purples
      const hue = 0.55 + Math.random() * 0.1; // blue–purple range
      const sat = 0.2 + Math.random() * 0.4;
      const val = 0.8 + Math.random() * 0.2;
      color.setHSL(hue, sat, val);

      colors.set([color.r, color.g, color.b], i3);

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { basePositions, positions, colors, phases };
  }, [count, radius]);

  useThrottledFrame(({ clock }) => {
    if (paused) return;
    
    // frameCount.current++;
    // if (frameCount.current % 2 !== 0) return;

    const t = clock.getElapsedTime();
    const points = pointsRef.current;
    if (!points) return;

    const geom = points.geometry;
    const posAttr = geom.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const phase = phases[i];

      // Small "snowy" jitter
      const jitterX = Math.sin(t * 2.5 + phase * 1.1) * 0.25;
      const jitterY = Math.cos(t * 2.0 + phase * 0.9) * 0.25;
      const jitterZ = Math.sin(t * 2.2 + phase * 1.3) * 0.25;

      arr[i3] = bx + jitterX;
      arr[i3 + 1] = by + jitterY;
      arr[i3 + 2] = bz + jitterZ;
    }

    posAttr.needsUpdate = true;

    // Optional subtle global shimmer
    const mat = points.material;
    if (mat) {
      mat.opacity = 0.5 + 0.2 * Math.sin(t * 1.5);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15} // same scale you already see
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export default SpaceDust;

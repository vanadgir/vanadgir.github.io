import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const CLUSTERS = [
  {
    id: "blog",
    label: "Blog",
    position: [-10, 0, 0],
    color: "#f97316", // orange
  },
  {
    id: "portfolio",
    label: "Portfolio",
    position: [0, 0, 0],
    color: "#22c55e", // green
  },
  {
    id: "documents",
    label: "Documents",
    position: [10, 0, 0],
    color: "#3b82f6", // blue
  },
];

const Star = ({ color = "white", scale = 1, ...props }) => {
  return (
    <mesh {...props} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={1.5} color={color} />
    </mesh>
  );
}

const Cluster = ({ cluster }) => {
  const { position, color } = cluster;

  return (
    <group position={position}>
      {/* Central star/sun for this cluster */}
      <Star color={color} scale={1.4} />

      {/* Simple label helper: you can replace with Drei <Html> or <Text> later */}
      {/* This is just a small marker to help you orient clusters visually */}
      <mesh position={[0, 2.2, 0]}>
        <planeGeometry args={[3, 0.5]} />
        <meshToonMaterial transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

const Scene = () => {
  return (
    <>
      {/* Global ambient light so things are visible */}
      <ambientLight intensity={0.2} />

      {/* Main directional light (acts like a general light source) */}
      <directionalLight position={[5, 10, 5]} intensity={0.5} />

      {/* Background stars */}
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={4}
        saturation={0}
        fade
      />

      {/* All clusters visible on the home view */}
      {CLUSTERS.map((cluster) => (
        <Cluster key={cluster.id} cluster={cluster} />
      ))}

      {/* Default orbit controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={40}
      />
    </>
  );
}

const R3F = () => {
  return (
    <div className="r3f-root">
      <Canvas
        camera={{
          position: [0, 10, 25], // pulled back so all 3 clusters are visible at start
          fov: 50,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default R3F;
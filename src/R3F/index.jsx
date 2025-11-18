import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HOME_FOCUS } from "../config/planets";
import Universe from "./components/Universe";

const R3F = () => {
  return (
    <div className="r3f-root">
      <Canvas
        camera={{
          position: HOME_FOCUS.cameraPos,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <Universe />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default R3F;

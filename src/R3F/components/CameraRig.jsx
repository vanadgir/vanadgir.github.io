import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const PLANET_OFFSET = new THREE.Vector3(0, 15, 35);
const TRANSITION_TIME = 0.35;
const SNAP_DISTANCE = 0.4; // tweak to taste

export default function CameraRig({
  homeFocus,
  followPos,
  selectedPlanetId,
  isHome,
  onTransitionStart,
  onTransitionEnd,
}) {
  const { camera } = useThree();
  const controls = useRef(null);

  const currentTarget = useRef(new THREE.Vector3(...homeFocus.target));

  const state = useRef({
    active: false,
    t: 0,
    fromPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    toTarget: new THREE.Vector3(),
  });

  // temp vectors reused in useFrame to avoid allocations
  const tmpTarget = useRef(new THREE.Vector3());
  const tmpPos = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.position.set(...homeFocus.cameraPos);
    currentTarget.current.set(...homeFocus.target);
    camera.lookAt(currentTarget.current);

    if (controls.current) {
      controls.current.enabled = true;
      controls.current.target.copy(currentTarget.current);
      controls.current.update();
    }
  }, [camera, homeFocus]);

  // Start a new transition whenever home/selection changes
  useEffect(() => {
    const s = state.current;

    s.active = true;
    s.t = 0;

    s.fromPos.copy(camera.position);
    s.fromTarget.copy(currentTarget.current);

    // Static fallback targets (used for home transitions or when followPos is missing)
    if (isHome || !followPos || !selectedPlanetId) {
      s.toPos.set(...homeFocus.cameraPos);
      s.toTarget.set(...homeFocus.target);
    } else {
      const target = new THREE.Vector3().fromArray(followPos);
      s.toTarget.copy(target);
      s.toPos.copy(target).add(PLANET_OFFSET);
    }

    if (controls.current) {
      controls.current.enabled = false;
    }

    onTransitionStart?.({
      isHome,
      selectedPlanetId: selectedPlanetId ?? null,
    });
  }, [isHome, selectedPlanetId, camera, homeFocus]);

  useFrame((_, delta) => {
    const s = state.current;

    // 1) Transition phase
    if (s.active) {
      s.t += delta / TRANSITION_TIME;
      const t = Math.min(1, s.t);

      const desiredTarget = tmpTarget.current;
      const desiredPos = tmpPos.current;

      if (!isHome && followPos && selectedPlanetId) {
        // Use the star's *current* position as the moving target
        desiredTarget.fromArray(followPos);
        desiredPos.copy(desiredTarget).add(PLANET_OFFSET);
      } else {
        // Home transitions: just use the static home focus
        desiredTarget.copy(s.toTarget);
        desiredPos.copy(s.toPos);
      }

      // Lerp from original fromPos/fromTarget to the *current* desired point
      camera.position.lerpVectors(s.fromPos, desiredPos, t);
      currentTarget.current.lerpVectors(s.fromTarget, desiredTarget, t);
      camera.lookAt(currentTarget.current);

      const dist = camera.position.distanceTo(desiredPos);
      const reached = dist < SNAP_DISTANCE || t >= 1;

      if (reached) {
        s.active = false;

        // Snap exactly to the live desired position/target
        camera.position.copy(desiredPos);
        currentTarget.current.copy(desiredTarget);
        camera.lookAt(currentTarget.current);

        onTransitionEnd?.({
          isHome,
          selectedPlanetId: selectedPlanetId ?? null,
        });

        if (isHome && controls.current) {
          controls.current.enabled = true;
          controls.current.target.copy(currentTarget.current);
          controls.current.update();
        }
      }

      return;
    }

    // 2) Hard-follow planet with fixed offset (uses live followPos)
    if (!isHome && followPos) {
      const target = currentTarget.current.fromArray(followPos);
      const desiredPos = tmpPos.current.copy(target).add(PLANET_OFFSET);

      camera.position.copy(desiredPos);
      camera.lookAt(target);
      return;
    }

    // 3) Home + idle: OrbitControls
    if (isHome && controls.current) {
      controls.current.update();
      currentTarget.current.copy(controls.current.target);
    }
  });

  return isHome ? (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={40}
      maxDistance={200}
    />
  ) : null;
}

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useThrottledFrame } from "../../hooks/useThrottledFrame";

const PLANET_OFFSET = new THREE.Vector3(0, 15, 35);
const TRANSITION_TIME = 0.35;
const SNAP_DISTANCE = 0.4;
const ORBIT_SPEED = 0.05;

export default function CameraRig({
  homeFocus,
  getFollowPos,
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

  const orbitAngle = useRef(0);

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

    // when we start focusing a planet again, reset orbit angle
    if (!isHome && selectedPlanetId) {
      orbitAngle.current = 0;
    }

    // Static fallback targets (used for home transitions or when followPos is missing)
    if (isHome || !selectedPlanetId) {
      s.toPos.set(...homeFocus.cameraPos);
      s.toTarget.set(...homeFocus.target);
    }

    if (controls.current) {
      controls.current.enabled = false;
    }

    onTransitionStart?.({
      isHome,
      selectedPlanetId: selectedPlanetId ?? null,
    });
  }, [isHome, selectedPlanetId, camera, homeFocus]);

  useThrottledFrame((_, delta) => {
    const s = state.current;
    const followPos = getFollowPos ? getFollowPos() : null;

    // 1) Transition phase
    if (s.active) {
      s.t += delta / TRANSITION_TIME;
      const t = Math.min(1, s.t);

      const desiredTarget = tmpTarget.current;
      const desiredPos = tmpPos.current;

      if (!isHome && followPos && selectedPlanetId) {
        // Use the star's *current* position as the moving target
        desiredTarget.fromArray(followPos);
        // During transition, just go to the canonical offset (no spin yet)
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

    // 2) Planet focus: slow orbit around the vertical axis
    if (!isHome && followPos) {
      const target = currentTarget.current.fromArray(followPos);

      // radius and height derived from PLANET_OFFSET
      const radius = Math.hypot(PLANET_OFFSET.x, PLANET_OFFSET.z);
      const height = PLANET_OFFSET.y;

      // advance orbit angle slowly
      orbitAngle.current += ORBIT_SPEED * delta;

      const desiredPos = tmpPos.current.set(
        target.x + Math.sin(orbitAngle.current) * radius,
        target.y + height,
        target.z + Math.cos(orbitAngle.current) * radius
      );

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

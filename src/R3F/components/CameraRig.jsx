import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CLUSTER_OFFSET = new THREE.Vector3(0, 15, 35);
const TRANSITION_TIME = 0.35;

export default function CameraRig({
  homeFocus,
  followPos,
  selectedClusterId,
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

    if (isHome || !followPos || !selectedClusterId) {
      s.toPos.set(...homeFocus.cameraPos);
      s.toTarget.set(...homeFocus.target);
    } else {
      const target = new THREE.Vector3().fromArray(followPos);
      s.toTarget.copy(target);
      s.toPos.copy(target).add(CLUSTER_OFFSET);
    }

    if (controls.current) {
      controls.current.enabled = false;
    }

    // notify parent: transition started
    onTransitionStart?.({
      isHome,
      selectedClusterId: selectedClusterId ?? null,
    });
  }, [isHome, selectedClusterId, camera, homeFocus]);

  useFrame((_, delta) => {
    const s = state.current;

    // 1) Transition phase
    if (s.active) {
      s.t += delta / TRANSITION_TIME;
      const t = Math.min(1, s.t);
      const k = t;

      camera.position.lerpVectors(s.fromPos, s.toPos, k);
      currentTarget.current.lerpVectors(s.fromTarget, s.toTarget, k);
      camera.lookAt(currentTarget.current);

      if (t >= 1) {
        s.active = false;

        // notify parent: transition ended
        onTransitionEnd?.({
          isHome,
          selectedClusterId: selectedClusterId ?? null,
        });

        if (isHome && controls.current) {
          controls.current.enabled = true;
          controls.current.target.copy(currentTarget.current);
          controls.current.update();
        }
      }

      return;
    }

    // 2) Hard-follow cluster with fixed offset
    if (!isHome && followPos) {
      const target = currentTarget.current.fromArray(followPos);
      const desiredPos = new THREE.Vector3().copy(target).add(CLUSTER_OFFSET);

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
    />
  ) : null;
}

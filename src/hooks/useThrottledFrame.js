import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSettings } from "../contexts/SettingsContext";

export const useThrottledFrame = (callback) => {
  const { prioritizeDom, domHeavyActive } = useSettings();
  const frameCountRef = useRef(0);

  useFrame((state, delta) => {
    if (!domHeavyActive || prioritizeDom === "off") {
      callback(state, delta);
      return;
    }
    
    frameCountRef.current += 1;

    let step = 1;
    if (prioritizeDom === "light") step = 3;
    else if (prioritizeDom === "aggressive") step = 6;

    // Skip this frame if we're not on the right step
    if (frameCountRef.current % step !== 0) return;

    // Multiply delta by step so your simulation time stays roughly correct
    callback(state, delta * step);
  });
};

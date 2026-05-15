import { useEffect, useRef, useState } from "react";
import { useSettings } from "../../contexts/SettingsContext";

const DebugPanel = () => {
  const { debugEnabled } = useSettings();
  const [fps, setFps] = useState(0);
  const lastTime = useRef(performance.now());
  const frames = useRef(0);

  useEffect(() => {
    if (!debugEnabled) return;

    let rafId;

    const measure = (now) => {
      frames.current += 1;

      if (now - lastTime.current >= 1000) {
        setFps(frames.current);
        frames.current = 0;
        lastTime.current = now;
      }

      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(rafId);
  }, [debugEnabled]);

  if (!debugEnabled) return null;

  return (
    <div className="debug-panel">
      {fps} fps
    </div>
  );
};

export default DebugPanel;

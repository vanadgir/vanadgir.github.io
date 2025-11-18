// DOM/components/ClusterInfoOverlay.jsx
import { useEffect, useRef, useState } from "react";
import { useClusterUI } from "../../contexts/ClusterUIContext";

const NAV_MARGIN = 12;
const SCREEN_MARGIN = 12;

const ClusterInfoOverlay = ({ cluster }) => {
  if (!cluster) return null;

  const InfoComponent = cluster.InfoComponent ?? DefaultClusterInfo;

  const { overlayPos, setOverlayPos } = useClusterUI();

  const boxRef = useRef(null);

  // Local screen-space position (top-left) used for rendering & dragging
  const [pos, setPos] = useState(null); // { x, y } | null
  const posRef = useRef(null);

  const [tail, setTail] = useState({
    length: 0,
    angle: 0,
    anchorLocalX: 0,
    anchorLocalY: 0,
  });

  const dragState = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  // Keep ref in sync with latest pos
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  // Clamp helpers use the current box rect
  const clampY = (rawY, rect) => {
    const navEl = document.querySelector(".dom-nav");

    let minY = SCREEN_MARGIN;
    if (navEl) {
      const navRect = navEl.getBoundingClientRect();
      minY = navRect.bottom + NAV_MARGIN;
    }

    let maxY = window.innerHeight - rect.height - SCREEN_MARGIN;
    if (maxY < minY) maxY = minY;

    return Math.min(Math.max(rawY, minY), maxY);
  };

  const clampX = (rawX, rect) => {
    const minX = SCREEN_MARGIN;
    const maxX = window.innerWidth - rect.width - SCREEN_MARGIN;
    if (maxX < minX) {
      // Screen too narrow for full width; box will be shrunk by CSS max-width.
      // In that case, just clamp to minX.
      return minX;
    }
    return Math.min(Math.max(rawX, minX), maxX);
  };

  // Initial position:
  // - first time ever: bottom-left, above screen margin
  // - later: reuse persisted overlayPos (clamped to viewport)
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (pos != null) return;

    function initPosition() {
      const rect = el.getBoundingClientRect();

      if (overlayPos) {
        const x = clampX(overlayPos.x, rect);
        const y = clampY(overlayPos.y, rect);
        setPos({ x, y });
        return;
      }

      // First time: bottom-left
      // First time: bottom-right
      const x = clampX(window.innerWidth - rect.width - SCREEN_MARGIN, rect);

      const y = clampY(window.innerHeight - rect.height - SCREEN_MARGIN, rect);

      setPos({ x, y });
    }

    initPosition();
    window.addEventListener("resize", initPosition);
    return () => window.removeEventListener("resize", initPosition);
  }, [overlayPos, pos]);

  // Tail: from nearest point on box edge to screen center (shortened)
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !pos) return;

    function updateTail() {
      const rect = el.getBoundingClientRect();

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const left = rect.left;
      const right = rect.right;
      const top = rect.top;
      const bottom = rect.bottom;

      // Clamp center to box bounds
      const clampedX = Math.min(Math.max(centerX, left), right);
      const clampedY = Math.min(Math.max(centerY, top), bottom);

      // Distances to each edge
      const distLeft = Math.abs(clampedX - left);
      const distRight = Math.abs(right - clampedX);
      const distTop = Math.abs(clampedY - top);
      const distBottom = Math.abs(bottom - clampedY);

      // Pick nearest edge
      let anchorX, anchorY;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      if (minDist === distLeft) {
        anchorX = left;
        anchorY = clampedY;
      } else if (minDist === distRight) {
        anchorX = right;
        anchorY = clampedY;
      } else if (minDist === distTop) {
        anchorX = clampedX;
        anchorY = top;
      } else {
        anchorX = clampedX;
        anchorY = bottom;
      }

      // Vector from anchor to center
      const dx = centerX - anchorX;
      const dy = centerY - anchorY;

      const fullLen = Math.sqrt(dx * dx + dy * dy) || 1;
      const length = fullLen * 0.7; // go 70% of the way toward center
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Convert anchor to local box coordinates
      const anchorLocalX = anchorX - rect.left;
      const anchorLocalY = anchorY - rect.top;

      setTail({ length, angle: angleDeg, anchorLocalX, anchorLocalY });
    }

    updateTail();
    window.addEventListener("resize", updateTail);
    return () => window.removeEventListener("resize", updateTail);
  }, [pos]);

  // Global mouse handlers for dragging (local state only; no context updates here)
  useEffect(() => {
    function handleMove(e) {
      if (!dragState.current.dragging) return;

      e.preventDefault();

      const el = boxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const rawX = e.clientX - dragState.current.offsetX;
      const rawY = e.clientY - dragState.current.offsetY;

      const x = clampX(rawX, rect);
      const y = clampY(rawY, rect);

      setPos({ x, y });
    }

    function handleUp() {
      if (!dragState.current.dragging) return;
      dragState.current.dragging = false;
      setIsDragging(false);

      // Persist final position to context (only once at drag end)
      if (posRef.current) {
        setOverlayPos(posRef.current);
      }
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [setOverlayPos]);

  const handleMouseDown = (e) => {
    const el = boxRef.current;
    if (!el) return;

    // prevent text selection
    e.preventDefault();

    const rect = el.getBoundingClientRect();
    dragState.current.dragging = true;
    dragState.current.offsetX = e.clientX - rect.left;
    dragState.current.offsetY = e.clientY - rect.top;
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setIsDragging(false);

    if (posRef.current) {
      setOverlayPos(posRef.current);
    }
  };

  // Style: use top/left when pos is known, otherwise CSS fallback.
  const style =
    pos != null
      ? {
          top: `${pos.y}px`,
          left: `${pos.x}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }
      : {
          cursor: isDragging ? "grabbing" : "grab",
        };

  return (
    <div className="cluster-overlay-root">
      <div
        className="cluster-overlay-box"
        ref={boxRef}
        style={style}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Tail from nearest edge point to center */}
        <div
          className="cluster-overlay-tail"
          style={{
            "--tail-length": `${tail.length}px`,
            "--tail-angle": `${tail.angle}deg`,
            "--tail-anchor-x": `${tail.anchorLocalX}px`,
            "--tail-anchor-y": `${tail.anchorLocalY}px`,
          }}
        />
        <InfoComponent cluster={cluster} />
      </div>
    </div>
  );
};

const DefaultClusterInfo = ({ cluster }) => (
  <div>
    <h2>{cluster.label}</h2>
    <p>Content coming soon.</p>
  </div>
);

export default ClusterInfoOverlay;

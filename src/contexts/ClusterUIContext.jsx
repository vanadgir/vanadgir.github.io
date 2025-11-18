// src/contexts/ClusterUIContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const ClusterUIContext = createContext(null);

export const ClusterUIProvider = ({ children }) => {
  const [cameraLockedOnCluster, setCameraLockedOnCluster] = useState(false);
  const [activeClusterId, setActiveClusterId] = useState(null);

  const [overlayPos, setOverlayPos] = useState(null);

  const value = useMemo(
    () => ({
      cameraLockedOnCluster,
      setCameraLockedOnCluster,
      activeClusterId,
      setActiveClusterId,
      overlayPos,
      setOverlayPos,
    }),
    [cameraLockedOnCluster, activeClusterId, overlayPos]
  );

  return (
    <ClusterUIContext.Provider value={value}>
      {children}
    </ClusterUIContext.Provider>
  );
};

export const useClusterUI = () => {
  const ctx = useContext(ClusterUIContext);
  if (!ctx) {
    throw new Error("useClusterUI must be used within ClusterUIProvider");
  }
  return ctx;
};

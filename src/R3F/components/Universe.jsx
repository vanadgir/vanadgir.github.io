import { useMemo, useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import { useLocation } from "wouter";
import { CLUSTERS, HOME_FOCUS } from "../../config/clusters";
import CameraRig from "./CameraRig";
import ClusterStar from "./ClusterStar";
import { useClusterUI } from "../../contexts/ClusterUIContext";

const Universe = () => {
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  const { setCameraLockedOnCluster, setActiveClusterId } = useClusterUI();

  const [clusterPositions, setClusterPositions] = useState(
    Object.fromEntries(CLUSTERS.map((c) => [c.id, c.position]))
  );

  const updateClusterPos = (id, pos) => {
    setClusterPositions((prev) => ({ ...prev, [id]: pos }));
  };

  const selectedCluster = useMemo(() => {
    if (location === "/") return null;
    return CLUSTERS.find((c) => c.path === location) ?? null;
  }, [location]);

  const followPos =
    selectedCluster != null ? clusterPositions[selectedCluster.id] : null;

  // Track active cluster
  useEffect(() => {
    setActiveClusterId(selectedCluster?.id ?? null);
  }, [selectedCluster?.id, setActiveClusterId]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[30, 40, 20]} intensity={1.2} />

      <Stars
        radius={150}
        depth={80}
        count={9000}
        factor={4}
        saturation={0}
      />

      {CLUSTERS.map((cluster) => (
        <ClusterStar
          key={cluster.id}
          cluster={cluster}
          selected={selectedCluster?.id === cluster.id}
          onSelect={(path) => navigate(path)}
          onUpdate={updateClusterPos}
        />
      ))}

      <CameraRig
        homeFocus={HOME_FOCUS}
        followPos={followPos}
        selectedClusterId={selectedCluster?.id ?? null}
        isHome={isHome}
        onTransitionStart={() => {
          // whenever a move begins, hide overlay
          setCameraLockedOnCluster(false);
        }}
        onTransitionEnd={({ isHome: endedAtHome }) => {
          // show only when we end on a cluster
          setCameraLockedOnCluster(!endedAtHome);
        }}
      />
    </>
  );
};

export default Universe;

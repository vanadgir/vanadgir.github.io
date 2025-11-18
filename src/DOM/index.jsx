import { useLocation } from "wouter";
import { CLUSTERS } from "../config/clusters";
import GithubIcon from "../assets/images/github.svg";
import LinkedInIcon from "../assets/images/linkedin.svg";
import ClusterInfoOverlay from "./components/ClusterInfoOverlay";
import { useClusterUI } from "../contexts/ClusterUIContext";

const DOM = () => {
  const [location, navigate] = useLocation();
  const { cameraLockedOnCluster, activeClusterId } = useClusterUI();

  const isHome = location === "/";
  const activeCluster = !isHome
    ? CLUSTERS.find((c) => c.id === activeClusterId) ?? null
    : null;

  return (
    <div className="dom-root">
      <nav className="dom-nav" aria-label="Cluster navigation">
        {/* Router-controlled buttons */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-pressed={isHome}
        >
          Home
        </button>

        {CLUSTERS.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            onClick={() => navigate(cluster.path)}
            aria-pressed={location === cluster.path}
          >
            {cluster.label}
          </button>
        ))}

        <a
          href="https://github.com/vanadgir"
          target="_blank"
          rel="noreferrer"
          className="dom-nav-icon external-icon"
          aria-label="GitHub"
          title="GitHub"
        >
          <img src={GithubIcon} alt="" />
        </a>

        <a
          href="https://www.linkedin.com/in/varun-nadgir/"
          target="_blank"
          rel="noreferrer"
          className="dom-nav-icon external-icon"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <img src={LinkedInIcon} alt="" />
        </a>
      </nav>
      {isHome && (
        <div className="dom-body">
          <h1>Welcome, Visitor</h1>
          I'm Varun. I'd like to make an apple pie from scratch, so I invented a
          universe. <br />
          Hope you enjoy your stay. Visit the planets to learn more about me!
        </div>
      )}

      {!isHome && activeCluster && cameraLockedOnCluster && (
        <ClusterInfoOverlay
          cluster={activeCluster}
        />
      )}
    </div>
  );
};

export default DOM;

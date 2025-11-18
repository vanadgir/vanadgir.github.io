import BlogClusterInfo from "../DOM/components/cluster-info/BlogClusterInfo"
import ProjectsClusterInfo from "../DOM/components/cluster-info/ProjectsClusterInfo";
import DocsClusterInfo from "../DOM/components/cluster-info/DocsClusterInfo";
import MusicClusterInfo from "../DOM/components/cluster-info/MusicClusterInfo";

export const CLUSTERS = [
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    position: [10, 0, 10],
    color: "#f97316",
    speed: 0.1,
    InfoComponent: BlogClusterInfo,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/projects",
    position: [20, 0, 30],
    color: "#22c55e",
    speed: 0.2,
    InfoComponent: ProjectsClusterInfo,
  },
  {
    id: "docs",
    label: "Docs",
    path: "/docs",
    position: [-15, 0, -25],
    color: "#3b67f6",
    speed: 0.3,
    InfoComponent: DocsClusterInfo,
  },
  {
    id: "music",
    label: "Music",
    path: "/music",
    position: [-30, 0, -50],
    color: "#a83bf6",
    speed: 0.15,
    InfoComponent: MusicClusterInfo,
  },
];

export const HOME_FOCUS = {
  cameraPos: [0, 25, 90],
  target: [0, 0, 0],
};

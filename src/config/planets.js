import BlogInfo from "../DOM/components/info/BlogInfo";
import ProjectsInfo from "../DOM/components/info/ProjectsInfo";
import DocsInfo from "../DOM/components/info/DocsInfo";
import MusicInfo from "../DOM/components/info/MusicInfo";

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const randomSpeed = () => {
  return Math.random() * 0.15 + 0.1;
};

export const PLANETS = [
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    position: [25, 0, 30],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: Math.random() * 3 + 1,
    InfoComponent: BlogInfo,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/projects",
    position: [35, 0, 40],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: Math.random() * 3 + 1,
    InfoComponent: ProjectsInfo,
  },
  {
    id: "music",
    label: "Music",
    path: "/music",
    position: [-20, 0, -30],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: Math.random() * 3 + 1,
    InfoComponent: MusicInfo,
  },
  {
    id: "docs",
    label: "Docs",
    path: "/docs",
    position: [-40, 0, -55],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: Math.random() * 3 + 1,
    InfoComponent: DocsInfo,
  },
];

export const HOME_FOCUS = {
  cameraPos: [0, 25, 90],
  target: [0, 0, 0],
};

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

const randomSize = () => {
  return Math.random() * 5 + 1.5;
}

export const PLANETS = [
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    position: [25, 0, 30],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: randomSize(),
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
    size: randomSize(),
    InfoComponent: ProjectsInfo,
  },
  {
    id: "music",
    label: "Music",
    path: "/music",
    position: [-30, 0, -45],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: randomSize(),
    InfoComponent: MusicInfo,
  },
  {
    id: "docs",
    label: "Docs",
    path: "/docs",
    position: [-60, 0, -75],
    color: randomColor(),
    secondaryColor: randomColor(),
    speed: randomSpeed(),
    size: randomSize(),
    InfoComponent: DocsInfo,
  },
];

export const HOME_FOCUS = {
  cameraPos: [0, 25, 90],
  target: [0, 0, 0],
};

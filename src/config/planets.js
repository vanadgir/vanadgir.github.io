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
};

const randomAngle = () => Math.random() * Math.PI * 2;

const randomRadiusBetween = (min, max) => {
  return min + Math.random() * (max - min);
};

const positionOnRing = (minRadius, maxRadius) => {
  const radius = randomRadiusBetween(minRadius, maxRadius);
  const angle = randomAngle();
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return [x, 0, z];
};

export const PLANETS = [
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    position: positionOnRing(28, 32),
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
    position: positionOnRing(48, 54),
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
    position: positionOnRing(64, 72),
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
    position: positionOnRing(86, 94),
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

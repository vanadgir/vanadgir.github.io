
import { useLocation } from "wouter";
import { PLANETS } from "../../config/planets";
import GithubIcon from "../../assets/images/github.svg";
import LinkedInIcon from "../../assets/images/linkedin.svg";

const NavBar = () => {
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  return (
    <nav className="dom-nav" aria-label="Planet navigation">
      {/* Router-controlled buttons */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-pressed={isHome}
      >
        Home
      </button>

      {PLANETS.map((planet) => (
        <button
          key={planet.id}
          type="button"
          onClick={() => navigate(planet.path)}
          aria-pressed={location === planet.path}
        >
          {planet.label}
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
  );
};

export default NavBar;

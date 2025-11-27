const iconModules = import.meta.glob(
  "../../../assets/icons/*.{svg,png}",
  { eager: true }
);

// Map basename (no extension) -> URL
const iconUrlMap = {};
for (const path in iconModules) {
  const url = iconModules[path].default;
  const filename = path.split("/").pop();

  // remove last extension of any type
  const basename = filename.replace(/\.[^.]+$/i, "");

  iconUrlMap[basename] = url;
}

const imageModules = import.meta.glob(
  "../../../assets/projects/*.{png,jpg,jpeg,webp,gif}",
  { eager: true }
);

const imageUrlMap = {};
for (const path in imageModules) {
  const url = imageModules[path].default;
  const filename = path.split("/").pop();
  const basename = filename.replace(/\.[^.]+$/i, "");
  imageUrlMap[basename] = url;
}

const docModules = import.meta.glob(
  "../../../assets/projectdocs/*.{pdf,doc,docx}",
  { eager: true }
);

const docUrlMap = {};
for (const path in docModules) {
  const url = docModules[path].default;
  const filename = path.split("/").pop();
  docUrlMap[filename] = url;
}

const projectConfig = {
  portfolio3d: {
    title: "3D Portfolio Universe",
    subtitle: "This website!",
    summary: "Universe simulation and personal portfolio",
    description:
      "A fully client-side 3D portfolio built with React Three Fiber and Vite. " +
      "Features orbital camera transitions, options for quality vs. performance, and a UI layer " +
      "synchronized with the 3D scene showcasing blog entries, project summaries, and important documents.",
    hyperlinks: [
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/vanadgir/vanadgir.github.io",
      },
    ],
    technologies: [
      { id: "three", label: "three.js", iconKey: "threejs" },
      { id: "react", label: "React", iconKey: "reactjs" },
      { id: "javascript", label: "JavaScript", iconKey: "javascript" },
      { id: "vite", label: "Vite", iconKey: "vitejs" },
    ],
  },

  murdeerGame: {
    title: "MURDEER",
    subtitle: "Unity FPS game",
    summary: "You play as a deer with a gun",
    description:
      'Originally developed for Big Mode Gam Jam 2025 for the theme "POWER", ' +
      "MURDEER has gone into full development with a small team of 4. " +
      'Primary responsibilities include Rigidbody PlayerController, "infinite" gun attachment system, ' +
      "FMOD dynamic audio and music intensity system, and lots of other features.",
    imageKey: ["murdeer", "murdeergameplay", "murdeercrazygun"],
    hyperlinks: [
      {
        id: "studio-page",
        text: "Swift Stag Studios",
        href: "https://swiftstagstudios.org/",
      },
      {
        id: "itch-io",
        text: "itch.io",
        href: "https://accipitrade.itch.io/murdeer",
      },
    ],
    technologies: [
      { id: "unity", label: "Unity", iconKey: "unity" },
      { id: "csharp", label: "C#", iconKey: "csharp" },
      { id: "fmod", label: "FMOD", iconKey: "fmod" },
    ],
  },

  unrealPuzzle: {
    title: "Unreal Engine Puzzle Prototype",
    subtitle: "Color-based UE5 Puzzle",
    summary: "Combine 3 color channels to match a target color",
    description:
      "Made with Blueprints and free assets taken from Epic Games rotating store. " +
      "Created custom shaders for the liquid effect and used central GameManager " +
      "hooked up with events to determine puzzle completion progress and win condition. " +
      "Submitted as my capstone project for ELVTR Become a Technical Artist course.",
    imageKey: ["PuzzleHighlight"],
    hyperlinks: [
      {
        id: "youtube-link",
        text: "YouTube Walkthrough",
        href: "https://www.youtube.com/watch?v=bzhkDNROZVk",
      },
    ],
    technologies: [{ id: "unreal", label: "Unreal Engine 5", iconKey: "ue" }],
  },

  diceRoller: {
    title: "three20",
    subtitle: "3D Physics-based dice roller",
    summary: "Tabletop assistant for simulating real dice rolls",
    imageKey: ["three20"],
    description:
      "Made with tabletop gamers in mind, three20 allows visitors to " +
      "get close to the feeling of rolling real dice. Primary responsibilities " +
      "included initial geometry setup, roll detection algorithm, and in-app audio player. " +
      "Takes advantage of asynchronous asset loading and linear algebra for tighter performance.",
    hyperlinks: [
      {
        id: "live-page",
        text: "three20",
        href: "https://dice.br-ndt.dev/",
      },
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/vanadgir/three20",
      },
    ],
    technologies: [
      { id: "three", label: "three.js", iconKey: "threejs" },
      { id: "react", label: "React", iconKey: "reactjs" },
      { id: "javascript", label: "JavaScript", iconKey: "javascript" },
      { id: "vite", label: "Vite", iconKey: "vitejs" },
    ],
  },

  endlessCraft: {
    title: "EndLLMless",
    subtitle: "Endless crafting with ChatGPT",
    summary: "Use your imagination to create infinite combinations",
    imageKey: ["endllmless"],
    description:
      "In this Infinite Craft-inspired game, you select two words as input, which sends a request to " +
      "OpenAI / ChatGPT to create a combined concept and chooses a related emoji. " +
      "Can store your creations, allowing you to continue creating at a later time.",
    hyperlinks: [
      {
        id: "live-page",
        text: "EndLLMless",
        href: "https://endless.bitvox.me/",
      },
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/br-ndt/endllmless",
      },
    ],
    technologies: [
      { id: "chatGPT", label: "ChatGPT", iconKey: "chatgpt" },
      { id: "express", label: "Express.js", iconKey: "express" },
      { id: "javascript", label: "JavaScript", iconKey: "javascript" },
      { id: "react", label: "React", iconKey: "reactjs" },
    ],
  },

  drawble: {
    title: "drawble",
    subtitle: "Chat & Drawing webapp",
    summary: "Doodle and chat in private rooms built on WebSockets",
    description:
      "Built on SERN stack, this project uses WebSockets to provide " +
      "chat rooms and canvases to connected users. Uses GoogleOAuth for " +
      "authorization and MySQL backend for room availability.",
    hyperlinks: [
      {
        id: "live-page",
        text: "drawble",
        href: "https://www.varun.pro/drawble/",
      },
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/vanadgir/drawble",
      },
    ],
    technologies: [
      { id: "mySQL", label: "MySQL", iconKey: "mysql" },
      { id: "express", label: "Express.js", iconKey: "express" },
      { id: "javascript", label: "JavaScript", iconKey: "javascript" },
      { id: "react", label: "React", iconKey: "reactjs" },
    ],
  },

  fill4: {
    title: "fill4",
    subtitle: "Voronoi Coloring",
    summary: "Coloring puzzle inspired by the four color theorem",
    description:
      "With D3 SVG used to create a game board out of a Voronoi diagram, " +
      "users attempt to color the cells following adjacency rules with the given set of colors. " +
      "Can lower and increase difficulty by changing number of starting cells and available colors. " +
      "Multiple color palettes are provided for various types of colorblindedness.",
    hyperlinks: [
      {
        id: "live-page",
        text: "fill4",
        href: "https://www.varun.pro/fill4/",
      },
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/vanadgir/fill4",
      },
    ],
    technologies: [
      { id: "react", label: "React", iconKey: "reactjs" },
      { id: "d3js", label: "d3js", iconKey: "d3js" },
    ],
  },

  ncvsDataMining: {
    title: "NCVS Data Mining",
    subtitle: "Study of the National Crime Victimization Survey",
    summary: "Identifying the factors that lead to bullying",
    description:
      "Using R and a wide variety of models, we try to build the best predictive model. " +
      "In our experiment, we found a binary classifier to be the strongest predictor.",
    previewDoc: "NCVSFinalReport.pdf",
    technologies: [{ id: "rstudio", label: "RStudio", iconKey: "rstudio" }],
  },

  glassdoorReview: {
    title: "Glassdoor Reviews NLP",
    subtitle: "Analysis of Glassdoor Review sentiments",
    summary:
      "Exploring how experiences and perceptions differ for roles and companies",
    description:
      "By analyzing Glassdoor reviews, I seek to uncover how experiences and perceptions " +
      "differ between various positions at the same company, as well as same job titles " +
      "in different companies. Using the KeyBERT model in Python, I extract keywords using " +
      "both Maxsum and MMR (Maximal Marginal Relevance) methods.",
    previewDoc: "GlassdoorReviews.pdf",
    hyperlinks: [
      {
        id: "colab-notebook",
        text: "Colab Notebook",
        href: "https://colab.research.google.com/drive/1zhIZ7Ub-UvwE2Pqp_Iis-qOYcutKd7L-?usp=sharing",
      },
    ],
    technologies: [
      { id: "colab", label: "Google Colab", iconKey: "googlecolab" },
      { id: "python", label: "python", iconKey: "python" },
    ],
  },

  steamRatings: {
    title: "Steam Game Ratings",
    subtitle: "Study of Steam Marketplace ratings",
    summary: "Comparing the popularity of single- and multi-player games",
    description:
      "Using R, I perform a hypothesis test on the difference in proportion of highly rated " +
      "single-player games and highly-rated multi-player games on Steam. A rather quick analysis, " +
      "I was able to determine there is a significant difference in popularity, " +
      "with single-player games being much more highly rated.",
    previewDoc: "SteamGameRatings.pdf",
    technologies: [{ id: "rstudio", label: "RStudio", iconKey: "rstudio" }],
  },

  dndler: {
    title: "DNDLER",
    subtitle: "TTRPG Character Randomizer",
    summary: "Create randomized player characters for Dungeons & Dragons",
    description:
      "Created and launched with a small team of 3 developers, the dndler is " +
      "a TTRPG assistant that creates a full D&D 5e compatible character using " +
      "the free SRD content. Can upload and download generated characters in JSON format.",
    hyperlinks: [
      {
        id: "live-page",
        text: "dndler",
        href: "https://dndler.app/",
      },
      {
        id: "github-repo",
        text: "GitHub Repo",
        href: "https://github.com/vanadgir/dndler",
      },
    ],
    technologies: [
      { id: "express", label: "Express.js", iconKey: "express" },
      { id: "javascript", label: "JavaScript", iconKey: "javascript" },
      { id: "react", label: "React", iconKey: "reactjs" },
    ],
  },

  mitADSPCapstone: {
    title: "Music Recommendation System",
    subtitle: "Collaborative Filtering, Matrix Factorization",
    summary: "Create music recommendation system using Million Songs Dataset",
    description:
      "Capstone project for MIT Applied Data Science Program. Created a " +
      "recommendation system that used ensemble methods to find related " +
      "songs and artists for potential users.",
    hyperlinks: [
      {
        id: "capstone",
        text: "Capstone Report",
        href: "https://www.varun.pro/MITADSP/",
      },
    ],
    technologies: [
      { id: "jupyter", label: "Jupyter Notebook", iconKey: "jupyter" },
      { id: "python", label: "python", iconKey: "python" },
    ],
  },

  msdCapstone: {
    title: "Million Songs Analysis",
    subtitle: "Clustering, Word Frequency",
    summary: "Deep dive into the Million Songs Dataset",
    description:
      "Capstone project for Springboard. Created a classification model " +
      "that could find similarities of artists using common words found in " +
      "songs titles, album names, and genres.",
    hyperlinks: [
      {
        id: "capstone",
        text: "Capstone Report",
        href: "https://www.varun.pro/MSDMusicAnalysis/",
      },
    ],
    technologies: [
      { id: "jupyter", label: "Jupyter Notebook", iconKey: "jupyter" },
      { id: "python", label: "python", iconKey: "python" },
    ],
  },

  leagueCapstone: {
    title: "League of Legends eSports Analysis",
    subtitle: "Player Performance, Game Result Prediction",
    summary: "Identifying trends in competitive League of Legends",
    description:
      "Capstone project for Springboard. Created a prediction model " +
      "that would attempt to find favourable matchups for players and teams. ",
    hyperlinks: [
      {
        id: "capstone",
        text: "Capstone Report",
        href: "https://www.varun.pro/LoLEsportsAnalysis/",
      },
    ],
    technologies: [
      { id: "jupyter", label: "Jupyter Notebook", iconKey: "jupyter" },
      { id: "python", label: "python", iconKey: "python" },
    ],
  },

  collegeScorecard: {
    title: "College Scorecard",
    subtitle: "Data Wrangling, Clustering",
    summary: "Deep dive into US colleges and universities",
    description:
      "The College Scorecard is a service meant to help prospective students make their college decision. " +
      "Whether by comparing size, popular majors, or comparing costs to the national average, the site's " +
      "goal is to help the user find a good fit. Using this dataset, I try and find additional ways to " +
      "help students in their decision.",
    hyperlinks: [
      {
        id: "data-story",
        text: "Data Story",
        href: "https://www.varun.pro/Springboard-Intro-to-Data-Science/DataStory/collegescorecard.html",
      },
      {
        id: "capstone",
        text: "Capstone Report",
        href: "https://www.varun.pro/Springboard-Intro-to-Data-Science/Capstone/finalreport.html",
      },
      {
        id: "youtube-link",
        text: "Presentation Recording",
        href: "https://www.youtube.com/watch?v=5ZlSw4PxmMQ",
      },
    ],
    technologies: [{ id: "rstudio", label: "RStudio", iconKey: "rstudio" }],
  },
};

export const projectsById = Object.fromEntries(
  Object.entries(projectConfig).map(([projectId, project]) => {
    let imageUrl = null;

    if (project.imageKey) {
      if (Array.isArray(project.imageKey)) {
        // Map each key to a URL, drop any missing ones
        imageUrl = project.imageKey
          .map((key) => imageUrlMap[key])
          .filter(Boolean);
      } else {
        imageUrl = imageUrlMap[project.imageKey] ?? null;
      }
    }

    return [
      projectId,
      {
        ...project,
        imageUrl,
        technologies: (project.technologies ?? []).map((tech) => ({
          ...tech,
          iconUrl: iconUrlMap[tech.iconKey] ?? null,
        })),
        previewDocUrl: project.previewDoc
          ? docUrlMap[project.previewDoc] ?? null
          : null,
      },
    ];
  })
);

export const projectList = Object.entries(projectsById).map(
  ([id, project]) => ({
    id,
    ...project,
  })
);

document.addEventListener("DOMContentLoaded", () => {
  let seed = 69420; // initial seed
  let noise = new SimplexNoise(seed); // create noise with initial seed

  // setup scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-10, 10, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const titleElement = document.querySelector("#title");
  if (titleElement) {
    titleElement.insertAdjacentElement("afterend", renderer.domElement);
  } else {
    console.error("Title element not found!");
  }

  // orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // hex grid group
  const hexGrid = new THREE.Group();
  scene.add(hexGrid);

  // load the BeveledHex model
  const loader = new THREE.GLTFLoader();
  let hexModel = null;

  loader.load(
    "./BeveledHex.glb",
    (gltf) => {
      hexModel = gltf.scene;
      updateHexGrid(rows, cols);
    },
    undefined,
    (error) => {
      console.error("Error loading the model:", error);
    }
  );

  let noiseMultiplier = 0.1;

  // Perlin noise function to get a smooth, random value
  function getNoise(x, z) {
    return noise.noise2D(x * noiseMultiplier, z * noiseMultiplier);
  }

  // color mapping
  function getColorBasedOnNoise(noiseValue) {
    let colorIndex = Math.floor(((noiseValue + 1) / 2) * 4); // map to 0 - 4
    const colors = [
      0x0000ff, // blue
      0x8b4513, // dark brown
      0x009800, // dark green
      0xffffff, // white
    ];
    return colors[colorIndex];
  }

  // grid logic
  function updateHexGrid(rows, cols) {
    if (!hexModel) return; // make sure hex model exists before any updates

    hexGrid.clear(); // clear existing hexagons

    const hexWidth = Math.sqrt(3); // horizontal spacing
    const hexHeight = 2; // vertical spacing
    const verticalSpacing = hexHeight * 0.75; // reduce vertical overlap

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOffset = col * hexWidth;
        const yOffset = row * verticalSpacing;

        const xPosition = row % 2 === 0 ? xOffset : xOffset + hexWidth / 2;
        const yPosition = 0;
        const zPosition = -yOffset;

        const hex = hexModel.clone();
        hex.position.set(xPosition, yPosition, zPosition);

        // calculate noise based on grid position
        const noiseValue = getNoise(xPosition, zPosition);

        // apply color based on noise
        hex.traverse((child) => {
          if (child.isMesh) {
            const color = getColorBasedOnNoise(noiseValue);
            child.material = new THREE.MeshStandardMaterial({ color });
          }
        });

        hexGrid.add(hex);
      }
    }
  }

  // default grid size
  let rows = 5;
  let cols = 5;

  // adaptive canvas size
  window.addEventListener("resize", () => {
    const containerWidth = titleElement.parentElement.offsetWidth;
    const containerHeight = window.innerHeight;
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth, containerHeight);
  });

  // render loop
  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // UI elements and listeners
  const rowSlider = document.getElementById("row-slider");
  const colSlider = document.getElementById("col-slider");
  const noiseSlider = document.getElementById("noise-slider");
  const newSeedButton = document.getElementById("new-seed-btn");

  rowSlider.value = rows;
  colSlider.value = cols;
  noiseSlider.value = noiseMultiplier;

  rowSlider.addEventListener("input", (e) => {
    rows = parseInt(e.target.value, 10);
    updateHexGrid(rows, cols);
  });

  colSlider.addEventListener("input", (e) => {
    cols = parseInt(e.target.value, 10);
    updateHexGrid(rows, cols);
  });

  noiseSlider.addEventListener("input", (e) => {
    noiseMultiplier = e.target.value;
    updateHexGrid(rows, cols);
  });

  newSeedButton.addEventListener("click", () => {
    seed = Math.floor(Math.random() * 10000);
    noise = new SimplexNoise(seed);
    updateHexGrid(rows, cols);
  });

  // adaptive canvas size
  window.addEventListener("resize", () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);
  });

  // load first grid
  if (hexModel) {
    updateHexGrid(rows, cols);
  }
});

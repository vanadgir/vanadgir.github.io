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
      updateHexGrid(params.height, params.width);
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
    const numColors = params.colors.length;
    const binWidth = 2 / numColors; // divide noise range (-1 to 1) into bins
    const index = Math.min(
      numColors - 1,
      Math.floor((noiseValue + 1) / binWidth) // map noiseValue to bin index
    );
    return new THREE.Color(params.colors[index]);
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

  // export the hex grid to GLTF
  function exportHexGrid() {
    const exporter = new THREE.GLTFExporter();

    exporter.parse(
      hexGrid, // the group or object to export
      function (result) {
        // convert result to binary GLTF (.glb)
        const blob = new Blob([result], { type: "application/octet-stream" });

        // create a link to download the exported file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `HexGrid_Export_${seed}.glb`; // file name
        link.click();
      },
      { binary: true }
    );
  }

  // default grid size and GUI parameters
  const params = {
    height: 5,
    width: 5,
    noiseMultiplier: 0.1,
    colors: ["#0000ff", "#8b4513", "#009800", "#ffffff"], // blue > brown > green > white
    newSeed: () => {
      seed = Math.floor(Math.random() * 10000);
      noise = new SimplexNoise(seed);
      updateHexGrid(params.height, params.width);
    },
  };

  // dat.GUI setup
  const gui = new dat.GUI({ autoplace: true });
  // height
  gui
    .add(params, "height", 1, 100, 1)
    .name("Rows")
    .onChange(() => updateHexGrid(params.height, params.width));
  // width
  gui
    .add(params, "width", 1, 100, 1)
    .name("Columns")
    .onChange(() => updateHexGrid(params.height, params.width));
  // noise mult
  gui
    .add(params, "noiseMultiplier", 0.02, 0.2, 0.001)
    .name("Noise Mult")
    .onChange(() => {
      noiseMultiplier = params.noiseMultiplier;
      updateHexGrid(params.height, params.width);
    });
  // new seed
  gui.add(params, "newSeed").name("Generate New Seed");
  // export grid glb
  gui
    .add({ exportHexGrid: exportHexGrid }, "exportHexGrid")
    .name("Export Hex Grid (.glb)");

  // colors section
  const colorFolder = gui.addFolder("Colors");

  function clearFolder(folder) {
    const controllers = [...folder.__controllers];
    controllers.forEach((controller) => folder.remove(controller));
  }

  // generate a random RGB color and convert it to hex
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)
      .padStart(6, "0")}`;
  }

  //  add a new random color that doesn't already exist
  function addRandomColor() {
    let newColor;
    do {
      newColor = getRandomColor();
    } while (params.colors.includes(newColor));

    params.colors.push(newColor);
    updateColorControls();
    updateHexGrid(params.height, params.width);
  }

  // modify the updateColorControls function to use addRandomColor
  function updateColorControls() {
    clearFolder(colorFolder); // remove all existing controllers

    // add color controllers
    params.colors.forEach((color, index) => {
      colorFolder
        .addColor(params.colors, index.toString())
        .name(`Color ${index + 1}`)
        .onChange(() => updateHexGrid(params.height, params.width));
    });

    // button to add a random color
    colorFolder
      .add(
        {
          addColor: addRandomColor, // use the function to add random color
        },
        "addColor"
      )
      .name("New Color");

    // button to remove the last color
    colorFolder
      .add(
        {
          removeColor: () => {
            if (params.colors.length > 1) {
              params.colors.pop();
              updateColorControls();
              updateHexGrid(params.height, params.width);
            }
          },
        },
        "removeColor"
      )
      .name("Remove Color");

    colorFolder.open(); // keep folder open
  }

  // initialize color controls
  updateColorControls();

  // top drag bar div
  const dragBar = document.createElement("div");
  dragBar.style.height = "30px";
  dragBar.style.backgroundColor = "#777";
  dragBar.style.cursor = "move";

  // insert at top of gui
  gui.domElement.insertBefore(dragBar, gui.domElement.firstChild);
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "15vh";
  gui.domElement.style.left = "10px";
  document.body.appendChild(gui.domElement);

  // mouse and touch handling
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function startDrag(e) {
    isDragging = true;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    offsetX = clientX - gui.domElement.offsetLeft;
    offsetY = clientY - gui.domElement.offsetTop;

    document.body.style.userSelect = "none";
  }

  function dragMove(e) {
    if (!isDragging) return;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    gui.domElement.style.left = `${clientX - offsetX}px`;
    gui.domElement.style.top = `${clientY - offsetY}px`;
  }

  function endDrag() {
    isDragging = false;
    document.body.style.userSelect = ""; 
  }

  // mouse events
  dragBar.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", endDrag);

  // touch events
  dragBar.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", dragMove);
  document.addEventListener("touchend", endDrag);

  // resize on refocus
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(viewportWidth, viewportHeight);
    }
  });

  window.addEventListener("resize", () => {
    // update the renderer and camera aspect ratio
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);

    // adjust dat.GUI size if necessary
    gui.domElement.style.height = `${viewportHeight}px`;
    gui.domElement.style.width = `${viewportWidth / 4}px`;
  });

  // render loop
  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
});

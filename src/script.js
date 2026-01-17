import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
// const tempVector = new THREE.Vector3(0, 0, 0);

scene.add(cubeMesh);
// cubeMesh.position.copy(tempVector);
const axisHelper = new THREE.AxesHelper(2);
cubeMesh.add(axisHelper);

// cubeMesh.rotation.y = 2;

const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 30);

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );
camera.position.z = 5;

cubeMesh.position.distanceTo(camera.position);
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const controls = new OrbitControls(camera, canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = 2;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspectRatio = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const clock = new THREE.Clock();
let previousTime = 0;

const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;

  console.log(delta);

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(2) * delta * 20;
  // cubeMesh.position.x += THREE.MathUtils.degToRad(1) * delta * 20;
  cubeMesh.scale.x = 2 + Math.sin(currentTime) * 0.5;
  // cubeMesh.position.y = 1 + Math.sin(currentTime) * 0.5;
  previousTime = currentTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

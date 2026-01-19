import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { materialAO } from "three/tsl";
import { PointLight } from "three/webgpu";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const Material = new THREE.MeshLambertMaterial();
// Material.color = new THREE.Color("blue");
// Material.transparent = true;
// Material.opacity = 0.5;
Material.side = 2;

// const fog = new THREE.Fog(0xffffff, 1, 10);
// scene.fog = fog;
// scene.background = new THREE.Color("white");

const cubeMesh = new THREE.Mesh(cubeGeometry, Material);

const Mesh2 = new THREE.Mesh(cubeGeometry, Material);
Mesh2.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, Material);
plane.position.x = -1.5;

// const geometry = new THREE.SphereGeometry(1, 16, 16);
// const tempVector = new THREE.Vector3(0, 0, 0);

//Create custom geometry using bufer geometry
// const verticies = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
// const bufferAttribute = new THREE.BufferAttribute(verticies, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", bufferAttribute);
// const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

scene.add(cubeMesh);
scene.add(Mesh2);
scene.add(plane);

// init Light
const light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// cubeMesh.position.copy(tempVector);
// const axisHelper = new THREE.AxesHelper(2);
// cubeMesh.add(axisHelper);

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

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(2) * delta * 20;
  // cubeMesh.position.x += THREE.MathUtils.degToRad(1) * delta * 20;
  // cubeMesh.scale.x = 2 + Math.sin(currentTime) * 0.5;
  // cubeMesh.position.y = 1 + Math.sin(currentTime) * 0.5;
  previousTime = currentTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

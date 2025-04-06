import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BoxGeometry, ConeGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, PointLight, Scene, TorusKnotGeometry } from "three/src/Three.Core.js";
import { WebGLRenderer } from "three/src/Three.js";

document.body.style.margin = '0';
document.body.style.backgroundColor = '#111'

const width = 360;
const height = 640;

const scene = new Scene();
const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
scene.add(camera);

const renderer = new WebGLRenderer();
renderer.setSize(width, height);

const canvas = renderer.domElement;

canvas.style.position = 'fixed';
canvas.style.inset = '0';
canvas.style.margin = 'auto';
canvas.style.maxWidth = '100%';
canvas.style.maxHeight = '100%';
canvas.style.overflow = 'auto';

document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);
controls.update();

const light = new PointLight(0x00ffff, 20);
camera.add(light);

const geometry = new TorusKnotGeometry(1, 0.4, 128, 16);
const material = new MeshPhongMaterial({ color: 0x00ff00, shininess: 1500 });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let then = 0;

function animate(now) {
    const delta = now - then;
    then = now;

    // cube.rotation.x += 0.002 * delta;
    // cube.rotation.y += 0.004 * delta;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
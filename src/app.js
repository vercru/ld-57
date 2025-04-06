import { BoxGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, Scene } from "three/src/Three.Core.js";
import { WebGLRenderer } from "three/src/Three.js";

document.body.style.margin = '0';
document.body.style.backgroundColor = '#111'

const width = 360;
const height = 640;

(async () =>
{
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);

    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.margin = 'auto';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.maxHeight = '100%';
    renderer.domElement.style.overflow = 'auto';

    document.body.appendChild(renderer.domElement);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
})();
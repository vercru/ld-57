import { Application, Assets, Geometry, Mesh, Shader, Sprite } from 'pixi.js';
import bunnyUrl from '../assets/bunny.png';
import vertex from '../assets/triangleColor.vert';
import fragment from '../assets/triangleColor.frag';
import source from '../assets/triangleColor.wgsl';

document.body.style.margin = '0';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ width: 360, height: 640, preference: 'webgpu' });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    const geometry = new Geometry({
        attributes: {
            aPosition: [-100, -50, 100, -50, 0, 100],
            aColor: [1, 0, 0, 0, 1, 0, 0, 0, 1],
        },
    });

    const gl = { vertex, fragment };

    const gpu = {
        vertex: {
            entryPoint: 'mainVert',
            source,
        },
        fragment: {
            entryPoint: 'mainFrag',
            source,
        },
    };

    const shader = Shader.from({
        gl,
        gpu,
    });

    const triangle = new Mesh({
        geometry,
        shader,
    });

    triangle.position.set(200, 300);

    app.stage.addChild(triangle);

    // Load the bunny texture
    const texture = await Assets.load(bunnyUrl);

    // Create a bunny Sprite
    const bunny = new Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((time) =>
    {
        triangle.rotation += 0.05 * time.deltaTime;

        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *
        bunny.rotation += 0.1 * time.deltaTime;
    });
})();
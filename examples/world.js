import { createSprite, World } from "./dist/index.js";

const canvas = document.getElementById("canvas");
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height });
const sprite = createSprite(world);

sprite.transform.translate = { x: width / 2, y: height / 2 };
sprite.transform.scale = { x: 50, y: 50 };
sprite.transform.rotation = Math.PI / 4;

sprite.region.position = { x: -0.5, y: -0.5 };
sprite.region.size = { width: 100, height: 100 };

console.log(world.getComponents(sprite.raw));

world.run();

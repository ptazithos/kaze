import { World, createSprite } from './dist/index.js';

const canvas = document.getElementById('canvas');
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height })
const sprite = createSprite(world)

sprite.transform.position = { x: 100, y: 100 };
sprite.transform.scale = { x: 50, y: 50 };
sprite.transform.rotation = Math.PI / 4;


world.run();
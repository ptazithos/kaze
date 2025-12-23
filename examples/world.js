import { World } from './dist/index.js';

const canvas = document.getElementById('canvas');
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height})
world.run();
import { World } from './dist/index.js';

const canvas = document.getElementById('canvas');

const world = new World(canvas);
world.run();
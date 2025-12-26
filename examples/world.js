import { createSprite, World } from "./dist/index.js";

const canvas = document.getElementById("canvas");
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height });

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width / 2, y: height / 2 };
	sprite.region.size = { width: 500, height: 500 };
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width * 0.2, y: height * 0.2 };
	sprite.region.size = { width: 500, height: 500 };
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: Math.random() * 1000, y: Math.random() * 1000 };
	sprite.region.size = { width: 500, height: 500 };
}

window.addEventListener("resize", () => {
	const pixelRatio = window.devicePixelRatio;
	const width = canvas.clientWidth * pixelRatio;
	const height = canvas.clientHeight * pixelRatio;
	world.renderer.setDimension(width, height);
});

world.run();

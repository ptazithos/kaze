import { createSprite, World } from "./dist/index.js";

const canvas = document.getElementById("canvas");
const pixelRatio = window.devicePixelRatio;
console.log("pixelRatio", pixelRatio);
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height });

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width / 2, y: height / 2 };
	sprite.region.size = { width: 200, height: 200 };
	sprite.transform.rotation = Math.PI / 4;
	sprite.transform.scale = { x: 2, y: 0.5 };
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width / 2, y: height / 2 };
	sprite.region.size = { width: 200, height: 200 };
	sprite.transform.rotation = Math.PI / 4;
	sprite.transform.scale = { x: 0.5, y: 2 };
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width * 0.2, y: height * 0.2 };
	sprite.region.size = { width: 300, height: 300 };
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: Math.random() * 1000, y: Math.random() * 1000 };
	sprite.region.size = { width: 100, height: 100 };

	sprite.transform.rotation = Math.PI / 4;
}

window.addEventListener("resize", () => {
	const pixelRatio = window.devicePixelRatio;
	const width = canvas.clientWidth * pixelRatio;
	const height = canvas.clientHeight * pixelRatio;
	world.renderer.setDimension(width, height);
});

world.run();

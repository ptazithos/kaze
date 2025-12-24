import { createSprite, World } from "./dist/index.js";

const canvas = document.getElementById("canvas");
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height });

{
	const sprite = createSprite(world);

	sprite.transform.translate = { x: width / 2, y: height / 2 };
	sprite.transform.scale = { x: 50, y: 50 };
	sprite.transform.rotation = Math.PI / 4;

	sprite.region.position = { x: -0.5, y: -0.5 };
	sprite.region.size = { width: 0.3, height: 0.3 };
}

{
	const sprite = createSprite(world);

	sprite.transform.translate = { x: width / 2, y: height / 2 };
	sprite.transform.scale = { x: 50, y: 50 };
	sprite.transform.rotation = Math.PI / 4;

	sprite.region.position = { x: -0.1, y: -0.2 };
	sprite.region.size = { width: 0.3, height: 0.4 };
}

const random = () => {
	return (Math.random() - 0.5) * 2;
};

{
	const sprite = createSprite(world);
	sprite.transform.translate = { x: width / 2 + 100, y: height / 2 + 100 };
	sprite.transform.scale = { x: 80, y: 80 };
	sprite.transform.rotation = Math.PI / 6;

	sprite.region.position = { x: random(), y: random() };
	sprite.region.size = { width: 0.2, height: 0.2 };
}

// for (let i = 0; i < 1000; i++) {
// 	const sprite = createSprite(world);
// 	sprite.region.position = { x: random(), y: random() };
// 	sprite.region.size = { width: Math.random(), height: Math.random() };
// }

world.run();

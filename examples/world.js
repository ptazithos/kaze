import { createSprite, World } from "./dist/index.js";

const canvas = document.getElementById("canvas");
const pixelRatio = window.devicePixelRatio;
console.log("pixelRatio", pixelRatio);
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;

const world = new World({ canvas, width, height });

const getTexture = async () => {
	const res = await fetch("http://localhost:3000/Lenna.png");
	const blob = await res.blob();
	return createImageBitmap(blob);
};
const texture = await getTexture();

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width * 0.2, y: height / 2 };
	sprite.region.size = { width: 200, height: 200 };

	sprite.transform.rotation = Math.PI / 4;

	sprite.texture.image = texture;
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width / 2, y: height / 2 };
	sprite.region.size = { width: 200, height: 200 };

	sprite.transform.rotation = Math.PI / 4;

	sprite.texture.image = texture;
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width * 0.8, y: height / 2 };
	sprite.region.size = { width: 200, height: 200 };

	sprite.transform.rotation = Math.PI / 4;

	sprite.texture.image = texture;
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: width * 0.2, y: height * 0.2 };
	sprite.region.size = { width: 300, height: 300 };

	sprite.texture.image = texture;
}

{
	const sprite = createSprite(world);

	sprite.region.position = { x: Math.random() * 1000, y: Math.random() * 1000 };
	sprite.region.size = { width: 100, height: 100 };

	sprite.transform.rotation = Math.PI / 4;

	sprite.texture.image = texture;
}

window.addEventListener("resize", () => {
	const pixelRatio = window.devicePixelRatio;
	const width = canvas.clientWidth * pixelRatio;
	const height = canvas.clientHeight * pixelRatio;
	world.renderer.setDimension(width, height);
});

world.run();

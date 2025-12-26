import { type Component, Region, type Texture, Transform } from "@/component";
import type { Renderer } from "@/renderer";
import type { Optional } from "@/types";

export const render = (
	entities: Array<Map<string, Component>>,
	renderer: Renderer,
) => {
	const renderables = entities.filter(
		(entity) =>
			entity.has("region") &&
			entity.has("texture") &&
			(entity.get("texture") as Optional<Texture>)?.image !== null,
	);
	const entitySize = Region.bufferSize + Transform.bufferSize;
	const vertexData = new Float32Array(renderables.length * entitySize);

	const textures = [];

	for (let i = 0; i < renderables.length; i++) {
		textures.push(
			(renderables[i].get("texture") as Texture).image as ImageBitmap,
		);

		const entity = renderables[i];
		const region = entity.get("region") as Region;

		vertexData[i * entitySize + 0] = region.position.x;
		vertexData[i * entitySize + 1] = region.position.y;
		vertexData[i * entitySize + 2] = region.size.width;
		vertexData[i * entitySize + 3] = region.size.height;
		vertexData[i * entitySize + 4] = region.anchor.x;
		vertexData[i * entitySize + 5] = region.anchor.y;

		const transform =
			(entity.get("transform") as Optional<Transform>) ?? new Transform();
		vertexData[i * entitySize + 6] = transform.translate.x;
		vertexData[i * entitySize + 7] = transform.translate.y;
		vertexData[i * entitySize + 8] = transform.scale.x;
		vertexData[i * entitySize + 9] = transform.scale.y;
		vertexData[i * entitySize + 10] = transform.rotation;
		vertexData[i * entitySize + 11] = 0; // padding for alignment
	}

	renderer.render(vertexData.buffer, renderables.length, textures);
};

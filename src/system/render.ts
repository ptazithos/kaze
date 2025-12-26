import { type Component, Region } from "@/component";
import type { Renderer } from "@/renderer";

export const render = (
	entities: Array<Map<string, Component>>,
	renderer: Renderer,
) => {
	const renderables = entities.filter((entity) => entity.has("region"));
	const vertexData = new Float32Array(renderables.length * Region.bufferSize);

	for (let i = 0; i < renderables.length; i++) {
		const entity = renderables[i];
		const region = entity.get("region") as Region;

		vertexData[i * Region.bufferSize + 0] = region.position.x;
		vertexData[i * Region.bufferSize + 1] = region.position.y;
		vertexData[i * Region.bufferSize + 2] = region.size.width;
		vertexData[i * Region.bufferSize + 3] = region.size.height;
		vertexData[i * Region.bufferSize + 4] = region.anchor.x;
		vertexData[i * Region.bufferSize + 5] = region.anchor.y;
		
	}

	renderer.render(vertexData.buffer, renderables.length);
};

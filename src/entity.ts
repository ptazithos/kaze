import { Region, Texture, Transform } from "./component";
import type { World } from "./world";

export class Entity {
	_id: string;

	constructor() {
		this._id = crypto.randomUUID();
	}

	get id() {
		return this._id;
	}
}

export const createSprite = (world: World) => {
	const entity = world.createEntity();
	world.addComponent(entity, Transform);
	world.addComponent(entity, Region);
	world.addComponent(entity, Texture);

	return {
		raw: entity,
		get transform() {
			return world.getComponent<Transform>(entity, Transform);
		},
		get region() {
			return world.getComponent<Region>(entity, Region);
		},
		get texture() {
			return world.getComponent<Texture>(entity, Texture);
		},
	};
};

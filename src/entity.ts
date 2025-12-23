import { Transform } from "./component";
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

export const  createSprite = (world: World) => {
	const entity = world.createEntity();
	world.addComponent(entity, new Transform());

	return {
		raw: entity,
		get transform() {
			return world.getComponent<Transform>(entity, Transform);
		}
	};
}
	
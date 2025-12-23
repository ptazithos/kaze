import { Entity } from "./entity.js";
import { Transform } from "../component/index.js";

export class Sprite extends Entity {
	constructor() {
		super();
		const transform = new Transform();
		this._componenets.push(transform);
		this._namedComponents.set("transform", transform);
	}

	get transform(): Transform {
		return this._namedComponents.get("transform");
	}
}

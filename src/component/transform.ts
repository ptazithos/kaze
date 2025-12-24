import type { Rotation, Scale, Translate } from "@types";
import { Component } from "./component";

export class Transform extends Component {
	static name = "Transform";

	translate: Translate;
	rotation: Rotation;
	scale: Scale;

	constructor(translate?: Translate, scale?: Scale, rotation?: Rotation) {
		super();

		this.translate = translate || { x: 0, y: 0 };
		this.scale = scale || { x: 1, y: 1 };
		this.rotation = rotation || { angle: 0 };
	}
}

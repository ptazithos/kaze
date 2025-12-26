import type { Scale, Translate } from "@types";
import { Component } from "./component";

export class Transform extends Component {
	static name = "transform";
	static bufferSize = 6;

	translate: Translate;
	rotation: number;
	scale: Scale;

	constructor(translate?: Translate, scale?: Scale, rotation?: number) {
		super();

		this.translate = translate || { x: 0, y: 0 };
		this.scale = scale || { x: 1, y: 1 };
		this.rotation = rotation ?? 0;
	}
}

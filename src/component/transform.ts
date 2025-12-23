import type { Position, Rotation, Size } from "@types";
import {Component} from "./component";

export class Transform extends Component {
	static name = "Transform";

	position: Position;
	size: Size;
	rotation: Rotation;

	constructor(position?: Position, size?: Size, rotation?: Rotation) {
		super();

		this.position = { x: 0, y: 0, ...position };
		this.size = { width: 0, height: 0, ...size };
		this.rotation = { angle: 0, ...rotation };
	}
}

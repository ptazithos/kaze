import type { Position, Size } from "@types";
import { Component } from "./component";

export class Region extends Component {
	static name = "region";
	static bufferSize = 4;

	position: Position;
	size: Size;

	constructor(position?: Position, size?: Size) {
		super();

		this.position = position ?? { x: 0, y: 0 };
		this.size = size ?? { width: 1, height: 1 };
	}
}

import type { Position, Size } from "@types";
import { Component } from "./component";

export class Region extends Component {
	static name = "region";
	static bufferSize = 6;

	position: Position;
	size: Size;
	anchor: Position;

	constructor(position?: Position, size?: Size, anchor?: Position) {
		super();

		this.position = position ?? { x: 0, y: 0 };
		this.size = size ?? { width: 1, height: 1 };
		this.anchor = anchor ?? { x: 0.5, y: 0.5 };
	}
}

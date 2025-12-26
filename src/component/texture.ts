import type { Optional } from "@/types";
import { Component } from "./component";

export class Texture extends Component {
	static name = "texture";

	image: Optional<ImageBitmap>;

	constructor(image?: ImageBitmap) {
		super();

		this.image = image ?? null;
	}
}

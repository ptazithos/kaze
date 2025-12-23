import { Entity } from "./entity";
import { type CanvasInitOptions,  Renderer } from "./renderer";
import { render, transform } from "./system";

export class World {
	_renderer: Renderer;
	_entities: Array<Entity> = []

	constructor(option: CanvasInitOptions) {
		this._renderer = new Renderer(option);
		this._entities = [];
	}

	async run() {
		await this._renderer.init();

		requestAnimationFrame(() => this.update());
	}

	update() {
		transform(this._entities);
		render(this._entities, this._renderer);

		requestAnimationFrame(() => this.update());
	}
}

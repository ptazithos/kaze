import { type CanvasInitOptions, Render } from "./render";

export class World {
	_render: Render;
	constructor(option: CanvasInitOptions) {
		this._render = new Render(option);
	}

	async run() {
		await this._render.init();

		requestAnimationFrame(() => this.update());
	}

	update() {
		this._render.render();
		requestAnimationFrame(() => this.update());
	}
}

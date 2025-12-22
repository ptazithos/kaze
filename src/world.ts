import { Render } from "./render";

export class World {
	_render: Render;
	constructor(canvas: HTMLCanvasElement) {
		this._render = new Render(canvas);
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

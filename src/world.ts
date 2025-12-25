import type { Component } from "./component";
import { Entity } from "./entity";
import { type CanvasInitOptions, Renderer } from "./renderer";
import { render, transform } from "./system";

export class World {
	_renderer: Renderer;
	_entities: Map<string, Map<string, Component>>;

	constructor(option: CanvasInitOptions) {
		this._renderer = new Renderer(option);
		this._entities = new Map();
	}

	async run() {
		await this._renderer.init();

		requestAnimationFrame(() => this.update());
	}

	update() {
		const entities = Array.from(this._entities.values());

		transform(entities);
		render(entities, this._renderer);

		requestAnimationFrame(() => this.update());
	}

	createEntity() {
		const entity = new Entity();
		this._entities.set(entity.id, new Map<string, Component>());
		return entity;
	}

	addComponent<T extends Component>(
		entities: Entity,
		componentClass: new () => T,
	) {
		const entityComponents = this._entities.get(entities.id);
		if (entityComponents) {
			entityComponents.set(componentClass.name, new componentClass());
		} else {
			throw new Error(`Entity with id ${entities.id} does not exist.`);
		}
	}

	getComponent<T extends Component>(
		entity: Entity,
		componentClass: new () => T,
	): T | undefined {
		const entityComponents = this._entities.get(entity.id);
		if (entityComponents) {
			return entityComponents.get(componentClass.name) as T | undefined;
		}
		return undefined;
	}

	getComponents(entity: Entity): Map<string, Component> | undefined {
		return this._entities.get(entity.id);
	}


	get renderer(){
		return this._renderer;
	}
}

export class Entity {
	_componenets: any[];
	_namedComponents: Map<string, any>;

	constructor() {
		this._componenets = [];
		this._namedComponents = new Map<string, any>();
	}
}

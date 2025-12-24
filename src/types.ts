export type Optional<T> = T | null;

export type CoordinateLike = {
	x: number;
	y: number;
};

export type Position = CoordinateLike;

export type Scale = CoordinateLike;

export type Translate = CoordinateLike;

export type Size = {
	width: number;
	height: number;
};

export type Rotation = {
	angle: number;
};

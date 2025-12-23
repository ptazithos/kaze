import type { Optional } from "../types";

import frag from "./frag.wgsl";
import vert from "./vert.wgsl";

export type CanvasInitOptions = {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
};

export class Render {
	_canvas: HTMLCanvasElement;
	_dimension: { width: number; height: number };

	_adapter: Optional<GPUAdapter>;
	_device: Optional<GPUDevice>;
	_context: Optional<GPUCanvasContext>;
	_pipeline: Optional<GPURenderPipeline>;

	_inited: boolean;

	constructor(option: CanvasInitOptions) {
		this._canvas = option.canvas;
		this._dimension = { width: option.width, height: option.height };
		this._canvas.width = option.width;
		this._canvas.height = option.height;

		this._adapter = null;
		this._device = null;
		this._context = null;
		this._pipeline = null;

		this._inited = false;
	}

	setDimension(width: number, height: number) {
		this._dimension = { width, height };
		this._canvas.width = width;
		this._canvas.height = height;
	}

	async init() {
		this._adapter = await navigator.gpu.requestAdapter();
		this._device = (await this._adapter?.requestDevice()) ?? null;

		if (!this._device)
			throw new Error("WebGPU is not supported on this browser.");

		this._context = this._canvas.getContext("webgpu") as GPUCanvasContext;
		this._context.configure({
			device: this._device,
			format: navigator.gpu.getPreferredCanvasFormat(),
		});

		this._pipeline = this._device.createRenderPipeline({
			layout: "auto",
			vertex: {
				module: this._device.createShaderModule({
					code: vert,
				}),
				entryPoint: "main",
			},
			fragment: {
				module: this._device.createShaderModule({
					code: frag,
				}),
				entryPoint: "main",
				targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
			},
			primitive: {
				topology: "triangle-list",
			},
		});

		this._inited = true;
	}

	async render() {
		const commandEncoder = this._device?.createCommandEncoder();
		const textureView = this._context?.getCurrentTexture().createView();

		if (!commandEncoder || !textureView || !this._pipeline || !this._device)
			throw new Error("Render not initialized properly.");

		const renderPassDescriptor: GPURenderPassDescriptor = {
			colorAttachments: [
				{
					view: textureView,
					clearValue: [0, 0, 0, 0], // Clear to transparent
					loadOp: "clear" as GPULoadOp,
					storeOp: "store" as GPUStoreOp,
				},
			],
		};

		const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
		passEncoder.setPipeline(this._pipeline);
		passEncoder.draw(3);
		passEncoder.end();

		this._device.queue.submit([commandEncoder.finish()]);
	}
}

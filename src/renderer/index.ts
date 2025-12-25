import type { Optional } from "../types";

import frag from "./frag.wgsl";
import vert from "./vert.wgsl";

export type CanvasInitOptions = {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
};

export class Renderer {
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

	render(storageData: ArrayBuffer, objCount: number) {
		const commandEncoder = this._device?.createCommandEncoder();
		const textureView = this._context?.getCurrentTexture().createView();

		if (!commandEncoder || !textureView || !this._pipeline || !this._device)
			throw new Error("Render not initialized properly.");

		const storageBuffer = this._device.createBuffer({
			label: "sprite size & position buffer",
			size: storageData.byteLength,
			usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
		});

		this._device.queue.writeBuffer(storageBuffer, 0, storageData);

		const uniformBuffer = this._device.createBuffer({
			label: "resolution unimfor",
			size: 4 + 4,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		this._device.queue.writeBuffer(
			uniformBuffer,
			0,
			new Float32Array([this._canvas.width, this._canvas.height]),
		);

		const bindGroup = this._device.createBindGroup({
			label: `bind group for sprite`,
			layout: this._pipeline.getBindGroupLayout(0),
			entries: [
				{ binding: 0, resource: { buffer: storageBuffer } },
				{ binding: 1, resource: { buffer: uniformBuffer } },
			],
		});

		const renderPassDescriptor: GPURenderPassDescriptor = {
			colorAttachments: [
				{
					view: textureView,
					clearValue: [0, 0, 0, 0],
					loadOp: "clear" as GPULoadOp,
					storeOp: "store" as GPUStoreOp,
				},
			],
		};

		const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
		passEncoder.setPipeline(this._pipeline);
		passEncoder.setBindGroup(0, bindGroup);
		passEncoder.draw(6, objCount);
		passEncoder.end();

		this._device.queue.submit([commandEncoder.finish()]);
	}
}

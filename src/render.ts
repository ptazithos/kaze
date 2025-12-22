import type { Optional } from './types';

export class Render {
  _canvas: HTMLCanvasElement;
  _adapter: Optional<GPUAdapter>;
  _device: Optional<GPUDevice>;
  _context: Optional<GPUCanvasContext>;

  _inited: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._adapter = null;
    this._device = null;
    this._context = null;

    this._inited = false;
  }

  async init() {
    this._adapter = await navigator.gpu.requestAdapter();
    this._device = (await this._adapter?.requestDevice()) ?? null;

    if (!this._device)
      throw new Error('WebGPU is not supported on this browser.');

    const context = this._canvas.getContext('webgpu') as GPUCanvasContext;
    context.configure({
      device: this._device,
      format: navigator.gpu.getPreferredCanvasFormat(),
    });

    this._inited = true;
  }

  async render() {
    console.log('Rendering...');
  }
}

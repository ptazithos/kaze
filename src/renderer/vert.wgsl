struct Sprite {
  position: vec2f,
  size: vec2f,
  anchor: vec2f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@group(0) @binding(0) var<storage, read> sprites: array<Sprite>;
@group(0) @binding(1) var<uniform> resolution: vec2f;


fn toClippedSpace(pos: vec2f) -> vec2f {
    let scale = 2.0 / resolution;
    return vec2f(pos.x * scale.x - 1.0, 1.0 - pos.y * scale.y);
}

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
    let sprite = sprites[instanceIndex];
    let position = sprite.position;
    let size = sprite.size;
    let anchor = sprite.anchor;

    var pos: vec2f;
    switch (vertex_index % 6u) {
        case 0u: {
          let bias = size * anchor;
          let worldPos = position - bias;
          pos = toClippedSpace(worldPos);
        }
        case 1u, 3u: {
          let bias = size * vec2f(anchor.x - 1.0, anchor.y);
          let worldPos = position - bias;
          pos = toClippedSpace(worldPos);
        }
        case 2u, 5u: {
          let bias = size * vec2f(anchor.x, anchor.y - 1.0);
          let worldPos = position - bias;
          pos = toClippedSpace(worldPos);
        }
        case 4u: {
          let bias = size * vec2f(anchor.x - 1.0, anchor.y - 1.0);
          let worldPos = position - bias;
          pos = toClippedSpace(worldPos);
        }
        default: {
          pos = vec2f(0.0, 0.0);
        }
    }

    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.color = vec4f(abs(sprite.position / resolution), 1.0, 1.0);
    return output;
}

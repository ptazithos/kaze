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

    var localPos: vec2f;
    switch (vertex_index % 6u) {
        case 0u: {
          localPos = size * anchor;
        }
        case 1u, 3u: {
          localPos = size * vec2f(anchor.x - 1.0, anchor.y);
        }
        case 2u, 5u: {
          localPos = size * vec2f(anchor.x, anchor.y - 1.0);
        }
        case 4u: {
          localPos = size * vec2f(anchor.x - 1.0, anchor.y - 1.0);
        }
        default: {
          localPos = vec2f(0.0, 0.0);
        }
    }

    let worldPos = position + localPos;
    let pos = toClippedSpace(worldPos);

    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.color = vec4f(abs(sprite.position / resolution), 1.0, 1.0);
    return output;
}

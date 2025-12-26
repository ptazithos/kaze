struct Sprite {
  position: vec2f,
  size: vec2f,
  anchor: vec2f,

  translate: vec2f,
  scale: vec2f,
  rotation: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@group(0) @binding(0) var<storage, read> sprites: array<Sprite>;
@group(0) @binding(1) var<uniform> resolution: vec2f;

fn transalte(pos: vec2f, offset: vec2f) -> vec2f {
    return pos + offset;
}

fn scale(pos: vec2f, scale: vec2f) -> vec2f {
    return pos * scale;
}

fn rotate(pos: vec2f, angle: f32) -> vec2f {
    let s = sin(angle);
    let c = cos(angle);
    return vec2f(
        pos.x * c - pos.y * s,
        pos.x * s + pos.y * c
    );
}

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

    let offset = sprite.translate;
    let ratio = sprite.scale;
    let angle = sprite.rotation;

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

    localPos = transalte(localPos, offset);
    localPos = scale(localPos, ratio);
    localPos = rotate(localPos, angle);

    let worldPos = position + localPos;
    let pos = toClippedSpace(worldPos);

    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.color = vec4f(abs(sprite.position / resolution), 1.0, 1.0);
    return output;
}

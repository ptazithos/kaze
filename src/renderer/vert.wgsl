struct Sprite {
  position: vec2f,
  size: vec2f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@group(0) @binding(0) var<storage, read> sprites: array<Sprite>;
@group(0) @binding(1) var<uniform> resolution: vec2f;

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
    let sprite = sprites[instanceIndex];
    let scale = 2.0 / resolution;
    let p = vec2f(sprite.position.x * scale.x - 1.0, 1.0 - sprite.position.y * scale.y);
    let s = sprite.size / resolution;
    
    var pos: vec2f;
    switch (vertex_index % 6u) {
        case 0u: { pos = p; }
        case 1u, 3u: { pos = p + vec2f(s.x, 0); }
        case 2u, 5u: { pos = p + vec2f(0, -s.y); }
        case 4u: { pos = p + vec2f(s.x, -s.y); }
        default: { pos = p; }
    }

    var output: VertexOutput;
    output.position = vec4f(pos, 0.0, 1.0);
    output.color = vec4f(abs(sprite.position / resolution), max(s.x, s.y), 1.0);
    return output;
}

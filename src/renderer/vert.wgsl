struct Sprite {
  position: vec2f,
  size: vec2f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@group(0) @binding(0) var<storage, read> sprites: array<Sprite>;

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
    let sprite = sprites[instanceIndex];
    let pos = array<vec2f, 6>(
        vec2f(sprite.position.x, sprite.position.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y),
        vec2f(sprite.position.x, sprite.position.y + sprite.size.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y + sprite.size.y),
        vec2f(sprite.position.x, sprite.position.y + sprite.size.y)
    );

    var output: VertexOutput;
    output.position = vec4f(pos[vertex_index % 6u], 0.0, 1.0);
    output.color = vec4f(abs(sprite.position.x), abs(sprite.position.y), max(sprite.size.x, sprite.size.y), 1.0);
    return output;
}

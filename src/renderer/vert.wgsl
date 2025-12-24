struct Sprite {
  position: vec2f,
  size: vec2f,
};

@group(0) @binding(0) var<storage, read> sprites: array<Sprite>;

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instanceIndex: u32
) -> @builtin(position) vec4f {
    let sprite = sprites[instanceIndex];
    let pos = array<vec2f, 6>(
        vec2f(sprite.position.x, sprite.position.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y),
        vec2f(sprite.position.x, sprite.position.y + sprite.size.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y),
        vec2f(sprite.position.x + sprite.size.x, sprite.position.y + sprite.size.y),
        vec2f(sprite.position.x, sprite.position.y + sprite.size.y)
    );

  return vec4f(pos[vertex_index % 6u], 0.0, 1.0);
}

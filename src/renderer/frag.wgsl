@group(0) @binding(2) var textureArray: texture_2d_array<f32>;
@group(0) @binding(3) var textureSampler: sampler;

@fragment
fn main(
  @location(0) uv: vec2f,
  @location(1) @interpolate(flat) instanceIndex: u32,
) -> @location(0) vec4f {
  return textureSample(textureArray, textureSampler, uv, i32(instanceIndex));
}
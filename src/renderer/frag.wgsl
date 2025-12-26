@group(1) @binding(0) var textureSampler: sampler;
@group(1) @binding(1) var texture0: texture_2d<f32>;
@group(1) @binding(2) var texture1: texture_2d<f32>;
@group(1) @binding(3) var texture2: texture_2d<f32>;
@group(1) @binding(4) var texture3: texture_2d<f32>;

@fragment
fn main(
  @location(0) uv: vec2f,
  @location(1) @interpolate(flat) instanceIndex: u32,
) -> @location(0) vec4f {
  // Sample all textures (uniform control flow)
  let color0 = textureSample(texture0, textureSampler, uv);
  let color1 = textureSample(texture1, textureSampler, uv);
  let color2 = textureSample(texture2, textureSampler, uv);
  let color3 = textureSample(texture3, textureSampler, uv);
  
  // Select the appropriate color based on instance index
  var color = vec4f(1.0, 0.0, 1.0, 1.0); // magenta for invalid
  switch (instanceIndex) {
    case 0u: { color = color0; }
    case 1u: { color = color1; }
    case 2u: { color = color2; }
    case 3u: { color = color3; }
    default: {}
  }
  
  return color;
}
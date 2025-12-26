@group(1) @binding(0) var textureSampler: sampler;
@group(1) @binding(1) var texture0: texture_2d<f32>;
@group(1) @binding(2) var texture1: texture_2d<f32>;
@group(1) @binding(3) var texture2: texture_2d<f32>;
@group(1) @binding(4) var texture3: texture_2d<f32>;
@group(1) @binding(5) var texture4: texture_2d<f32>;
@group(1) @binding(6) var texture5: texture_2d<f32>;
@group(1) @binding(7) var texture6: texture_2d<f32>;
@group(1) @binding(8) var texture7: texture_2d<f32>;
@group(1) @binding(9) var texture8: texture_2d<f32>;
@group(1) @binding(10) var texture9: texture_2d<f32>;
@group(1) @binding(11) var texture10: texture_2d<f32>;
@group(1) @binding(12) var texture11: texture_2d<f32>;
@group(1) @binding(13) var texture12: texture_2d<f32>;
@group(1) @binding(14) var texture13: texture_2d<f32>;
@group(1) @binding(15) var texture14: texture_2d<f32>;
@group(1) @binding(16) var texture15: texture_2d<f32>;

@fragment
fn main(
  @location(0) uv: vec2f,
  @location(1) @interpolate(flat) instanceIndex: u32,
) -> @location(0) vec4f {
  var color = vec4f(1.0, 0.0, 1.0, 1.0); // magenta for invalid
  switch (instanceIndex) {
    case 0u: { color = textureSampleLevel(texture0, textureSampler, uv, 0.0); }
    case 1u: { color = textureSampleLevel(texture1, textureSampler, uv, 0.0); }
    case 2u: { color = textureSampleLevel(texture2, textureSampler, uv, 0.0); }
    case 3u: { color = textureSampleLevel(texture3, textureSampler, uv, 0.0); }
    case 4u: { color = textureSampleLevel(texture4, textureSampler, uv, 0.0); }
    case 5u: { color = textureSampleLevel(texture5, textureSampler, uv, 0.0); }
    case 6u: { color = textureSampleLevel(texture6, textureSampler, uv, 0.0); }
    case 7u: { color = textureSampleLevel(texture7, textureSampler, uv, 0.0); }
    case 8u: { color = textureSampleLevel(texture8, textureSampler, uv, 0.0); }
    case 9u: { color = textureSampleLevel(texture9, textureSampler, uv, 0.0); }
    case 10u: { color = textureSampleLevel(texture10, textureSampler, uv, 0.0); }
    case 11u: { color = textureSampleLevel(texture11, textureSampler, uv, 0.0); }
    case 12u: { color = textureSampleLevel(texture12, textureSampler, uv, 0.0); }
    case 13u: { color = textureSampleLevel(texture13, textureSampler, uv, 0.0); }
    case 14u: { color = textureSampleLevel(texture14, textureSampler, uv, 0.0); }
    case 15u: { color = textureSampleLevel(texture15, textureSampler, uv, 0.0); }
    default: {}
  }
  
  return color;
}
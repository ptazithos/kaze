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
  // Sample all textures (uniform control flow)
  let color0 = textureSample(texture0, textureSampler, uv);
  let color1 = textureSample(texture1, textureSampler, uv);
  let color2 = textureSample(texture2, textureSampler, uv);
  let color3 = textureSample(texture3, textureSampler, uv);
  let color4 = textureSample(texture4, textureSampler, uv);
  let color5 = textureSample(texture5, textureSampler, uv);
  let color6 = textureSample(texture6, textureSampler, uv);
  let color7 = textureSample(texture7, textureSampler, uv);
  let color8 = textureSample(texture8, textureSampler, uv);
  let color9 = textureSample(texture9, textureSampler, uv);
  let color10 = textureSample(texture10, textureSampler, uv);
  let color11 = textureSample(texture11, textureSampler, uv);
  let color12 = textureSample(texture12, textureSampler, uv);
  let color13 = textureSample(texture13, textureSampler, uv);
  let color14 = textureSample(texture14, textureSampler, uv);
  let color15 = textureSample(texture15, textureSampler, uv);
  
  // Select the appropriate color based on instance index
  var color = vec4f(1.0, 0.0, 1.0, 1.0); // magenta for invalid
  switch (instanceIndex) {
    case 0u: { color = color0; }
    case 1u: { color = color1; }
    case 2u: { color = color2; }
    case 3u: { color = color3; }
    case 4u: { color = color4; }
    case 5u: { color = color5; }
    case 6u: { color = color6; }
    case 7u: { color = color7; }
    case 8u: { color = color8; }
    case 9u: { color = color9; }
    case 10u: { color = color10; }
    case 11u: { color = color11; }
    case 12u: { color = color12; }
    case 13u: { color = color13; }
    case 14u: { color = color14; }
    case 15u: { color = color15; }
    default: {}
  }
  
  return color;
}
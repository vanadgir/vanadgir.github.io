// SkyMaskMaterial.js
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const SkyMaskMaterial = shaderMaterial(
  {
    uTexture: null,
    uThreshold: 0.1,  // will be animated
    uOpacity: 0.5,
    uTime: 0.0,
    uWaveAmp: 0.5,    // in world units (mesh wave)
    uWaveFreq: 1.5,   // spatial frequency
  },
  /* vertex shader */ `
    uniform float uTime;
    uniform float uWaveAmp;
    uniform float uWaveFreq;

    varying vec2 vUv;

    void main() {
      vUv = uv;

      // Start from the original position
      vec3 displaced = position;

      // Simple radial-ish wave based on position and time
      float wave = sin(length(position.xz) * uWaveFreq + uTime * 0.4) * uWaveAmp;

      // Move along the normal for a breathing sphere effect
      displaced += normal * wave;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `,
  /* fragment shader */ `
    uniform sampler2D uTexture;
    uniform float uThreshold;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(uTexture, vUv);

      float brightness = max(max(tex.r, tex.g), tex.b);

      // discard near-black pixels
      if (brightness < uThreshold) {
        discard;
      }

      gl_FragColor = vec4(tex.rgb, uOpacity);
    }
  `
);

extend({ SkyMaskMaterial });

export { SkyMaskMaterial };

"use client";

import { EffectComposer, Bloom, Vignette, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

// Controlled cinematic post-processing:
// - The composer renders in linear HDR, so a filmic ToneMapping pass is required; without it
//   highlights clip to flat white and the golden-hour palette washes out.
// - Selective high-threshold Bloom ONLY on the emissive golden apple hearts & sunlit highlights
//   so the apple silhouette, leaves, and tree branches stay razor-sharp (never washed out or blurry).
// - No heavy screen-wide DepthOfField blur that would smear the island underside or distant castles.
export default function Effects({ quality = "high" }: { quality?: "high" | "low" }) {
  if (quality === "low") {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.92}
          luminanceSmoothing={0.22}
          mipmapBlur
          radius={0.52}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.68}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.25}
        mipmapBlur
        radius={0.58}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.36} darkness={0.32} />
    </EffectComposer>
  );
}

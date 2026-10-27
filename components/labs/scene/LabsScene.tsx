"use client";

import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Atmosphere from "./Atmosphere";
import Island from "./Island";
import SecondaryIslands from "./SecondaryIslands";
import TreeOfLife from "./TreeOfLife";
import Apple from "./Apple";
import FallingApple from "./FallingApple";
import CameraRig, { type CameraPresetCommand } from "./CameraRig";
import Effects from "./Effects";
import Birds from "./Birds";
import { CAMERA } from "@/lib/labs/treeConfig";
import type { AppleAnchor } from "@/lib/labs/anchors";
import type { LanguageCode } from "@/context/LanguageContext";

interface LabsSceneProps {
  anchors: AppleAnchor[];
  language: LanguageCode;
  activeSlug: string | null;
  highlightedSlug?: string | null;
  reducedMotion: boolean;
  cinematic: boolean;
  introDone: boolean;
  autoTour: boolean;
  presetCommand: CameraPresetCommand | null;
  quality: "high" | "low";
  touch?: boolean;
  onSelect: (slug: string) => void;
  onFallDone: () => void;
  onIntroDone: () => void;
  onUserInteract?: () => void;
}

export default function LabsScene({
  anchors,
  language,
  activeSlug,
  highlightedSlug = null,
  reducedMotion,
  cinematic,
  introDone,
  autoTour,
  presetCommand,
  quality,
  touch = false,
  onSelect,
  onFallDone,
  onIntroDone,
  onUserInteract,
}: LabsSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const activeAnchor =
    anchors.find((a) => a.project.slug === activeSlug) ??
    (activeSlug === "__demo_fall__" ? anchors[0] : undefined);

  return (
    <>
      <Atmosphere quality={quality} falling={!!activeAnchor} />
      <CameraRig
        reducedMotion={reducedMotion}
        cinematic={cinematic}
        autoTour={autoTour}
        activeSlug={activeSlug}
        controlsRef={controlsRef}
        presetCommand={presetCommand}
        onIntroDone={onIntroDone}
      />

      {/* Full 360° unconstrained horizontal orbit camera */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enabled={introDone && !activeSlug}
        enablePan={false}
        enableDamping
        dampingFactor={0.065}
        rotateSpeed={0.65}
        zoomSpeed={0.85}
        minDistance={6.2}
        maxDistance={36}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.6}
        autoRotate={false}
        target={CAMERA.target}
        onStart={() => onUserInteract?.()}
      />

      <Birds quality={quality} />
      <SecondaryIslands quality={quality} />
      <Island quality={quality} />
      <TreeOfLife quality={quality} />

      {anchors.map((anchor) => (
        <Apple
          key={anchor.project.id}
          anchor={anchor}
          language={language}
          active={
            activeSlug === anchor.project.slug ||
            (activeSlug === "__demo_fall__" && anchor === anchors[0])
          }
          dimmed={activeSlug !== null && activeSlug !== anchor.project.slug}
          highlighted={highlightedSlug === anchor.project.slug}
          touch={touch}
          onSelect={onSelect}
        />
      ))}

      {activeAnchor && (
        <FallingApple
          key={activeSlug}
          anchor={activeAnchor}
          followCamera={!reducedMotion}
          onFallDone={onFallDone}
        />
      )}

      <Effects quality={quality} />
    </>
  );
}

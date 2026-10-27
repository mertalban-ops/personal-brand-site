"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CAMERA } from "@/lib/labs/treeConfig";

const startPos = new THREE.Vector3(...CAMERA.start);
const heroPos = new THREE.Vector3(...CAMERA.hero);
const closeUpPos = new THREE.Vector3(...CAMERA.closeUp);
const heroTarget = new THREE.Vector3(...CAMERA.target);
const closeUpTarget = new THREE.Vector3(...CAMERA.closeUpTarget);

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export interface CameraPresetCommand {
  id: number;
  mode: "hero" | "closeup" | "orbitAngle";
  azimuthDeg?: number;
}

export default function CameraRig({
  reducedMotion,
  cinematic = true,
  autoTour = false,
  activeSlug = null,
  controlsRef,
  presetCommand,
  onIntroDone,
}: {
  reducedMotion: boolean;
  cinematic?: boolean;
  autoTour?: boolean;
  activeSlug?: string | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  presetCommand: CameraPresetCommand | null;
  onIntroDone?: () => void;
}) {
  const { camera, size } = useThree();
  const t0 = useRef<number | null>(null);
  const introDone = useRef(false);
  const DURATION = 1.35; // Graceful 1.35s entrance settle into hero composition
  const snap = reducedMotion || !cinematic;

  // Transition state for camera preset buttons (Reset, Close-up, 360° angle proof)
  const animFromPos = useRef(new THREE.Vector3());
  const animToPos = useRef(new THREE.Vector3());
  const animFromTarget = useRef(new THREE.Vector3());
  const animToTarget = useRef(new THREE.Vector3());
  const animStart = useRef<number | null>(null);
  const lastCommandId = useRef<number>(0);

  // Smooth multi-axis auto-tour phase tracking so pausing/resuming never jumps
  const tourPhaseRef = useRef<number>(0);
  const tourGraceTimerRef = useRef<number>(0);

  // Responsive distance multiplier so mobile portrait frames the entire island & tree crown
  const aspectFactor = size.width / Math.max(1, size.height) < 0.85 ? 1.36 : 1.0;

  // QA hook: place the camera at an exact pose so renders can be aligned with reference frames.
  useEffect(() => {
    window.__labsSetPose = (pos, target, fov) => {
      animStart.current = null;
      introDone.current = true;
      camera.position.set(...pos);
      if (fov && camera instanceof THREE.PerspectiveCamera) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      if (controlsRef.current) {
        controlsRef.current.target.set(...target);
        controlsRef.current.update();
      } else {
        camera.lookAt(...target);
      }
    };
    return () => {
      delete window.__labsSetPose;
    };
  }, [camera, controlsRef]);

  useEffect(() => {
    if (!presetCommand || presetCommand.id === lastCommandId.current) return;
    lastCommandId.current = presetCommand.id;

    animFromPos.current.copy(camera.position);
    if (controlsRef.current) {
      animFromTarget.current.copy(controlsRef.current.target);
    } else {
      animFromTarget.current.copy(heroTarget);
    }

    if (presetCommand.mode === "closeup") {
      animToPos.current.copy(closeUpPos);
      animToTarget.current.copy(closeUpTarget);
    } else if (presetCommand.mode === "orbitAngle") {
      const rad = ((presetCommand.azimuthDeg ?? 0) * Math.PI) / 180;
      const dist = heroPos.z * aspectFactor;
      animToPos.current.set(
        Math.sin(rad) * dist,
        heroPos.y,
        Math.cos(rad) * dist,
      );
      animToTarget.current.copy(heroTarget);
    } else {
      animToPos.current.set(heroPos.x, heroPos.y, heroPos.z * aspectFactor);
      animToTarget.current.copy(heroTarget);
    }

    animStart.current = performance.now();
  }, [presetCommand, camera, controlsRef, aspectFactor]);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    if (t0.current === null) {
      t0.current = now;
      if (snap) {
        camera.position.set(heroPos.x, heroPos.y, heroPos.z * aspectFactor);
        camera.lookAt(heroTarget);
        if (controlsRef.current) {
          controlsRef.current.target.copy(heroTarget);
          controlsRef.current.update();
        }
        introDone.current = true;
        onIntroDone?.();
        return;
      }
    }

    const e = now - (t0.current ?? now);
    if (!introDone.current && !snap) {
      const p = Math.min(e / DURATION, 1);
      const k = easeOutCubic(p);
      const targetHero = new THREE.Vector3(heroPos.x, heroPos.y, heroPos.z * aspectFactor);
      camera.position.lerpVectors(startPos, targetHero, k);
      camera.lookAt(heroTarget);
      if (controlsRef.current) {
        controlsRef.current.target.copy(heroTarget);
      }
      if (p >= 1) {
        introDone.current = true;
        tourGraceTimerRef.current = 0;
        onIntroDone?.();
      }
      return;
    }

    // Handle smooth preset transitions (Reset / Close-up / Orbit angle)
    if (animStart.current !== null) {
      const elapsedMs = performance.now() - animStart.current;
      const durMs = reducedMotion ? 10 : 650;
      const p = Math.min(1, elapsedMs / durMs);
      const k = easeOutCubic(p);

      camera.position.lerpVectors(animFromPos.current, animToPos.current, k);
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(animFromTarget.current, animToTarget.current, k);
        controlsRef.current.update();
      } else {
        camera.lookAt(animToTarget.current);
      }
      if (p >= 1) {
        animStart.current = null;
        // Sync tour phase to current camera azimuth so if autoTour resumes, it continues smoothly
        tourPhaseRef.current = Math.atan2(camera.position.x, camera.position.z);
      }
      return;
    }

    // Multi-axis Cinematic Auto-Tour (gentle dolly zoom in/out from epic wide world to glowing canopy + 360° orbit)
    if (autoTour && !activeSlug && !reducedMotion && introDone.current) {
      tourGraceTimerRef.current += delta;
      // Hold the iconic 0.0s wide epic world establishing composition for 1.8s after settle, then glide smoothly
      const ramp = Math.min(1, Math.max(0, (tourGraceTimerRef.current - 1.8) / 2.4));
      if (ramp > 0) {
        tourPhaseRef.current += delta * 0.14 * ramp;
        const az = tourPhaseRef.current;

        // Breathe distance between wide archipelago vista (25.2) and mid-close golden apple framing (14.4)
        const dollyWave = (1 - Math.cos(az * 1.4)) * 0.5;
        const baseDist =
          THREE.MathUtils.lerp(heroPos.z, 14.4, dollyWave * 0.82 * ramp) * aspectFactor;

        // Vary elevation from low heroic angle to upper canopy & moon vista
        const desiredY =
          heroPos.y +
          Math.sin(az * 1.1) * 0.78 * ramp +
          dollyWave * 0.65 * ramp;

        const desiredX = Math.sin(az) * baseDist;
        const desiredZ = Math.cos(az) * baseDist;

        // Shift lookAt target smoothly toward the golden apples as camera dollies closer
        const targetY = THREE.MathUtils.lerp(
          heroTarget.y,
          2.45,
          dollyWave * 0.72 * ramp,
        );
        const targetX = Math.sin(az * 1.8) * 0.38 * ramp;

        camera.position.lerp(
          new THREE.Vector3(desiredX, desiredY, desiredZ),
          Math.min(1, delta * 2.6),
        );
        if (controlsRef.current) {
          controlsRef.current.target.lerp(
            new THREE.Vector3(targetX, targetY, 0),
            Math.min(1, delta * 2.6),
          );
          controlsRef.current.update();
        } else {
          camera.lookAt(targetX, targetY, 0);
        }
      }
    }
  });

  return null;
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  CRYSTAL_APPLE_FRAGMENT,
  CRYSTAL_APPLE_VERTEX,
  getSculptedAppleGeometries,
} from "./Apple";
import { getAppleGlowTexture, getCloudPuffTexture } from "@/lib/labs/pbrTextures";
import type { AppleAnchor } from "@/lib/labs/anchors";

/**
 * 7-Stage Poetic & Cinematic Apple Fall Sequence matching reference video frames (5.6s -> 6.4s -> 7.2s -> 8.0s -> 8.8s -> 9.6s):
 *  1. Selection & Luminescent Awakening (0.00s - 0.42s): Apple shimmers & trembles on its bough (5.6s)
 *  2. Weightless Release (0.42s - 0.72s): Detaches gracefully with a delicate golden spark
 *  3. Descent Past Roots & Meadow Rim (0.72s - 1.65s): Glides past gnarled roots, bonsai trees & waterfall lips (6.4s)
 *  4. High-Altitude Freefall Past Craggy Cliffs & Waterfalls (1.65s - 2.65s): Falls past the jagged rock underside & 3 long waterfalls with the vast cloud sea below (7.2s)
 *  5. Open Abyss Over the Cumulus Cloud Sea (2.65s - 3.35s): Plunges far below the island into open space above billowing 3D cumulus clouds; camera pitches down into the cloud abyss (8.0s)
 *  6. Magical Starburst Transformation (3.35s - 4.25s): Suspended over the sunlit clouds, the apple erupts into hundreds of radial golden-ivory light streaks & bokeh sparks (8.8s)
 *  7. Pure Light Dissolution (4.25s - 4.55s): Dissolves into a transcendent golden solar bloom & anamorphic lens flare (9.6s)
 */
// Timeline (seconds). One clock drives motion, light and particles so they stay in sync.
const T_SELECT = 0.48; // glow up + tremble while the camera closes in
const T_DETACH = 0.9; // stem releases, single pendulum swing
const T_CLOUDS = 2.82; // long freefall past cliffs & waterfalls ends; apple enters the cloud layers
const T_BURST = 3.83; // apple starts turning into light inside the clouds
const T_DONE = 5.0; // fully dissolved → hand off to the page transition

/**
 * Fall progress → path progress: gravity ramp (0–20%), near-terminal velocity (20–85%),
 * then a soft cushioning as the apple sinks into the cloud bed. Continuous slope, e(1) = 1.
 */
function fallEase(p: number) {
  const a = 2.924;
  const s = 0.4 * a;
  if (p < 0.2) return a * p * p;
  if (p < 0.85) return 0.04 * a + s * (p - 0.2);
  const d = p - 0.85;
  return 0.04 * a + s * 0.65 + s * d - 2 * s * d * d;
}

export default function FallingApple({
  anchor,
  followCamera = true,
  onFallDone,
}: {
  anchor: AppleAnchor;
  followCamera?: boolean;
  onFallDone: () => void;
}) {
  const appleGroup = useRef<THREE.Group>(null);
  const leftLeafRef = useRef<THREE.Mesh>(null);
  const rightLeafRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const dissolveHaloRef = useRef<THREE.Sprite>(null);
  const trailPoints = useRef<THREE.Points>(null);
  const burstPoints = useRef<THREE.Points>(null);
  const burstRingPoints = useRef<THREE.Points>(null);
  const burstStreaksRef = useRef<THREE.InstancedMesh>(null);
  const startTime = useRef<number | null>(null);
  const doneRef = useRef(false);
  const { camera } = useThree();

  const { appleGeo, coreGeo, stemGeo, leafGeo, sparkleGeo } = useMemo(
    () => getSculptedAppleGeometries(),
    [],
  );
  const glowTex = useMemo(() => getAppleGlowTexture(), []);
  const cloudPuffTex = useMemo(() => getCloudPuffTexture(), []);

  const appleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.25 },
      uDimmed: { value: 0.0 },
    }),
    [],
  );

  // Long poetic 3D descent path from branch anchor (y ~ +3.6) out past the island rim (y ~ +0.8),
  // past the craggy cliff underside & waterfalls (y ~ -3.2), and deep into the open cloud sea abyss (y = -12.6)!
  const { curve, radialDir, abyssCenter } = useMemo(() => {
    // Starts where the detach swing ends (0.32 below the branch) so the hand-off is seamless
    const p0 = new THREE.Vector3(anchor.position[0], anchor.position[1] - 0.32, anchor.position[2]);
    const radialOut = new THREE.Vector3(p0.x, 0, p0.z);
    if (radialOut.lengthSq() < 0.1) radialOut.set(0, 0, 1);
    radialOut.normalize();

    // p1: Clears the island cliff rim (6.4s frame: tree roots & waterfall lips behind the apple)
    const p1 = new THREE.Vector3(radialOut.x * 5.65, 0.95, radialOut.z * 5.65);
    // p2: Mid-cliff & waterfall descent (7.2s frame: craggy rock underside & 3 waterfalls behind the apple)
    const p2 = new THREE.Vector3(radialOut.x * 6.25, -3.45, radialOut.z * 6.25);
    // p3: Open sky abyss below the waterfalls (8.0s frame: island recedes high above, vast cloud sea below)
    const p3 = new THREE.Vector3(radialOut.x * 6.55, -8.85, radialOut.z * 6.55);
    // p4: Deep cumulus cloud sea sanctuary (8.8s frame: surrounded only by sunlit cumulus clouds & starburst light)
    const p4 = new THREE.Vector3(radialOut.x * 6.65, -12.65, radialOut.z * 6.65);

    return {
      curve: new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]),
      radialDir: radialOut,
      abyssCenter: p4,
    };
  }, [anchor.position]);

  // High-detail close-up volumetric cumulus cloud pillows nestled both below the waterfalls (y = -5.8 .. -8.6 for 7.2s)
  // AND around the deep abyss destination (y = -13.5 .. -16.2 for 8.0s & 8.8s) so clouds have rich 3D billowy depth!
  const abyssCloudsMesh = useMemo(() => {
    const count = 68;
    const p1 = new THREE.PlaneGeometry(1, 1);
    p1.rotateX(-Math.PI * 0.36);
    const p2 = new THREE.PlaneGeometry(1, 1);
    p2.rotateX(-Math.PI * 0.44);
    p2.rotateY(Math.PI * 0.42);
    const pos1 = p1.getAttribute("position");
    const pos2 = p2.getAttribute("position");
    const uv1 = p1.getAttribute("uv");
    const uv2 = p2.getAttribute("uv");
    const positions = new Float32Array((pos1.count + pos2.count) * 3);
    const uvs = new Float32Array((uv1.count + uv2.count) * 2);
    positions.set(pos1.array as Float32Array, 0);
    positions.set(pos2.array as Float32Array, pos1.count * 3);
    uvs.set(uv1.array as Float32Array, 0);
    uvs.set(uv2.array as Float32Array, uv1.count * 2);
    const indices = [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    p1.dispose();
    p2.dispose();

    const mat = new THREE.MeshBasicMaterial({
      map: cloudPuffTex,
      color: "#ffffff",
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    const palette = ["#fff6e8", "#f6e6da", "#ece0dc", "#ddd3d8", "#cfc7d0"];

    for (let i = 0; i < count; i++) {
      if (i < 20) {
        // Upper cloud billow shelf right at the base of the waterfalls (visible in 7.2s frame!)
        const a = (i / 20) * Math.PI * 2 + 0.3;
        const r = 4.2 + (i % 4) * 2.4;
        const cx = Math.cos(a) * r;
        const cz = Math.sin(a) * r - 1.5;
        const cy = -5.65 - (i % 3) * 0.65;
        const s = 3.2 + (i % 4) * 0.85;
        dummy.position.set(cx, cy, cz);
        dummy.rotation.set(0, a, 0);
        dummy.scale.set(s * 1.28, s * 0.85, s * 1.28);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        col.set(palette[i % 3]);
        mesh.setColorAt(i, col);
      } else {
        const j = i - 20;
        const subCount = count - 20;
        const a = j * 2.3999632;
        const r = 0.6 + Math.sqrt(j / subCount) * 11.2;
        const cx = abyssCenter.x + Math.cos(a) * r;
        const cz = abyssCenter.z + Math.sin(a) * r - 1.0;
        const cy = abyssCenter.y - 1.45 - (j % 4) * 0.45 + Math.sin(j * 1.7) * 0.22;
        const s = 2.4 + (j % 5) * 0.75;
        dummy.position.set(cx, cy, cz);
        dummy.rotation.set(0, a, 0);
        dummy.scale.set(s * 1.22, s * 0.84, s * 1.22);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        const toneIdx = cx > 0 ? j % 3 : j % palette.length;
        col.set(palette[toneIdx]);
        mesh.setColorAt(i, col);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  }, [abyssCenter, cloudPuffTex]);

  // 240 radially oriented elongated golden-white light-streak rays for the 8.8s starburst eruption
  const STREAK_COUNT = 240;
  const { streakMesh, streakData } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map: glowTex,
      color: "#ffffff",
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, STREAK_COUNT);
    mesh.visible = false;
    const col = new THREE.Color();
    const palette = ["#fffdf2", "#ffe8a3", "#ffd168", "#ffba42"];
    const data: {
      theta: number;
      rStart: number;
      speed: number;
      len: number;
      width: number;
      zOff: number;
    }[] = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < STREAK_COUNT; i++) {
      const t = i / STREAK_COUNT;
      const theta = i * goldenAngle;
      const rStart = 0.14 + Math.pow(t, 0.7) * 0.85;
      const speed = 0.85 + Math.pow(t, 0.55) * 2.65 + (i % 7) * 0.18;
      const len = 0.24 + (i % 5) * 0.14;
      const width = 0.045 + (i % 3) * 0.018;
      const zOff = Math.sin(i * 4.1) * 0.45;
      data.push({ theta, rStart, speed, len, width, zOff });
      col.set(palette[i % palette.length]);
      mesh.setColorAt(i, col);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return { streakMesh: mesh, streakData: data };
  }, [glowTex]);

  // Subtle golden stardust motes trailing the falling apple
  const TRAIL_COUNT = 64;
  const { trailGeo, trailVelocities } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(TRAIL_COUNT * 3);
    const vel: THREE.Vector3[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      pos[i * 3] = anchor.position[0];
      pos[i * 3 + 1] = anchor.position[1];
      pos[i * 3 + 2] = anchor.position[2];
      vel.push(
        new THREE.Vector3(
          (Math.sin(i * 7.3) - 0.5) * 0.48,
          0.32 + (i % 5) * 0.15,
          (Math.cos(i * 5.1) - 0.5) * 0.48,
        ),
      );
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { trailGeo: geo, trailVelocities: vel };
  }, [anchor.position]);

  // Radial Fibonacci + concentric spiral golden bokeh starburst (exact match to 8.8s!)
  const BURST_COUNT = 420;
  const { burstGeo, burstDirs, burstInitialOffsets } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(BURST_COUNT * 3);
    const dirs: THREE.Vector3[] = [];
    const offsets: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < BURST_COUNT; i++) {
      const t = i / BURST_COUNT;
      const theta = i * goldenAngle;
      // Concentrated inner halo + wide radial mandala spread over the clouds like 8.8s
      const rDisk = 0.16 + Math.pow(t, 0.72) * 3.65;
      const zSpread = Math.sin(i * 3.7) * 0.95;
      const speed = 1.05 + (i % 9) * 0.32;

      const dx = Math.cos(theta) * rDisk * speed * 0.46;
      const dy = Math.sin(theta) * rDisk * speed * 0.42 + 0.08;
      const dz = zSpread * speed * 0.32;

      dirs.push(new THREE.Vector3(dx, dy, dz));
      offsets.push(
        new THREE.Vector3(
          Math.cos(theta) * (0.08 + t * 0.34),
          Math.sin(theta) * (0.08 + t * 0.32),
          zSpread * 0.06,
        ),
      );
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { burstGeo: geo, burstDirs: dirs, burstInitialOffsets: offsets };
  }, []);

  useEffect(() => {
    startTime.current = null;
    doneRef.current = false;
  }, [anchor]);

  useFrame((state, delta) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - startTime.current;
    const g = appleGroup.current;
    if (!g) return;

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    // Stage 1: selection glow + tremble (0 → T_SELECT), then the stem lets go and the apple
    // swings once like a released pendulum before gravity wins (T_SELECT → T_DETACH).
    if (elapsed < T_DETACH) {
      const p = Math.min(1, elapsed / T_SELECT);
      const q = Math.max(0, (elapsed - T_SELECT) / (T_DETACH - T_SELECT));
      const shake = elapsed < T_SELECT ? Math.sin(elapsed * 60) * 0.018 * p : 0;
      g.position.set(
        anchor.position[0] + shake,
        anchor.position[1] - q * q * 0.32,
        anchor.position[2],
      );
      g.rotation.z = shake * 2.2 + Math.sin(q * 7.5) * 0.22 * (1 - q);
      g.rotation.y = q * 0.5;
      g.scale.setScalar(1.18 + p * 0.06);
      if (shaderRef.current) {
        shaderRef.current.uniforms.uIntensity.value = 1.2 + p * 0.3;
      }
      if (followCamera) {
        const targetCam = new THREE.Vector3(
          anchor.position[0] + radialDir.x * 3.85,
          anchor.position[1] - 0.12,
          anchor.position[2] + radialDir.z * 3.85,
        );
        camera.position.lerp(targetCam, Math.min(1, delta * 6.5));
        camera.lookAt(anchor.position[0], anchor.position[1], anchor.position[2]);
      }
      return;
    }

    // Stages 2–5: long freefall past roots, cliff & waterfalls, into the cloud layers (T_DETACH → T_BURST)
    const fallStart = T_DETACH;
    const fallDuration = T_BURST - T_DETACH;
    const fallProgress = Math.min(1, (elapsed - fallStart) / fallDuration);
    const clampedEase = Math.max(0, Math.min(1, fallEase(fallProgress)));

    // Glow builds as the apple sinks through the cloud layers
    if (shaderRef.current && elapsed < T_BURST) {
      shaderRef.current.uniforms.uIntensity.value =
        1.3 + Math.max(0, (elapsed - T_CLOUDS) / (T_BURST - T_CLOUDS)) * 0.7;
    }

    const pt = curve.getPointAt(clampedEase);
    const microSwayX = Math.sin(elapsed * 3.8) * 0.055 * (1 - fallProgress * 0.5);
    g.position.set(pt.x + microSwayX, pt.y, pt.z);

    // Poetic slow tumble & rotation in freefall (matching 6.4s -> 7.2s -> 8.0s -> 8.8s)
    g.rotation.y = 0.5 + (elapsed - fallStart) * 1.2;
    g.rotation.z = Math.sin(elapsed * 2.4) * 0.16 + fallProgress * 0.25;
    g.rotation.x = Math.cos(elapsed * 1.9) * 0.12 + fallProgress * 0.18;

    // Leaves flutter upward gently from air currents during descent
    if (leftLeafRef.current && rightLeafRef.current) {
      const flutter = Math.sin(elapsed * 15) * 0.075 + Math.sin(fallProgress * Math.PI) * 0.22;
      leftLeafRef.current.rotation.z = 0.24 + flutter;
      rightLeafRef.current.rotation.z = -0.22 - flutter;
    }

    // Update trailing golden stardust particles
    if (trailPoints.current) {
      const attr = trailGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const spawnWindow = (i / TRAIL_COUNT) * fallDuration;
        if (elapsed - fallStart < spawnWindow) {
          attr.setXYZ(
            i,
            pt.x + (Math.sin(i * 3.1) - 0.5) * 0.18,
            pt.y + 0.14,
            pt.z + (Math.cos(i * 2.7) - 0.5) * 0.18,
          );
        } else {
          const v = trailVelocities[i];
          attr.setXYZ(
            i,
            attr.getX(i) + v.x * delta * 0.32,
            attr.getY(i) + v.y * delta * 0.52,
            attr.getZ(i) + v.z * delta * 0.32,
          );
        }
      }
      attr.needsUpdate = true;
    }

    // Cinematic camera choreography across the 3 visual zones:
    // - Zone A (0.42s..1.65s, 6.4s ref): Eye-level tracking so tree roots, meadow & waterfall lips frame the background
    // - Zone B (1.65s..2.55s, 7.2s ref): Slightly elevated tracking so craggy cliff underside, 3 waterfalls & cloud sea below are framed
    // - Zone C (2.55s..4.55s, 8.0s & 8.8s ref): Camera rises above the apple and pitches ~34° DOWNWARD into the open cloud sea abyss
    //   so the island rock disappears high above the frame and only billowing clouds & starburst sparks surround the apple!
    if (followCamera) {
      const abyssPhase = Math.max(0, Math.min(1, (elapsed - T_CLOUDS + 0.27) / 1.06));
      const smoothAbyss = abyssPhase * abyssPhase * (3 - 2 * abyssPhase);

      const camDist = THREE.MathUtils.lerp(3.55, 3.95, smoothAbyss);
      const camHeightOffset = THREE.MathUtils.lerp(-0.12, 2.35, smoothAbyss);
      const lookYOffset = THREE.MathUtils.lerp(0.24, -0.45, smoothAbyss);

      const desiredCamPos = new THREE.Vector3(
        pt.x + radialDir.x * camDist,
        pt.y + camHeightOffset,
        pt.z + radialDir.z * camDist,
      );
      camera.position.lerp(desiredCamPos, Math.min(1, delta * 11));
      camera.lookAt(pt.x, pt.y + lookYOffset, pt.z);
    }

    // Stage 6 & 7: Radial Golden Starburst Eruption & Light Dissolution in the Cloud Sea (3.32s - 4.55s, matching 8.8s & 9.6s)
    if (elapsed >= T_BURST) {
      const bTime = elapsed - T_BURST;
      const bNorm = Math.min(1, bTime / (T_DONE - T_BURST - 0.2));
      // Apple condenses into a luminous golden-peach core at the center of the starburst (8.8s)
      const shrink = THREE.MathUtils.lerp(1.22, 0.58, bNorm);
      g.scale.setScalar(shrink);
      g.rotation.z = 0.42;
      g.rotation.x = 0.28;

      if (shaderRef.current) {
        shaderRef.current.uniforms.uIntensity.value = 1.45 + bNorm * 1.1;
      }

      if (dissolveHaloRef.current) {
        // Pure light dissolution ramp in the final 0.45s (4.10s..4.55s -> 9.6s solar flare)
        const dissolveT = Math.max(0, (elapsed - (T_DONE - 0.55)) / 0.55);
        // Final beat: the light swallows the frame (reference 9.6s is an almost white-gold screen)
        const haloScale = 1.6 + Math.pow(bNorm, 1.5) * 3.2 + Math.pow(dissolveT, 1.6) * 32.0;
        dissolveHaloRef.current.scale.setScalar(haloScale);
        dissolveHaloRef.current.material.opacity = Math.min(1, 0.32 + bNorm * 0.45 + dissolveT * 0.9);
      }

      if (burstPoints.current) {
        burstPoints.current.visible = true;
        const bAttr = burstGeo.getAttribute("position") as THREE.BufferAttribute;
        const endPt = curve.getPointAt(1);
        const drag = Math.pow(bTime * 1.17, 0.72);
        for (let i = 0; i < BURST_COUNT; i++) {
          const d = burstDirs[i];
          const o = burstInitialOffsets[i];
          bAttr.setXYZ(
            i,
            endPt.x + o.x + d.x * drag,
            endPt.y + o.y + d.y * drag,
            endPt.z + o.z + d.z * drag,
          );
        }
        bAttr.needsUpdate = true;
      }
      if (burstRingPoints.current) {
        burstRingPoints.current.visible = true;
        burstRingPoints.current.position.copy(curve.getPointAt(1));
        const ringScale = 0.45 + Math.pow(bTime * 1.17, 0.68) * 1.85;
        burstRingPoints.current.scale.setScalar(ringScale);
        burstRingPoints.current.rotation.z = bTime * 0.42;
      }
      if (burstStreaksRef.current) {
        burstStreaksRef.current.visible = true;
        const endPt = curve.getPointAt(1);
        const drag = Math.pow(bTime * 1.17, 0.68);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < STREAK_COUNT; i++) {
          const sd = streakData[i];
          const r = sd.rStart + sd.speed * drag;
          const sx = endPt.x + Math.cos(sd.theta) * r;
          const sy = endPt.y + Math.sin(sd.theta) * r * 0.92;
          const sz = endPt.z + sd.zOff * drag * 0.45;
          dummy.position.set(sx, sy, sz);
          dummy.rotation.set(-0.35, 0, sd.theta);
          dummy.scale.set(sd.len * (0.75 + bNorm * 0.65), sd.width, 1);
          dummy.updateMatrix();
          burstStreaksRef.current.setMatrixAt(i, dummy.matrix);
        }
        burstStreaksRef.current.instanceMatrix.needsUpdate = true;
      }
    } else {
      g.scale.setScalar(1.24);
    }

    if (elapsed >= T_DONE && !doneRef.current) {
      doneRef.current = true;
      onFallDone();
    }
  });

  return (
    <group>
      {/* renderOrder ≥ 3 below: light/particles draw after the cloud billboards (which don't write depth) */}
      {/* Close-up volumetric cumulus cloud pillows in the abyss below the waterfalls (7.2s, 8.0s & 8.8s) */}
      <primitive object={abyssCloudsMesh} />
      {/* 240 radial golden-ivory light streaks for the 8.8s starburst */}
      <primitive ref={burstStreaksRef} object={streakMesh} renderOrder={3} />

      <group ref={appleGroup} position={anchor.position} scale={1.24}>
        {/* Warm inner glowing kernel */}
        <mesh renderOrder={3} geometry={coreGeo} position={[0, -0.048, 0]} scale={[0.88, 0.78, 0.88]}>
          <meshBasicMaterial color="#ffba38" transparent opacity={0.64} />
        </mesh>

        {/* Internal golden starlight sparkles */}
        <points renderOrder={3} geometry={sparkleGeo}>
          <pointsMaterial
            map={glowTex}
            color="#ffffff"
            size={0.058}
            transparent
            opacity={0.96}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Translucent Crystal Golden Apple Body with Fresnel rim & rose-amber blush */}
        <mesh renderOrder={3} geometry={appleGeo}>
          <shaderMaterial
            ref={shaderRef}
            vertexShader={CRYSTAL_APPLE_VERTEX}
            fragmentShader={CRYSTAL_APPLE_FRAGMENT}
            uniforms={appleUniforms}
            transparent
          />
        </mesh>

        {/* Woody stem */}
        <mesh geometry={stemGeo}>
          <meshStandardMaterial color="#5d4024" roughness={0.88} />
        </mesh>

        {/* Fluttering veined green leaves */}
        <mesh
          ref={leftLeafRef}
          geometry={leafGeo}
          position={[0.016, 0.278, 0.01]}
          rotation={[-0.32, 0.18, 0.24]}
        >
          <meshStandardMaterial
            vertexColors
            emissive="#587d22"
            emissiveIntensity={0.46}
            roughness={0.48}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh
          ref={rightLeafRef}
          geometry={leafGeo}
          position={[-0.014, 0.27, -0.008]}
          rotation={[-0.28, Math.PI - 0.18, -0.22]}
          scale={0.94}
        >
          <meshStandardMaterial
            vertexColors
            emissive="#4e701d"
            emissiveIntensity={0.4}
            roughness={0.48}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Controlled warm golden aura that expands into pure light dissolution at the end */}
        <sprite renderOrder={4} ref={dissolveHaloRef} scale={1.55}>
          <spriteMaterial
            map={glowTex}
            color="#ffb438"
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            transparent
            opacity={0.32}
          />
        </sprite>
      </group>

      {/* Delicate golden particle trail during descent */}
      <points renderOrder={3} ref={trailPoints} geometry={trailGeo}>
        <pointsMaterial
          map={glowTex}
          color="#ffe8a3"
          size={0.18}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Radial golden bokeh starburst eruption in the clouds (8.8s) */}
      <points renderOrder={3} ref={burstPoints} geometry={burstGeo} visible={false}>
        <pointsMaterial
          map={glowTex}
          color="#fff5cc"
          size={0.5}
          transparent
          opacity={0.96}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Secondary fine sparkle ring for multi-scale bokeh richness (8.8s) */}
      <points renderOrder={3} ref={burstRingPoints} geometry={burstGeo} visible={false}>
        <pointsMaterial
          map={glowTex}
          color="#ffe492"
          size={0.26}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

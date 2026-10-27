"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A small flock of low-poly birds orbiting the island, wings flapping — cheap
// silhouettes that add life against the sky.
function wingGeometry(): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  // Graceful curved gull wing from body (x=0) out to wingtip (x=0.55)
  const v = new Float32Array([
    0, 0, 0.06,
    0.28, 0.04, 0.03,
    0, 0, -0.06,
    0, 0, -0.06,
    0.28, 0.04, 0.03,
    0.55, 0.01, -0.05,
  ]);
  g.setAttribute("position", new THREE.BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

interface BirdDef {
  radius: number;
  height: number;
  speed: number;
  phase: number;
  flap: number;
  scale: number;
}

export default function Birds({ quality = "high" }: { quality?: "high" | "low" }) {
  const count = quality === "high" ? 7 : 3;
  const birds = useMemo<BirdDef[]>(() => {
    const arr: BirdDef[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        radius: 13 + (i * 2.1) % 8,
        height: 4.5 + (i % 4) * 1.1,
        speed: (0.14 + (i % 3) * 0.04) * (i % 2 === 0 ? 1 : -1),
        phase: (i / count) * Math.PI * 2,
        flap: 6.5 + (i % 3) * 1.2,
        scale: 0.22 + (i % 3) * 0.06,
      });
    }
    return arr;
  }, [count]);

  const wingGeo = useMemo(() => wingGeometry(), []);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const leftW = useRef<(THREE.Mesh | null)[]>([]);
  const rightW = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    birds.forEach((b, i) => {
      const g = groups.current[i];
      if (!g) return;
      const a = b.phase + t * b.speed;
      const x = Math.cos(a) * b.radius;
      const z = Math.sin(a) * b.radius;
      const y = b.height + Math.sin(t * 0.6 + b.phase) * 0.8;
      g.position.set(x, y, z);
      // face along the tangent of travel
      g.rotation.y = -a + (b.speed > 0 ? Math.PI : 0) + Math.PI / 2;
      const flap = Math.sin(t * b.flap + b.phase) * 0.6 + 0.2;
      const lw = leftW.current[i];
      const rw = rightW.current[i];
      if (lw) lw.rotation.z = flap;
      if (rw) rw.rotation.z = -flap;
    });
  });

  return (
    <group>
      {birds.map((b, i) => (
        <group
          key={i}
          ref={(el) => {
            groups.current[i] = el;
          }}
          scale={b.scale}
        >
          <mesh
            geometry={wingGeo}
            ref={(el) => {
              leftW.current[i] = el;
            }}
          >
            <meshStandardMaterial color="#5c514f" side={THREE.DoubleSide} roughness={0.9} />
          </mesh>
          <mesh
            geometry={wingGeo}
            scale={[-1, 1, 1]}
            ref={(el) => {
              rightW.current[i] = el;
            }}
          >
            <meshStandardMaterial color="#5c514f" side={THREE.DoubleSide} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

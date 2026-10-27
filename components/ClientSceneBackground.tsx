"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SceneBackground = dynamic(() => import("@/components/SceneBackground"), {
  ssr: false,
});

export default function ClientSceneBackground() {
  const pathname = usePathname();
  // The Labs experience renders its own full-viewport 3D scene.
  if (pathname?.startsWith("/labs")) return null;
  return <SceneBackground />;
}

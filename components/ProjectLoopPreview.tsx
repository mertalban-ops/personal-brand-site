"use client";

import { useReducedMotion } from "framer-motion";
import StockAppPreview from "./previews/StockAppPreview";
import CarpassPreview from "./previews/CarpassPreview";
import AutoServicePreview from "./previews/AutoServicePreview";
import DashboardPreview from "./previews/DashboardPreview";
import { type Project } from "@/data/projects";

export type ProjectLoopPreviewProps = {
  type: Project["previewType"];
};

export default function ProjectLoopPreview({ type }: ProjectLoopPreviewProps) {
  const reduce = useReducedMotion();

  // Animasyonları performansı korumak için reduced motion ile kapatma seçeneği
  const isReduced = reduce ?? false;

  switch (type) {
    case "stockapp":
      return <StockAppPreview reduce={isReduced} />;
    case "carpass":
      return <CarpassPreview reduce={isReduced} />;
    case "auto-service":
      return <AutoServicePreview reduce={isReduced} />;
    case "business-dashboard":
      return <DashboardPreview reduce={isReduced} />;
    default:
      return <div className="flex h-full w-full items-center justify-center rounded-xl bg-line/20">Preview</div>;
  }
}

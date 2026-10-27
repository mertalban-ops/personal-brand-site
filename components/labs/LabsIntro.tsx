"use client";

import LabsExperience from "./LabsExperience";

/**
 * Entry wrapper for /labs.
 * Per Master Prompt Section 5: No long video splash/cutscene that delays interaction.
 * Opens directly into the live 360° interactive Tree of Life with a graceful 1.3s
 * camera settle and accessible loading indicator while WebGL initializes.
 */
export default function LabsIntro() {
  return <LabsExperience heroStart={false} />;
}

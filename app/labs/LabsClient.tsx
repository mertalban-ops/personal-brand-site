"use client";

import dynamic from "next/dynamic";

function Poster() {
  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center bg-gradient-to-b from-[#f0e2c6] to-[#e2cda6]">
      <span className="mono-label" style={{ color: "#b98a3a" }}>
        ALBANEXA LABS
      </span>
      <div className="mt-4 h-8 w-8 animate-spin rounded-full border-2 border-[#b98a3a]/30 border-t-[#b98a3a]" />
    </div>
  );
}

const LabsIntro = dynamic(() => import("@/components/labs/LabsIntro"), {
  ssr: false,
  loading: () => <Poster />,
});

export default function LabsClient() {
  return <LabsIntro />;
}

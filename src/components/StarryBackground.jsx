"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Background from "@/components/Background";
import Camera from "@/components/Camera";

export default function StarryBackground({ className }) {
  return (
    <Canvas className={className}>
      <Suspense fallback={null}>
        <Background />
        <Camera />
      </Suspense>
    </Canvas>
  );
}

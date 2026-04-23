"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Background from "@/components/Background";
import Camera from "@/components/Camera";

export default function StarryBackground({ className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false }}
    >
      <Suspense fallback={null}>
        <Background />
        <Camera />
      </Suspense>
    </Canvas>
  );
}

"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";

import Background from "@/components/Background";
import Camera from "@/components/Camera";
import AsciiMenu from "@/components/AsciiMenu";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Canvas className={styles.backgroundCanvas}>
          <Suspense fallback={null}>
            <Background />
            <Camera />
          </Suspense>
        </Canvas>
        <Canvas
          className={styles.spinnerCanvas}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0, 8], fov: 60 }}
        >
          <Suspense fallback={null}>
            <AsciiMenu />
          </Suspense>
          <AsciiRenderer
            fgColor="white"
            bgColor="transparent"
            invert={false}
            resolution={0.15}
          />
        </Canvas>
      </div>
    </main>
  );
}

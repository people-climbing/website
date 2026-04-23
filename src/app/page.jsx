"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";

import Link from "next/link";
import Background from "@/components/Background";
import Camera from "@/components/Camera";
import AsciiMenu from "@/components/AsciiMenu";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.mobileMenu}>
          <h1 className={styles.mobileTitle}>people</h1>
          <nav className={styles.nav}>
            <Link href="/about" className={styles.navLink}>about</Link>
            <Link href="/videos" className={styles.navLink}>videos</Link>
            <Link href="/blog" className={styles.navLink}>blog</Link>
          </nav>
        </div>
        <Canvas
          className={styles.backgroundCanvas}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Background />
            <Camera />
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

"use client";
import * as THREE from "three";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Canvas, extend } from "@react-three/fiber";
import { Effects, useProgress } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

import modelsConfig from "@/config/models";
import Background from "@/components/Background";
import Camera from "@/components/Camera";
import Model from "@/components/Model";
import Overlay from "@/components/Overlay";

import styles from "./page.module.css";

extend({ UnrealBloomPass, OutputPass });

export default function Home() {
  const [time, setTime] = useState(null);
  const [models, setModels] = useState([]);
  const [selected, select] = useState(null);
  const [showOverlay, toggleOverlay] = useState(false);
  const [hash, setHash] = useState(null);
  const { progress } = useProgress();

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    setModels(modelsConfig);
  }, []);

  useEffect(() => {
    document.body.style.cursor = selected !== null ? "pointer" : "auto";
  }, [selected]);

  function getTime() {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    const d = new Date();
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    const s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
  }

  return (
    <main
      className={`${styles.main} ${progress === 100 ? "" : styles.loading}`}
    >
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
      </nav>
      <div className={styles.selected}>
        {selected != null && models[selected].text}
      </div>
      {progress === 100 ? <div className={styles.time}>{time}</div> : null}
      <div className={styles.grid}>
        {/* <KeyboardControls
          map={[
            { name: "up", keys: ["ArrowUp"] },
            { name: "down", keys: ["ArrowDown"] },
            { name: "left", keys: ["ArrowLeft"] },
            { name: "right", keys: ["ArrowRight"] },
          ]}
        > */}
        <Canvas>
          <Suspense fallback={null}>
            <Effects disableGamma>
              <unrealBloomPass threshold={1} strength={0.2} radius={0} />
              <outputPass args={[THREE.ACESFilmicToneMapping]} />
            </Effects>
            <Background />
            <directionalLight
              color="white"
              position={[0, 2, 2]}
              intensity={1}
            />
            {models.map((model, idx) => (
              <Model
                model={model}
                idx={idx}
                key={idx}
                gridWidth={3}
                select={select}
                toggleOverlay={toggleOverlay}
                setHash={setHash}
                isSelected={selected === idx}
              />
            ))}
            <Camera />
          </Suspense>
        </Canvas>
        {/* </KeyboardControls> */}
      </div>
      {showOverlay ? (
        <Overlay hash={hash} setHash={setHash} toggleOverlay={toggleOverlay} />
      ) : null}
    </main>
  );
}

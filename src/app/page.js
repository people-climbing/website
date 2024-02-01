"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  AsciiRenderer,
  Effects,
  KeyboardControls,
  Text3D,
  useProgress,
} from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

import modelsConfig from "@/config/models";
import Background from "@/components/Background";
import Camera from "@/components/Camera";
import Model from "@/components/Model";

import styles from "./page.module.css";
import { Suspense } from "react";

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
      <div className={styles.selected}>
        {progress !== 100 ? <span className={styles.loader} /> : null}
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
              position={[0, 2, 0.5]}
              intensity={1}
            />
            {models.map((model, idx) => (
              <Model
                model={model}
                idx={idx}
                key={idx}
                gridWidth={4}
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

// refactor these into separate components later

function ScrollingBannerText() {
  const text = useRef();

  useFrame(() => {
    text.current.position.x -= 0.1;
    if (text.current.position.x < -40) {
      text.current.position.x = 10;
    }
  });

  return (
    <Text3D ref={text} font={"/emotion-engine.json"} scale={2}>
      {"please check back later"}
    </Text3D>
  );
}

function Overlay(props) {
  const { hash, setHash, toggleOverlay } = props;
  return (
    <div
      onClick={() => {
        toggleOverlay(false);
        setHash(null);
      }}
      className={styles.overlay}
    >
      {hash ? (
        <iframe
          width="75%"
          height="75%"
          src={`https://www.youtube.com/embed/${hash}`}
          title="people"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
      ) : (
        <Canvas>
          <color attach="background" args={["black"]} />
          <directionalLight
            color="white"
            position={[-5, -5, 5]}
            intensity={10}
          />
          <ScrollingBannerText />
          <AsciiRenderer fgColor="white" bgColor="transparent" />
        </Canvas>
      )}
    </div>
  );
}

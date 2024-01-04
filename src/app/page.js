"use client";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  AsciiRenderer,
  KeyboardControls,
  OrthographicCamera,
  Text3D,
  useKeyboardControls,
} from "@react-three/drei";

import modelsConfig from "@/config/models";
import Background from "@/components/Background";
import Model from "@/components/Model";

import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(null);
  const [models, setModels] = useState([]);
  const [selected, select] = useState(null);
  const [showOverlay, toggleOverlay] = useState(false);
  const [hash, setHash] = useState(null);

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    setModels(modelsConfig);
  }, []);

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
    <main className={styles.main}>
      <div className={styles.selected}>
        {selected != null && models[selected].text}
      </div>
      <div className={styles.time}>{time}</div>
      <div className={styles.grid}>
        <KeyboardControls
          map={[
            { name: "up", keys: ["ArrowUp"] },
            { name: "down", keys: ["ArrowDown"] },
            { name: "left", keys: ["ArrowLeft"] },
            { name: "right", keys: ["ArrowRight"] },
          ]}
        >
          <Canvas>
            {/* <Fisheye zoom={0}> */}
            {/* <CameraControls /> */}
            <Background />
            <directionalLight
              color="white"
              position={[0, 2, 0.5]}
              intensity={1}
            />
            {models.map((model, idx, arr) => (
              <Model
                model={model}
                idx={idx}
                key={idx}
                modelsLength={arr.length}
                select={select}
                toggleOverlay={toggleOverlay}
                setHash={setHash}
              />
            ))}
            <MovingSpot />
            <Camera />
            {/* </Fisheye> */}
          </Canvas>
        </KeyboardControls>
      </div>
      {showOverlay ? (
        <Overlay hash={hash} setHash={setHash} toggleOverlay={toggleOverlay} />
      ) : null}
    </main>
  );
}

function Camera() {
  const viewport = useThree((state) => state.viewport);
  return (
    <OrthographicCamera
      makeDefault
      args={[
        viewport.width / -2,
        viewport.width / 2,
        viewport.height / 2,
        viewport.height / -2,
        0.1,
        1000,
      ]}
      position={[0, 0, 100]}
    />
  );
}

function MovingSpot() {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  const [, get] = useKeyboardControls();

  const vec = new Vector3();
  const { up, down, left, right } = get();
  useFrame((state) => {
    if (up) {
      // do nothing for now
    } else if (down) {
      // do nothing for now
    } else if (left) {
      console.log("going left");
      vec.set(light.current.target.position.x - viewport.width / 3, 0, 0); // 3 is modelsLength
    } else if (right) {
      console.log("going right");
      vec.set(light.current.target.position.x + viewport.width / 3, 0, 0); // 3 is modelsLength
    } else {
      // console.log("checking mouse");
      // no keyboard action, check for mouse
      vec.set(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        0
      );
    }
    light.current.target.position.lerp(vec, 0.1);
    light.current.target.updateMatrixWorld();
  });
  return (
    <spotLight
      castShadow
      position={[0, 0, 3]}
      ref={light}
      penumbra={1}
      distance={10}
      angle={0.45}
      attenuation={10}
      // anglePower={7}
      intensity={30}
    />
  );
}

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
          title="YouTube video player"
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

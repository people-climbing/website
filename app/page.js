"use client";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(null);
  const [models, setModels] = useState([]);
  const [selected, select] = useState(null);

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    setModels([
      {
        name: "isaac",
        relativeScale: 0.4,
        relativeOffsetY: 0,
        text: "daosyn",
      },
      {
        name: "strongbad",
        relativeScale: 1.5,
        relativeOffsetY: 0,
        text: "ocutor",
      },
      {
        name: "katamari",
        relativeScale: 0.25,
        relativeOffsetY: 1,
        text: "jhack",
      },
    ]);
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
        <Canvas>
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
            />
          ))}
          <MovingSpot />
        </Canvas>
      </div>
    </main>
  );
}

function Model(props) {
  const ref = useRef();
  const { model, idx, select, modelsLength } = props;
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });

  const x =
    idx * (viewport.width / modelsLength) - viewport.width / modelsLength;
  const y = -1 + model.relativeOffsetY;
  const gltf = useLoader(GLTFLoader, `/${model.name}/scene.gltf`);
  return (
    <group>
      <mesh
        position={[x, y, 0]}
        scale={model.relativeScale}
        ref={ref}
        onPointerOver={(event) => {
          event.stopPropagation();
          select(idx);
        }}
        onPointerOut={() => {
          select(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          select(idx);
        }}
      >
        <primitive object={gltf.scene} />
      </mesh>
    </group>
  );
}

function MovingSpot({ vec = new Vector3() }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  // add keyboard conditional
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        0
      ),
      0.1
    );
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
      intensity={10}
    />
  );
}

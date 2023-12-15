"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
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
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[1, -1, 0.6]} />
          {models.map((model, idx) => (
            <Model model={model} idx={idx} key={idx} select={select} />
          ))}
          <Himal />
        </Canvas>
      </div>
    </main>
  );
}

function Model(props) {
  const [hovered, hover] = useState(false);
  const ref = useRef();

  const { model, idx, select } = props;

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });

  const x = idx * 3 - 3; // arbitrary, figure out what to do here
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
          hover(true);
          select(idx);
        }}
        onPointerOut={() => {
          hover(false);
          select(null);
        }}
      >
        <primitive object={gltf.scene} />
      </mesh>

      {hovered ? (
        // <spotLight color="white" position={[x, y, 0]} lookAt={[x, y, 0]} />
        <pointLight position={[x, y, 1]} />
      ) : null}
    </group>
  );
}

function Himal() {
  const himal = useLoader(TextureLoader, "/himalsmall.gif");
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime();
  });
  return (
    <mesh position={[0, -2, 0]} ref={ref}>
      <boxGeometry />
      <meshStandardMaterial map={himal} />
    </mesh>
  );
}

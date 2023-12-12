"use client";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "./page.module.css";
import { AnimationAction } from "three";

export default function Home() {
  const [time, setTime] = useState(null);
  const [models, setModels] = useState([]);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    setModels([
      { name: "isaac", scale: 0.4, offset: 0 },
      { name: "strongbad", scale: 1.5, offset: 0 },
      { name: "katamari", scale: 0.25, offset: 1 },
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

  const images = ["/bart.jpg", "/donk.png", "/himalsmall.gif", "/poorguy.jpg"];

  function renderModel(model, idx) {
    // const ref = useUpdate((group) => {
    //   group.rotateX(Math.PI / 2);
    // }, []);
    const gltf = useLoader(GLTFLoader, `/${model.name}/scene.gltf`);
    return (
      <group
        // ref={ref}
        position={[idx * 3 - 3, -1 + model.offset, 0]}
        key={idx}
        scale={model.scale}
        // onMouseEnter={() => setAnimate(true)}
        // onMouseLeave={() => setAnimate(false)}
      >
        <boxGeometry />
        {/* <AnimationAction enabled={animate} /> */}
        <primitive object={gltf.scene} />
      </group>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.time}>{time}</div>
      <div className={styles.grid}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[1, -1, 0.6]} />
          <mesh>{models.map((model, idx) => renderModel(model, idx))}</mesh>
        </Canvas>
      </div>
    </main>
  );
}

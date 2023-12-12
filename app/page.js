"use client";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(null);
  const [models, setModels] = useState([]);
  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    setModels(["isaac", "strongbad"])
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

  function renderModel(name, idx) {
    const gltf = useLoader(GLTFLoader, `/${name}/scene.gltf`);
    return (
      <group position={[idx, idx, idx]}>
        <primitive object={gltf.scene} />
      </group>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.time}>{time}</div>
      {/* <div className={styles.grid}>
        {images.map((i) => (
          <div className={styles.image} key={i}>
            <Image src={i} height="150" width="150" alt={i} />
          </div>
        ))}
      </div> */}
      <div className={styles.grid}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[1, 1, 5]} />
          <mesh>{models.map((name, idx) => renderModel(name, idx))}</mesh>
        </Canvas>
      </div>
    </main>
  );
}

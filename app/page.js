"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import * as THREE from "three";

export default function Home() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
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

  const images = ["/bart.jpg", "/donk.png", "/himalsmall.gif", "poorguy.jpg"];

  function renderCube() {
    return (
      <div className={styles.wrap}>
        <div className={styles.cube}>
          <div className={styles.front}>front</div>
          <div className={styles.back}>back</div>
          <div className={styles.top}>top</div>
          <div className={styles.bottom}>bottom</div>
          <div className={styles.left}>left</div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    );
  }

  // const scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   500, //window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );

  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(500); //window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // camera.position.z = 5;

  // function animate() {
  //   requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.render(scene, camera);
  // }
  // animate();

  return (
    <main className={styles.main}>
      <div className={styles.time}>{time}</div>
      {images.map((i) => (
        <div className={styles.image} key={i}>
          <Image src={i} height="150" width="150" alt={i} />
        </div>
      ))}
      {/* {renderCube()} */}
    </main>
  );
}

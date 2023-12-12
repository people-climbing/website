"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

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

  return (
    <main className={styles.main}>
      <div className={styles.time}>{time}</div>
      {images.map((i) => (
        <div className={styles.image}>
          <Image src={i} height="150" width="150" alt={i} />
        </div>
      ))}
    </main>
  );
}

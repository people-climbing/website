import Link from "next/link";
import AboutBackground from "@/components/AboutBackground";
import styles from "./page.module.css";
import StarryBackground from "@/components/StarryBackground";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <StarryBackground className={styles.backgroundCanvas} />
      <AboutBackground className={styles.backgroundCanvas} />
      <div className={styles.container}>
        <h1 className={styles.title}>About</h1>
        
        <div className={styles.content}>
          <p>
            peopleclimbing.com is an interactive 3D experience inspired by the 
            nostalgic aesthetic of PlayStation 2 system menus. Each object in 
            the grid represents a curated video, waiting to be discovered.
          </p>
          
          <p>
            This site is a digital playground where retro meets modern web 
            technology, combining Three.js 3D rendering with the warm glow 
            of early 2000s console interfaces.
          </p>
          
          <p>
            Created as an experiment in web-based 3D interaction and nostalgic 
            design, this project celebrates the intersection of gaming culture 
            and creative web development.
          </p>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            ← Home
          </Link>
        </nav>
      </div>
    </main>
  );
}

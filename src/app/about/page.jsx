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
        <h1 className={styles.title}>about</h1>
        
        <div className={styles.content}>
          <p>
            it's about the connections we make with others and the skills we develop and share.
          </p>
          
          <p>
            we're people.
          </p>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            ← home
          </Link>
        </nav>
      </div>
    </main>
  );
}

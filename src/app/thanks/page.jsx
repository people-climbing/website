import Image from "next/image";

import styles from "./page.module.css";
import himal from "./himalsmall.gif";

export default function ThanksPage() {
  return (
    <div className={styles.container}>
      <Image src={himal} height={100} width={100} alt="himal dancing" />
      <p>
        hey! thanks for purchasing! you'll receive an email and all that shit
      </p>
    </div>
  );
}

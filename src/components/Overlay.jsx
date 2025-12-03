import { Canvas } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import ScrollingBannerText from "./ScrollingBannerText";
import styles from "@/app/page.module.css";

export default function Overlay({ hash, setHash, toggleOverlay }) {
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
          title="people"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
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

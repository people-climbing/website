"use client";
import { useEffect, useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress, KeyboardControls, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import modelsConfig from "@/config/models";
import Camera from "@/components/Camera";
import Model from "@/components/Model";
import Overlay from "@/components/Overlay";

import styles from "./page.module.css";

export default function VideoPage() {
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState(null);
  const [showOverlay, toggleOverlay] = useState(false);
  const [hash, setHash] = useState(null);
  const { progress } = useProgress();

  const GRID_SIZE = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.cursor = selected !== null ? "pointer" : "auto";
  }, [selected]);

  const map = useMemo(() => [
    { name: "up", keys: ["ArrowUp", "w", "W"] },
    { name: "down", keys: ["ArrowDown", "s", "S"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
    { name: "enter", keys: ["Enter", " "] },
  ], []);

  const handleKeyboardSelection = (direction) => {
    if (selected === null) {
      setSelected(0);
      return;
    }
    const row = Math.floor(selected / GRID_SIZE);
    const col = selected % GRID_SIZE;

    let newRow = row;
    let newCol = col;

    if (direction === "up") newRow = Math.max(0, row - 1);
    if (direction === "down") newRow = Math.min(GRID_SIZE - 1, row + 1);
    if (direction === "left") newCol = Math.max(0, col - 1);
    if (direction === "right") newCol = Math.min(GRID_SIZE - 1, col + 1);

    const newIndex = newRow * GRID_SIZE + newCol;
    if (newIndex < modelsConfig.length) {
      setSelected(newIndex);
    }
  };

  return (
    <KeyboardControls map={map}>
      <main className={styles.main}>
        {/* Persistent UI elements */}
        <div className={styles.selected}>
          {selected !== null && modelsConfig[selected]?.text}
        </div>
        <div className={styles.time}>{time}</div>

        {/* Loading Overlay */}
        {progress < 100 && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingScreen}>
              <span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
            </div>
          </div>
        )}
        
        <div className={styles.grid}>
          <Canvas
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <color attach="background" args={["#000000"]} />
              
              <Camera />
              <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade
                speed={1}
              />
              
              <ambientLight intensity={0.6} />
              
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.2} 
              />
              
              <spotLight 
                position={[-5, 8, -5]} 
                intensity={1} 
                angle={0.3} 
                penumbra={1} 
              />

              <group position={[0, 0, 0]}>
                {modelsConfig.map((model, idx) => (
                  <Model
                    key={model.name}
                    model={model}
                    idx={idx}
                    gridWidth={GRID_SIZE}
                    select={setSelected}
                    toggleOverlay={toggleOverlay}
                    setHash={setHash}
                    isSelected={selected === idx}
                  />
                ))}
              </group>

              <EffectComposer>
                <Bloom 
                  intensity={0.4} 
                  luminanceThreshold={0.9} 
                  mipmapBlur 
                />
              </EffectComposer>

              <KeyboardHandler 
                onMove={handleKeyboardSelection} 
                onSelect={() => {
                  if (selected !== null) {
                    setHash(modelsConfig[selected].hash);
                    toggleOverlay(true);
                  }
                }}
              />
            </Suspense>
          </Canvas>
        </div>

        {showOverlay && (
          <Overlay hash={hash} setHash={setHash} toggleOverlay={toggleOverlay} />
        )}
      </main>
    </KeyboardControls>
  );
}

import { useKeyboardControls } from "@react-three/drei";
function KeyboardHandler({ onMove, onSelect }) {
  const [, get] = useKeyboardControls();
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { up, down, left, right, enter } = get();
      if (up) onMove("up");
      if (down) onMove("down");
      if (left) onMove("left");
      if (right) onMove("right");
      if (enter) onSelect();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [get, onMove, onSelect]);

  return null;
}

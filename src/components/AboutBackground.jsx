"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Camera from "@/components/Camera";
import Background from "@/components/Background";
import { AsciiRenderer } from "@react-three/drei";

function RotatingRing() {
  const groupRef = useRef();
  const prismCount = 12;
  const radius = 3;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]} scale={1}>
      {Array.from({ length: prismCount }).map((_, i) => {
        const angle = (i / prismCount) * Math.PI * 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.5, 1.2, 0.2]} />
            <meshBasicMaterial color="white" />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <Background />
      <Camera />

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[0, 0, 5]} intensity={2} />

      {/* Rotating ring of prisms - positioned close to camera */}
      <RotatingRing />
    </>
  );
}

export default function AboutBackground({ className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <AsciiRenderer
        fgColor="white"
        bgColor="transparent"
        invert={false}
        resolution={0.15}
      />
    </Canvas>
  );
}

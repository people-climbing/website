"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Background from "@/components/Background";
import Camera from "@/components/Camera";
import { AsciiRenderer } from "@react-three/drei";

function StickFigure({ position, phase = 0 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + phase;
      // Dancing motion
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5;
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.3;

      // Arm swing
      const leftArm = groupRef.current.children[2];
      const rightArm = groupRef.current.children[3];
      if (leftArm) leftArm.rotation.z = Math.sin(time * 2) * 0.8;
      if (rightArm) rightArm.rotation.z = -Math.sin(time * 2) * 0.8;

      // Leg swing
      const leftLeg = groupRef.current.children[4];
      const rightLeg = groupRef.current.children[5];
      if (leftLeg) leftLeg.rotation.z = Math.sin(time * 2 + Math.PI) * 0.5;
      if (rightLeg) rightLeg.rotation.z = -Math.sin(time * 2 + Math.PI) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={150}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.25, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.25, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.12, -0.4, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.12, -0.4, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <Camera />

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[0, 0, 5]} intensity={2} />

      {/* Left side stick figures - spaced vertically */}
      <StickFigure position={[-700, 400, 9]} phase={0} />
      <StickFigure position={[-700, 0, 9]} phase={1} />
      <StickFigure position={[-700, -400, 9]} phase={2} />

      {/* Right side stick figures - spaced vertically */}
      <StickFigure position={[700, 400, 9]} phase={1.5} />
      <StickFigure position={[700, 0, 9]} phase={2.5} />
      <StickFigure position={[700, -400, 9]} phase={0.5} />
    </>
  );
}

export default function BlogBackground({ className }) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 10], fov: 60 }}>
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

"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Model({
  model,
  idx,
  gridWidth,
  select,
  setHash,
  toggleOverlay,
  isSelected,
}) {
  const modelRef = useRef();
  const { scene } = useGLTF(`/models/${model.name}/scene.gltf`);

  // Ensure all meshes in the scene cast/receive shadows
  useMemo(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [scene]);

  // Simple rotation for the model
  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = -clock.getElapsedTime() / 2;
    }
  });

  // Calculate grid position
  const row = Math.floor(idx / gridWidth);
  const col = idx % gridWidth;
  
  // Center the grid: (col - 1) * spacing, (row - 1) * spacing
  const spacing = 5;
  const x = (col - 1) * spacing;
  const z = (row - 1) * spacing;
  
  // Base floor height is -1
  const floorY = -1;
  // Lift the model itself based on its origin (feet vs center)
  const modelY = floorY + (model.relativeOffsetY / 100);

  return (
    <group position={[x, 0, z]}>
      {/* Selection Circle - always exactly on the floor */}
      {isSelected && (
        <mesh 
          position={[0, floorY + 0.01, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[0.6, 64]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={4}
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Model - positioned with its specific lift */}
      <group position={[0, modelY, 0]} rotation-order="YXZ">
        <group
          scale={model.relativeScale / 100}
          ref={modelRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            select(idx);
          }}
          onClick={(e) => {
            e.stopPropagation();
            select(idx);
            setHash(model.hash);
            toggleOverlay(true);
          }}
        >
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

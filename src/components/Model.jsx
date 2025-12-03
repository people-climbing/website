import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default function Model({
  model,
  idx,
  gridWidth,
  select,
  setHash,
  toggleOverlay,
  isSelected,
}) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.getElapsedTime() / 2;
  });

  const gapWidth = viewport.width / (gridWidth + 1);
  const x = (model.column + 1) * gapWidth - viewport.width / 2;

  const y = 200 + model.relativeOffsetY - model.row * 200;
  const gltf = useLoader(GLTFLoader, `/models/${model.name}/scene.gltf`);
  return (
    <group>
      <mesh
        position={[x, y, 0]}
        scale={model.relativeScale}
        rotation={[Math.PI / 12, 0, 0]}
        ref={ref}
        onPointerOver={(event) => {
          event.stopPropagation();
          select(idx);
        }}
        onPointerOut={() => {
          select(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          select(idx);
          setHash(model.hash);
          toggleOverlay(true);
        }}
      >
        <primitive object={gltf.scene} />
      </mesh>
      {isSelected ? (
        <mesh position={[x, y - 15 - model.relativeOffsetY, 0]}>
          <circleGeometry args={[25, 64]} />
          <meshStandardMaterial
            color={"white"}
            emissive={"white"}
            emissiveIntensity={10}
            toneMapped={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

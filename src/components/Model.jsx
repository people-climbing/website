import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default function Model({
  model,
  idx,
  modelsLength,
  select,
  setHash,
  toggleOverlay,
}) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });

  const gapWidth = viewport.width / (modelsLength + 1);
  const x = (idx + 1) * gapWidth - viewport.width / 2;

  const y = -1 + model.relativeOffsetY;
  const gltf = useLoader(GLTFLoader, `/models/${model.name}/scene.gltf`);
  return (
    <group>
      <mesh
        position={[x, y, -4]}
        scale={model.relativeScale}
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
    </group>
  );
}

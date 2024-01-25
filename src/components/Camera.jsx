import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

export default function Camera() {
  const viewport = useThree((state) => state.viewport);
  return (
    <OrthographicCamera
      makeDefault
      args={[
        viewport.width / -2,
        viewport.width / 2,
        viewport.height / 2,
        viewport.height / -2,
        0.1,
        1000,
      ]}
      position={[0, 150, 150]}
      rotation={[-Math.PI / 4, 0, 0]}
    />
  );
}

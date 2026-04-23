import { PerspectiveCamera } from "@react-three/drei";

export default function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 12, 12]}
      fov={50}
      far={5000}
      onUpdate={(self) => self.lookAt(0, 0, 0)}
    />
  );
}

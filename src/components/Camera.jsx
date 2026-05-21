import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

export default function Camera({
  mouseDistort = false,
  distortionStrength = 10,
  rollStrength = 1,
}) {
  const cameraRef = useRef(null);

  useFrame((state) => {
    const cam = cameraRef.current;
    if (!cam) return;

    if (!mouseDistort) {
      cam.lookAt(0, 0, 0);
      return;
    }

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Slightly drift the camera to create a soft lens warp feeling.
    const targetX = pointerX * distortionStrength;
    const targetY = 12 + pointerY * (distortionStrength * 0.55);
    const targetZ = 12 + Math.abs(pointerX) * 0.35;

    cam.position.x += (targetX - cam.position.x) * 0.08;
    cam.position.y += (targetY - cam.position.y) * 0.08;
    cam.position.z += (targetZ - cam.position.z) * 0.08;

    cam.lookAt(pointerX * 0.9, pointerY * 0.5, 0);
    cam.rotation.z += (-pointerX * rollStrength - cam.rotation.z) * 0.08;
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 12, 12]}
      fov={50}
      far={5000}
      onUpdate={(self) => self.lookAt(0, 0, 0)}
    />
  );
}

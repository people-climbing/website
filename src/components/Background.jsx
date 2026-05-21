import { useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Background() {
  const viewport = useThree((state) => state.viewport);
  return (
    <group>
      <color attach="background" args={[0x000000]} />
      <Stars
        count={2500}
        depth={50}
        radius={100}
        factor={4}
        saturation={0}
        speed={0.005}
        fade
      />
    </group>
  );
}

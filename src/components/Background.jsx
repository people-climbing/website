import { useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Background() {
  const viewport = useThree((state) => state.viewport);
  return (
    <group>
      <color attach="background" args={[0x000000]} />
      <Stars
        count={10000}
        depth={50}
        radius={200}
        factor={6}
        saturation={0}
        speed={1}
        fade
      />
    </group>
  );
}

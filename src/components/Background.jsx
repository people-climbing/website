import { useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Background() {
  const viewport = useThree((state) => state.viewport);
  return (
    <Stars
      count={3000}
      depth={500}
      radius={10}
      factor={.1}
      saturation={100}
      speed={1}
      fade
    />
  );
}

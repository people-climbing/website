import { useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function Background() {
  const viewport = useThree((state) => state.viewport);
  return (
    <Sparkles
      size={500}
      color={"#a6cedd"}
      opacity={0.5}
      scale={[viewport.width, viewport.height, 0]}
      count={300}
      speed={20}
      noise={10}
    />
  );
}

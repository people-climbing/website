import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";

export default function ScrollingBannerText() {
  const text = useRef();

  useFrame(() => {
    text.current.position.x -= 0.1;
    if (text.current.position.x < -40) {
      text.current.position.x = 10;
    }
  });

  return (
    <Text3D ref={text} font={"/emotion-engine.json"} scale={2}>
      {"please check back later"}
    </Text3D>
  );
}

import { useThree } from "@react-three/fiber";
import { Backdrop, Environment, Stars } from "@react-three/drei";

export default function Background() {
  const viewport = useThree((state) => state.viewport);
  return (
    <group>
      <color attach="background" args={[0x000034]} />
      <Stars
        count={3000}
        depth={500}
        radius={20}
        factor={0.1}
        saturation={100}
        speed={2}
        fade
      />
    </group>
    // <Environment preset="warehouse" />
    // <Backdrop
    //   floor={0.25} // Stretches the floor segment, 0.25 by default
    //   segments={20} // Mesh-resolution, 20 by default
    //   scale={1000}
    //   position={[0, -150, -150]}
    // >
    //   <meshStandardMaterial color="skyblue" />
    // </Backdrop>
  );
}

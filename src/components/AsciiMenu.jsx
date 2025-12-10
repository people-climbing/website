"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import { useRouter } from "next/navigation";

const menuOptions = [
  { label: "about", route: "/about" },
  { label: "videos", route: "/videos" },
  { label: "blog", route: "/blog" },
];

export default function AsciiMenu() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const viewport = useThree((state) => state.viewport);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Adjust positions based on screen size
  const titlePosition = isMobile ? [0, 1, 0] : [-2, 1.5, 0];
  const menuPosition = isMobile ? [0, -1.5, 0] : [3, 0, 0];
  const menuSpacing = isMobile ? 1.2 : 1.5;
  const scale = isMobile ? 0.6 : 1;

  return (
    <group scale={scale}>
      {/* Bouncing "ppl..." text */}
      <BouncingText text="ppl..." position={titlePosition} />

      {/* Menu options */}
      <group position={menuPosition}>
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.label}
            label={option.label}
            route={option.route}
            position={[0, -index * menuSpacing, 0]}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onUnhover={() => setHoveredIndex(null)}
            onClick={() => router.push(option.route)}
          />
        ))}
      </group>

      <ambientLight intensity={0.4} />

      {/* Main light from above and to the right */}
      <directionalLight position={[8, 12, 5]} intensity={2} />
      
      {/* Secondary light from upper left for balance */}
      <directionalLight position={[-5, 8, 3]} intensity={0.6} />
      
      {/* Fill light from front for visibility */}
      <pointLight position={[0, 0, 8]} intensity={0.8} />
      
      {/* Accent light from behind right for edge definition */}
      <pointLight position={[6, 3, -4]} intensity={0.5} />
    </group>
  );
}

function BouncingText({ text, position }) {
  const groupRef = useRef();
  const letters = text.split("");

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(clock.getElapsedTime() * 3 + i * 1) * 0.75;
        // child.rotation.z = Math.sin(clock.getElapsedTime() * 2.5 + i * 0.6) * 0.15;
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {letters.map((letter, index) => (
        <Text3D
          key={index}
          font="/emotion-engine.json"
          height={0.2}
          position={[index - (letters.length * 1.2) / 2, 0, 0]}
        >
          {letter}
          <meshStandardMaterial
            color="#ffffff"
            emissive="#000000"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.3}
          />
        </Text3D>
      ))}
    </group>
  );
}

function MenuItem({ label, route, position, isHovered, onHover, onUnhover, onClick }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 3) * 0.1;
      meshRef.current.position.z = Math.sin(clock.getElapsedTime() * 2) * 0.2;
    } else if (meshRef.current) {
      meshRef.current.rotation.y = 0;
      meshRef.current.position.z = 0;
    }
  });

  const textMaterial = useMemo(
    () => ({
      color: "#ffffff",
      emissive: isHovered ? "#000000" : "#ffffff",
      emissiveIntensity: isHovered ? 0.8 : 0.2,
      metalness: 0.5,
    }),
    [isHovered]
  );

  return (
    <Center position={position}>
      <group ref={meshRef}>
        <Text3D
          font="/emotion-engine.json"
          height={0.3}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onUnhover();
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {label}
          <meshStandardMaterial {...textMaterial} />
        </Text3D>
      </group>
    </Center>
  );
}

"use client";

import { useRef, useEffect, useMemo, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  RoundedBox,
  Grid,
} from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
  color: string;
  material: string;
  thickness: number;
  width: number;
  height: number;
  shape: string;
  cornerRadius: number;
}

function ProductModel({
  color,
  material,
  thickness,
  width,
  height,
  shape,
  cornerRadius,
}: ProductModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const scale = 0.02;
  const w = width * scale;
  const h = height * scale;
  const t = thickness * scale;
  const radius = Math.min(cornerRadius * scale, Math.min(w, h) / 2 - 0.01);

  const materialProps = useMemo(() => {
    const base: Record<string, number> = { roughness: 0.5, metalness: 0.1 };
    switch (material) {
      case "petg":
        return { ...base, roughness: 0.3, metalness: 0.05, clearcoat: 0.4 };
      case "resin":
        return { ...base, roughness: 0.1, metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.1 };
      case "wood-filled-pla":
        return { ...base, roughness: 0.8, metalness: 0.0 };
      case "carbon-fiber-pla":
        return { ...base, roughness: 0.4, metalness: 0.3 };
      default:
        return base;
    }
  }, [material]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  const isRound = shape === "round-tag";

  return (
    <group position={[0, t / 2 + 0.01, 0]}>
      {isRound ? (
        <mesh ref={meshRef} castShadow receiveShadow>
          <cylinderGeometry args={[w / 2, w / 2, t, 64]} />
          <meshPhysicalMaterial color={color} {...materialProps} />
        </mesh>
      ) : (
        <RoundedBox
          ref={meshRef}
          args={[w, t, h]}
          radius={Math.max(radius, 0.005)}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial color={color} {...materialProps} />
        </RoundedBox>
      )}
    </group>
  );
}

interface SceneCanvasProps extends ProductModelProps {
  resetRef: MutableRefObject<(() => void) | null>;
}

export default function SceneCanvas({ resetRef, ...modelProps }: SceneCanvasProps) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    resetRef.current = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };
  }, [resetRef]);

  return (
    <Canvas
      shadows
      camera={{ position: [3, 2.5, 3], fov: 35 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} />

      <ProductModel {...modelProps} />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />

      <Grid
        position={[0, -0.001, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#e5e7eb"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#d1d5db"
        fadeDistance={8}
        infiniteGrid
      />

      <Environment preset="studio" />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={8}
        enablePan={false}
      />
    </Canvas>
  );
}

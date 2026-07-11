import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, MeshDistortMaterial, Float, Torus, Icosahedron, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

// Floating neon ring
function NeonRing({ position, rotation, color, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[1.2, 0.04, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// Distorted glowing sphere
function GlowSphere({ position, color, speed = 1, distort = 0.3, size = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={1} floatingRange={[-0.3, 0.3]}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

// Wireframe icosahedron
function WireIcosa({ position, color, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4 * speed;
      ref.current.rotation.z = state.clock.elapsedTime * 0.3 * speed;
    }
  });
  return (
    <Float speed={2} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

// Spinning torus knot
function SpinKnot({ position, color, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
    }
  });
  return (
    <Float speed={1} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Scattered particles
function Particles({ count = 120, speed = 1 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 24;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02 * speed;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01 * speed;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#c77dff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Main grid plane
function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[40, 40, 20, 20]} />
      <meshBasicMaterial
        color="#7b2d8b"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export default function Scene({ speed = 1 }) {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.04 * speed;
      starsRef.current.rotation.x += delta * 0.01 * speed;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#c77dff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#f72585" intensity={1.5} />
      <pointLight position={[0, 8, -8]} color="#00f5d4" intensity={1} />

      {/* Star field */}
      <group ref={starsRef}>
        <Stars radius={90} depth={60} count={6000} factor={3} saturation={0.5} fade speed={1} />
      </group>

      {/* Grid floor */}
      <GridPlane />

      {/* Particles */}
      <Particles count={150} speed={speed * 0.5} />

      {/* Glowing distorted spheres */}
      <GlowSphere position={[-5, 1, -4]} color="#c77dff" speed={speed * 0.5} distort={0.4} size={1.6} />
      <GlowSphere position={[5.5, -0.5, -5]} color="#f72585" speed={speed * 0.3} distort={0.5} size={1.3} />
      <GlowSphere position={[0, 3, -8]} color="#00f5d4" speed={speed * 0.4} distort={0.35} size={2} />

      {/* Torus knots */}
      <SpinKnot position={[-6, 2, -3]} color="#c77dff" speed={speed * 0.6} />
      <SpinKnot position={[6, -1, -4]} color="#00f5d4" speed={speed * 0.4} />

      {/* Wireframe icosahedra */}
      <WireIcosa position={[4, 3, -3]} color="#f72585" speed={speed * 0.7} />
      <WireIcosa position={[-4, -2, -5]} color="#c77dff" speed={speed * 0.5} />
      <WireIcosa position={[0, -2, -3]} color="#00f5d4" speed={speed * 0.4} />

      {/* Neon rings */}
      <NeonRing position={[-3, 0, -6]} rotation={[0.5, 0, 0]} color="#f72585" speed={speed * 0.4} />
      <NeonRing position={[3, 2, -7]} rotation={[0, 0.5, 0.5]} color="#c77dff" speed={speed * 0.5} />
      <NeonRing position={[0, -3, -5]} rotation={[1, 0, 1]} color="#00f5d4" speed={speed * 0.3} />
    </>
  );
}

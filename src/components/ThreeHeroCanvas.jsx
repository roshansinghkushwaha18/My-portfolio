import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Neural Particle Network Cloud
function ParticleNetwork({ count = 650, reducedMotion }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#a855f7');
    const color3 = new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const radius = 3.2 + Math.random() * 4.8;

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);

      const mixed = Math.random() > 0.5 ? color1 : Math.random() > 0.5 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.065}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive 3D Cyber Avatar Head & Core Mesh that follows mouse
function Interactive3DAvatar({ mouse, reducedMotion }) {
  const avatarGroupRef = useRef();
  const eyeVisorRef = useRef();
  const neuralRingsRef = useRef();
  const jawRef = useRef();

  useFrame((state, delta) => {
    if (!avatarGroupRef.current) return;

    if (!reducedMotion) {
      // Smooth lerp orientation following mouse pointer
      const targetRotY = mouse.current.x * 0.55;
      const targetRotX = -mouse.current.y * 0.45;

      avatarGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        avatarGroupRef.current.rotation.y,
        targetRotY,
        0.06
      );
      avatarGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        avatarGroupRef.current.rotation.x,
        targetRotX,
        0.06
      );

      // Subtle breathing idle animation
      const breath = Math.sin(state.clock.elapsedTime * 1.8) * 0.04;
      avatarGroupRef.current.position.y = breath;
    }

    // Visor glow pulse
    if (eyeVisorRef.current) {
      const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      eyeVisorRef.current.material.emissiveIntensity = pulse;
    }

    // Orbital neural rings spinning
    if (neuralRingsRef.current && !reducedMotion) {
      neuralRingsRef.current.rotation.z += delta * 0.35;
      neuralRingsRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={avatarGroupRef} position={[0, 0.1, 0]}>
      {/* 3D Cyber Head Structure: Stylized Icosahedral Cranium */}
      <mesh position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Holographic Outer Shell */}
      <mesh position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
          emissive="#00f0ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cyber Visor / Eyes Array (Glows neon cyan) */}
      <mesh ref={eyeVisorRef} position={[0, 0.25, 0.95]}>
        <boxGeometry args={[1.1, 0.2, 0.25]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Secondary Cyber Neck / Collar */}
      <mesh ref={jawRef} position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.55, 0.75, 0.6, 16]} />
        <meshStandardMaterial
          color="#1e1b4b"
          metalness={0.85}
          roughness={0.25}
          wireframe={false}
        />
      </mesh>

      {/* Orbiting Neural Data Rings */}
      <group ref={neuralRingsRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.75, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.9, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}

// Camera Controller that moves with scroll depth
function ScrollCameraController({ scrollYProgress, isMobile, reducedMotion }) {
  useFrame(({ camera }) => {
    const baseZ = isMobile ? 6.2 : 5.0;
    if (reducedMotion) {
      camera.position.z = baseZ;
      return;
    }
    // As user scrolls, camera dollies closer and pans downward through scene
    const targetZ = baseZ - scrollYProgress.current * 1.8;
    const targetY = -scrollYProgress.current * 0.8;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
  });

  return null;
}

export default function ThreeHeroCanvas() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollYProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });

    // IntersectionObserver to suspend WebGL rendering when Hero is out of screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let mouseTicking = false;
    const handleMouseMove = (e) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = -(e.clientY / window.innerHeight) * 2 + 1;
          mouse.current = { x, y };
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const heroHeight = window.innerHeight;
          const currentScroll = window.scrollY;
          scrollYProgress.current = Math.min(Math.max(currentScroll / heroHeight, 0), 1);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Suspense fallback={null}>
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, isMobile ? 6.2 : 5.0], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          className="pointer-events-none"
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[8, 8, 8]} intensity={1.8} color="#00f0ff" />
          <pointLight position={[-8, -8, -8]} intensity={1.4} color="#a855f7" />
          <directionalLight position={[0, 4, 6]} intensity={1.0} color="#ffffff" />

          {/* Scroll-reactive camera */}
          <ScrollCameraController
            scrollYProgress={scrollYProgress}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />

          {/* 3D Interactive Cyber Avatar */}
          <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.4} floatIntensity={0.8}>
            <Interactive3DAvatar mouse={mouse} reducedMotion={reducedMotion} />
          </Float>

          {/* Neural Particle Cloud */}
          <ParticleNetwork count={isMobile ? 140 : 420} reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
}

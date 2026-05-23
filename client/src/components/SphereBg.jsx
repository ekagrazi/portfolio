import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Scroll progress tracker ────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // progress goes 0→1 over the first 100vh of scrolling
      const scrolled   = window.scrollY;
      const viewHeight = window.innerHeight;
      setProgress(Math.min(scrolled / viewHeight, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

// ── Disintegrating sphere mesh ─────────────────────────────────────────────
function WireframeSphere({ scrollProgress }) {
  const meshRef   = useRef(null);
  const pointsRef = useRef(null);
  const groupRef  = useRef(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 4), []);

  // Store original positions for disintegration
  const originalPositions = useMemo(() => {
    const pos = geometry.attributes.position;
    const arr = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count * 3; i++) arr[i] = pos.array[i];
    return arr;
  }, [geometry]);

  // Scatter directions — each vertex flies in a random direction
  const scatterDirections = useMemo(() => {
    const pos = geometry.attributes.position;
    const arr = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ).normalize();
      arr[i * 3]     = dir.x;
      arr[i * 3 + 1] = dir.y;
      arr[i * 3 + 2] = dir.z;
    }
    return arr;
  }, [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sp = scrollProgress; // 0 = intact, 1 = fully disintegrated

    // Rotate the group
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }

    // Scale down as sphere disintegrates
    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 - sp * 0.3);
    }

    // Scatter vertices
    if (meshRef.current && pointsRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        const dx = scatterDirections[i * 3];
        const dy = scatterDirections[i * 3 + 1];
        const dz = scatterDirections[i * 3 + 2];

        // Eased scatter — faster at start
        const ease = sp * sp;

        pos.array[i * 3]     = ox + dx * ease * 2.5;
        pos.array[i * 3 + 1] = oy + dy * ease * 2.5;
        pos.array[i * 3 + 2] = oz + dz * ease * 2.5;
      }
      pos.needsUpdate = true;

      // Mirror to points geometry
      const ppos = pointsRef.current.geometry.attributes.position;
      ppos.array.set(pos.array);
      ppos.needsUpdate = true;

      // Fade out materials
      if (meshRef.current.material) {
        meshRef.current.material.opacity = Math.max(0, 0.06 - sp * 0.07);
      }
      if (pointsRef.current.material) {
        pointsRef.current.material.opacity = Math.max(0, 0.3 - sp * 0.35);
      }
    }
  });

  const clonedGeometry = useMemo(() => geometry.clone(), [geometry]);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
      <points ref={pointsRef} geometry={clonedGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.018}
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ── Floating particles (fade out on scroll too) ───────────────────────────
function FloatingParticles({ count = 120, scrollProgress }) {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = clock.getElapsedTime() * 0.02;
      ref.current.material.opacity = Math.max(0, 0.25 - scrollProgress * 0.3);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.012}
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

// ── Exported canvas ───────────────────────────────────────────────────────
export default function SphereBg() {
  const scrollProgress = useScrollProgress();

  // On mobile — use simple gradient instead (performance)
  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)',
          zIndex: 0,
          opacity: Math.max(0, 1 - scrollProgress * 1.5),
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: Math.max(0, 1 - scrollProgress * 1.2),
        transition: 'opacity 0.1s linear',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <WireframeSphere scrollProgress={scrollProgress} />
        <FloatingParticles count={120} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

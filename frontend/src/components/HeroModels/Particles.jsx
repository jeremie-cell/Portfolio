
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 60 }) => {
  const meshRef = useRef(null);

  const { particles, positions } = useMemo(() => {
    const particles = [];
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      particles.push({
        speed: 0.003 + Math.random() * 0.002,
      });
    }

    return { particles, positions };
  }, [count]);

  useFrame(() => {
    const geometry = meshRef.current?.geometry;
    if (!geometry) return;

    const attribute = geometry.attributes.position;
    const array = attribute.array;

    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1;
      let y = array[yIndex] - particles[i].speed;

      if (y < -2) {
        y = Math.random() * 10 + 5;
      }

      array[yIndex] = y;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;

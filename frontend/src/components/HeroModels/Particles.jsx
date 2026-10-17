
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 60 }) => {
  const mesh = useRef();

  const { particles, positions } = useMemo(() => {
    const items = [];
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        Math.random() * 10 + 5,
        (Math.random() - 0.5) * 10,
      ];

      items.push({
        speed: 0.003 + Math.random() * 0.002,
      });

      array[i * 3] = position[0];
      array[i * 3 + 1] = position[1];
      array[i * 3 + 2] = position[2];
    }

    return {
      particles: items,
      positions: array,
    };
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;

    const positionAttribute =
      mesh.current.geometry.attributes.position;
    const array = positionAttribute.array;

    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1;
      let y = array[yIndex] - particles[i].speed;

      if (y < -2) {
        y = Math.random() * 10 + 5;
      }

      array[yIndex] = y;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
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

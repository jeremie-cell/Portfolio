
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { PC } from "./models/PC";

const ContactExperience = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.25]}
      camera={{
        position: isMobile ? [0, 2.5, 9] : [0, 3, 7],
        fov: isMobile ? 50 : 45,
      }}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: true,
      }}
    >
      <ambientLight intensity={0.7} color="#fff4e6" />

      <directionalLight
        position={[5, 5, 3]}
        intensity={2}
        color="#ffd9b3"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        enableDamping={!isMobile}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <group
          scale={isMobile ? 0.025 : 0.03}
          position={isMobile ? [0, -1, -2] : [0, -1.49, -2]}
        >
          <PC />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default ContactExperience;

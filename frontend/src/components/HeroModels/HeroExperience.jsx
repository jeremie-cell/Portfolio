
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={isMobile ? 1 : [1, 1.25]}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.2} color="#1a1a40" />

      <OrbitControls
        enablePan={!isMobile}
        enableZoom={!isMobile}
        enableRotate={!isMobile}
        enableDamping={!isMobile}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />

        <Particles count={isMobile ? 20 : 50} />

        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room enableBloom={!isMobile} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
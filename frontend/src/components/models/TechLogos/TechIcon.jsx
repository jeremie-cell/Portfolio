import { Suspense } from "react";
import {
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const fallbackIcons = {
  "React Frontend": "/images/logos/react.png",
  "Node Backend": "/images/logos/node.png",
  "Three.js 3D Interactive Model": "/images/logos/three.png",
  Tailwindcss: "/images/logos/tailwindcss.png",
  "Anime.js": "/images/logos/anime.png",
};

const TechIcon = ({ model }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const imagePath = model.imgPath || fallbackIcons[model.name];

  // Mobile: display a static image instead of a 3D canvas.
  if (isMobile) {
    return (
      <div className="tech-icon-fallback">
        {imagePath ? (
          <img
            src={imagePath}
            alt={model.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span>{model.name}</span>
        )}
      </div>
    );
  }

  // Desktop: keep the interactive 3D model.
  return (
    <div className="tech-icon-canvas">
      <Suspense
        fallback={
          <div
            className="tech-icon-loading"
            aria-label={`Loading ${model.name}`}
          />
        }
      >
        <TechIcon3D model={model} />
      </Suspense>
    </div>
  );
};

const TechIcon3D = ({ model }) => {
  const { scene } = useGLTF(model.modelPath);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
    >
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
      />

      <Suspense fallback={null}>
        <Environment preset="city" />

        <Float
          speed={2}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <group
            scale={model.scale}
            rotation={model.rotation}
          >
            <primitive object={scene} />
          </group>
        </Float>
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
      />
    </Canvas>
  );
};

export default TechIcon;

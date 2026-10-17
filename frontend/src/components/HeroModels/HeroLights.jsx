import React from 'react'
import * as THREE from 'three';

const HeroLights = () => {
  return (
    <>
      <spotLight
        position={[2, 5, 6]}
        angle={0.15}
        intensity={100}
        penumbra={0.2}
        color="white"
      />

      <spotLight
        position={[4, 5, 4]}
        angle={0.3}
        intensity={30}
        penumbra={0.5}
        color="#4cc9f0"
      />

      <spotLight
        position={[-3, 5, 5]}
        angle={0.4}
        intensity={35}
        penumbra={1}
        color="#9d4edd"
      />

      <ambientLight intensity={0.15} color="#1a1a40" />
    </>
  );
};

export default HeroLights;

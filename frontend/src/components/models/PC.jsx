import React from 'react'
import { useGLTF } from '@react-three/drei'

export function PC(props) {
  const { nodes, materials } = useGLTF('/models/PC-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.001']} position={[-3.726, 97.74, 37.858]} rotation={[-0.117, 0, 0]} scale={[13.388, 9.793, 2.12]} />
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube000_ComputerDesk_0001_1.geometry} material={materials['ComputerDesk.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube000_ComputerDesk_0001_2.geometry} material={materials['FloppyDisk.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/PC-transformed.glb')

import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { useRef, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import statue from "../assets/statue.gltf";

function Floor(props) {
    return (
      <mesh {...props} recieveShadow={true}>
        <boxBufferGeometry args={[20,1,10]} />
        <meshPhysicalMaterial color='white' />
      </mesh>
    );
  }

  function Box(props) {
    const gltf = GLTFLoader();
    gltf.load(statue, (gltfscene) => {
      return gltfscene.scene;
    })
  }

export default function Statue(props){

    

    return (
        <Canvas
            shadows={true}
            camera={{
            position: [-6, 7, 7],
            }}>
                {
                  Box()
                }
                <ambientLight color={"white"} intensity={0.3} />
                <Floor />
        </Canvas>
    )

}


import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export function Camera()
{
  const camera = useRef();
    return (
        <perspectiveCamera
          ref={camera}
          fov={30}
          aspect={ window.innerWidth / window.innerHeight}
          near={0.1}
          far={100}
          position={[0, 4, 10]}
        />
    );
}

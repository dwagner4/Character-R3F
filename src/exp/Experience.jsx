import { useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Sky, ContactShadows } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Knight } from '../models/knight/Knight.jsx'
import { useControls } from "leva";
import { useEffect, Vector3 } from "react";

export const Experience = () => {
  
  const {animation, headFollow, cursorFollow, wireframe, Camx} = useControls({
    animation: {
      value: "Run",
      options: [
        "Run", 
        "BackRun", 
        "Jump",
        "Impact",
        "ShieldBlock",
        "ShieldImpact",
        "ShieldTurn",
        "Slash",
      ]
    },
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
    Camx: 5,
  })

  const {camera} = useThree();
  console.log(camera)

  useEffect(() => {
    console.log(camera)
    if (camera) {
      camera.position.set(Camx, 2, 10);
      camera.lookAt(0,0,0)
    }
    
    
  }, [Camx])

  return (
    <>
      {/* <OrbitControls /> */}
      <Cube position={[ -1, 0.5, -2]} tag="Joe" fsm="shapeRef1" friend="shapeRef2"/>
      <Cube position={[ 1, 0.5, -2]} tag = "fart" fsm="shapeRef2" friend="shapeRef1"/>
      <Sky />
      <Environment preset="sunset" />
      <ambientLight intensity={5} />
      
      <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={0.001}>
        <planeGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
       
      <Knight animation={animation} headfollow={headFollow} cursorfollow={cursorFollow} wireframe={wireframe} />
    </>
  );
};
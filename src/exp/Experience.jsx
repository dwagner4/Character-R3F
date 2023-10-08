import { Environment, OrbitControls, Sky, ContactShadows } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Knight } from '../models/knight/Knight.jsx'
import { useControls } from "leva";

export const Experience = () => {
  const {animation, headFollow, cursorFollow, wireframe} = useControls({
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
      ]
    },
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  })
  return (
    <>
      <OrbitControls />
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
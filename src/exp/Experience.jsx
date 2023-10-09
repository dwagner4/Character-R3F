import { Environment, Sky } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Knight } from '../models/knight/Knight.jsx'
import { useControls } from "leva";
import { FollowCamera } from '../components/FollowCamera.jsx'

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

  return (
    <>
      {/* <OrbitControls /> */}
      <Cube position={[ -1, 0.5, -2]} tag="Joe" fsm="shapeRef1" friend="shapeRef2"/>
      <Cube position={[ 1, 0.5, -2]} tag = "fart" fsm="shapeRef2" friend="shapeRef1"/>
      <Sky />
      <Environment preset="sunset" />
      <ambientLight intensity={5} />
      <FollowCamera camx={Camx} />
      
      <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={0.001}>
        <planeGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
       
      <Knight animation={animation} headfollow={headFollow} cursorfollow={cursorFollow} wireframe={wireframe} />
    </>
  );
};
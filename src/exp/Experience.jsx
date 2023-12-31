import { Environment, Sky } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Knight } from '../models/knight/Knight.jsx'
import { useControls } from "leva";
import { FollowCamera } from '../components/FollowCamera.jsx'
import { AppContext } from '../App.jsx'
import { KeyboardControls1 } from "./KeyboardControls1.jsx";
import { OrbitControls } from '@react-three/drei'


export const Experience = () => {

  const {animation, headFollow, cursorFollow, wireframe, Camx} = useControls({
    animation: {
      value: "Idle",
      options: [
        "Idle",
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
      <KeyboardControls1 activekeys={{ KeyA: false, KeyD: false, KeyS: false, KeyW: false }}/>

      <OrbitControls makeDefault />

      
      <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={0.001}>
        <planeGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
       
      <Knight animation={animation} headfollow={headFollow} cursorfollow={cursorFollow} wireframe={wireframe} />
    </>
  );
};
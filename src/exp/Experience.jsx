import { Environment, OrbitControls, Sky, ContactShadows } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Avatar } from '../models/avatar/Avatar.jsx'
import { useControls } from "leva";

export const Experience = () => {
  const {animation} = useControls({
    animation: {
      value: "Typing",
      options: ["Typing", "Falling", "Standing"]
    }
  })
  return (
    <>
      <OrbitControls />
      <Cube position={[ -1, 0, -2]} tag="Joe" fsm="shapeRef1" friend="shapeRef2"/>
      <Cube position={[ 1, 0, -2]} tag = "fart" fsm="shapeRef2" friend="shapeRef1"/>
      <Sky />
      <Environment preset="sunset" />
      <group position-y={-1}>
        <ContactShadows opacity={1.0} scale={10} blur={1} far={10} resolution={256} color="#000000" />
        <Avatar animation={animation} />
        {animation === "Typing" && (
          <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25} >
            <boxGeometry />
            <meshStandardMaterial color="white" />
          </mesh>
        )}
        
        <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={0.001}>
          <planeGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      {/* <ambientLight intensity={1} /> */}
    </>
  );
};
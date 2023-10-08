import {useRef} from 'react'
import { AppContext } from '../App.jsx'
import { assign } from 'xstate';
import { useFrame } from '@react-three/fiber';

export const Cube = ({position, tag, fsm, friend}) => {

    // const appActor = AppContext.useActorRef()

    const friendRef = AppContext.useSelector((state) => state.context[friend])
    const fsmRef = AppContext.useSelector((state) => state.context[fsm])

    console.log(fsmRef.state.context)
    // const cubeActor = fsmRef.useActor()

    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * fsmRef.state.context.cubespin
    })
    

    const clickhandler = () => {
        // appActor.send({ type: "LOGIN" })
        friendRef.send( {type: 'CLK'} )

    }

    return (
        <mesh onClick={clickhandler} ref={cube} position={position}>
          <meshNormalMaterial />
          <boxBufferGeometry />
        </mesh>
    );
};

export const cubeLogic = {
    predictableActionArguments: true,
    id: 'cubeFSM',
    initial: 'idle',
    context: {
        cubespin: 0,
    },
    states: {
        idle: { 
            on: {
                CLK: {
                    target: "slow",
                    actions: [ (ctx, evt) => console.log( ctx, evt ), assign( {cubespin: 1} ) ]
                }
            }
        },
        slow: {
            on: {
                CLK: {target: "fast", 
                    actions: [ (ctx, evt) => console.log( ctx, evt ), assign( {cubespin: 2}) ]
                }
            }
        },
        fast:{
            on: {
                CLK: {target: "idle", 
                    actions: [ (ctx, evt) => console.log( ctx, evt ), assign( {cubespin: 0}) ]
                }
            }
        },
    }
}
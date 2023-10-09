import './App.css';
import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./exp/Experience";
import { HeadsUp } from "./components/headsup/HeadsUp.jsx"
import { Menu } from './components/menu/Menu.jsx'
// import { Camera } from './components/Camera'

import * as React from 'react';
import { appMachine } from './appMachine.js'
import { createActorContext } from '@xstate/react'

import { useControls } from "leva";


export const AppContext = createActorContext(appMachine)

function App() {
  
  return (
    <AppContext.Provider>
      <Canvas shadows camera={{ position: [4, 0, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Menu />
      <HeadsUp />
    </AppContext.Provider>
  );
}

export default App;

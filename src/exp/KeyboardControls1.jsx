
import { useEffect, useState, useRef } from "react";

import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'
import { useFrame } from "@react-three/fiber";

import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react'


export function KeyboardControls1() 
{  
  const [ state, send ] = AppContext.useActor()

  const [localstate, localsend] = useMachine( () => createMachine({
    "id": "knight",
    "context": { mystuff: 100},
    "initial": "idle",
    "context": {
      "keyA": 0,
      "keyD": 0,
      "keyW": 0,
      "keyS": 0,
    },
    "states": {
      idle: {}
    },
    on: {
      "keyA": {"actions": [assign({ keyA: 1000 })]},
      "Adown": {"actions": [ assign({ keyA: (context, event) => context.keyA - 50, })]},
      "keyD": {"actions": [assign({ keyD: 1000 }), ]},
      "Ddown": {"actions": [ assign({ keyD: (context, event) => context.keyD - 50, }) ]},
      "keyW": {"actions": [assign({ keyW: 1000 }),]},
      "Wdown": {"actions": [ assign({ keyW: (context, event) => context.keyW - 50, }) ]},
      "keyS": {"actions": [assign({ keyS: 1000 }),]},
      "Sdown": {"actions": [ assign({ keyS: (context, event) => context.keyS - 50, }) ]},
    },
    "predictableActionArguments": true,
    "preserveActionOrder": true
  }, {
    actions: {"getActorData": ({ context, event }) => {},
                "toggleColor": assign({
                  color: ( context, event ) => context.color = context.color == "blue" ? 'red' : "blue"
                }),
                "logit": ( context, event ) => console.log(event),
                "logA": (context, evnet) => console.log(context)
              },
      actors: {},
      guards: {},
      delays: {},
  }))

  const keyDownFunc = (e) => {
      var name = e.code;
      if (name === "KeyA") {localsend({ type: "keyA" })}
      if (name === "KeyD") {localsend({ type: "keyD" })}
      if (name === "KeyW") {localsend({ type: "keyW" })}
      if (name === "KeyS") {localsend({ type: "keyS" })}
      console.log(name)
  };  


  useEffect(() => {
    document.addEventListener('keydown', keyDownFunc, true)
    // document.addEventListener('mousemove', (e) => console.log(e), true)
  }, [])

  useFrame(() => {
    // console.log(state.context)
    if (localstate.context.keyA > 0 ) { localsend({ type: "Adown" });} 
    if (localstate.context.keyD > 0 ) { localsend({ type: "Ddown" }) } 
    if (localstate.context.keyW > 0 ) { localsend({ type: "Wdown" }) } 
    if (localstate.context.keyS > 0 ) { localsend({ type: "Sdown" }) } 
    console.log(localstate.context.keyA, localstate.context.keyS, localstate.context.keyW, localstate.context.keyD)
    
  })

    return ( <></> )
}
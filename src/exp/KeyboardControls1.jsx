
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
      "keyA": false,
      "keyD": false,
      "keyW": false,
      "keyS": false,
    },
    "states": {
      idle: {}
    },
    on: {
      "keyA": {"actions": [assign({ keyA: true })]},
      "Adown": {"actions": [ assign({ keyA: false})]},
      "keyD": {"actions": [assign({ keyD: true }), ]},
      "Ddown": {"actions": [ assign({ keyD: false})]},
      "keyW": {"actions": [assign({ keyW: true }),]},
      "Wdown": {"actions": [ assign({ keyW: false})]},
      "keyS": {"actions": [assign({ keyS: true }),]},
      "Sdown": {"actions": [ assign({ keyS: false})]},
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
      if (name === "KeyA") {
        if (!localstate.context.keyA){
          localsend({ type: "keyA" })
        }
      }
      if (name === "KeyD") {
        if (!localstate.context.keyD){
          localsend({ type: "keyD" })
        }
      }
      if (name === "KeyS") {
        if (!localstate.context.keyS){
          localsend({ type: "keyS" })
        }
      }
      if (name === "KeyW") {
        if (!localstate.context.keyW){
          localsend({ type: "keyW" })
        }
      }
      // console.log(name, "down")
  };  

  const keyUpFunc = (e) => {
    var name = e.code;
    if (name === "KeyA") {localsend({ type: "Adown" })}
    if (name === "KeyD") {localsend({ type: "Ddown" })}
    if (name === "KeyW") {localsend({ type: "Wdown" })}
    if (name === "KeyS") {localsend({ type: "Sdown" })}
    // console.log(name, "up")
};  


  useEffect(() => {
    document.addEventListener('keydown', keyDownFunc, true)
    document.addEventListener('keyup', keyUpFunc, true)
    // document.addEventListener('mousemove', (e) => console.log(e), true)
  }, [])

  useEffect(() => {
    console.log("Fuck You")
  }, [localstate.context])

  useFrame(() => {
    // console.log(state.context)
    // if (localstate.context.keyA > 0 ) { localsend({ type: "Adown" });} 
    // if (localstate.context.keyD > 0 ) { localsend({ type: "Ddown" }) } 
    // if (localstate.context.keyW > 0 ) { localsend({ type: "Wdown" }) } 
    // if (localstate.context.keyS > 0 ) { localsend({ type: "Sdown" }) } 
    console.log(localstate.context.keyA, localstate.context.keyS, localstate.context.keyW, localstate.context.keyD)
    
  })

    return ( <></> )
}
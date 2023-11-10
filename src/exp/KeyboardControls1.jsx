
import { useEffect, useState, useRef } from "react";
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react'

import { AppContext } from '../App.jsx'

export function KeyboardControls1() 
{  
  const [ state, send ] = AppContext.useActor()

  const [localstate, localsend] = useMachine( () => createMachine({
    "id": "knight",
    "context": { mystuff: 100},
    "initial": "idle",
    "context": {
      "KeyA": false,
      "KeyD": false,
      "KeyW": false,
      "KeyS": false,
    },
    "states": {
      idle: {}
    },
    on: {
      "KeyA": {"actions": [assign({ KeyA: true })]},
      "Adown": {"actions": [ assign({ KeyA: false})]},
      "KeyD": {"actions": [assign({ KeyD: true }), ]},
      "Ddown": {"actions": [ assign({ KeyD: false})]},
      "KeyW": {"actions": [assign({ KeyW: true }),]},
      "Wdown": {"actions": [ assign({ KeyW: false})]},
      "KeyS": {"actions": [assign({ KeyS: true }),]},
      "Sdown": {"actions": [ assign({ KeyS: false})]},
    },
    "predictableActionArguments": true,
    "preserveActionOrder": true
  }, ))

  const KeyDownFunc = (e) => {
    const name = e.code;
    if (!localstate.context[name]) {
       localsend({ type: name })
    }
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
    document.addEventListener('keydown', KeyDownFunc, true)
    document.addEventListener('keyup', keyUpFunc, true)
    // document.addEventListener('mousemove', (e) => console.log(e), true)
  }, [])

  useEffect(() => {
    // console.log( localstate.context)
    send({type: "KEYBOARD", data: localstate.context})
  }, [
    localstate.context.KeyA,
    localstate.context.KeyD,
    localstate.context.KeyW,
    localstate.context.KeyS,
  ])

    return ( <></> )
}
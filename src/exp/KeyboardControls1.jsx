
import { useEffect, useState, useRef } from "react";
import { createMachine, assign } from 'xstate';
import { useMachine, useActorRef } from '@xstate/react'

import { AppContext } from '../App.jsx'

export function KeyboardControls1({ activekeys }) 
{  
  // const keyarray = Object.keys(activekeys)
  // console.log(keyarray)
  
  const appActor = AppContext.useActorRef()

  const [localstate, localsend] = useMachine( () => createMachine({
    "id": "knight",
    "context": { mystuff: 100},
    "initial": "idle",
    "context": {
      "keys": activekeys,
    },
    "states": {
      idle: {}
    },
    on: {
      "keydn": {"actions": [
        // (context, event) => console.log(context),
        assign((context, event) => {
          const temp = context.keys
          temp[event.data.name] = true
          appActor.send({type: "KEYBOARD", data: temp})
          return {
            keys: temp
          }
        }),
      ]},
      "keyup": {"actions": [
        // (context, event) => console.log(context),
        assign((context, event) => {
          const temp = context.keys
          temp[event.data.name] = false
          appActor.send({type: "KEYBOARD", data: temp })
          return {
            keys: temp
          }
        }),
      ]},
    },
    "predictableActionArguments": true,
    "preserveActionOrder": true
  }, ))

  const KeyDownFunc = (e) => {
    const name = e.code;
    if (localstate.context.keys[name] === false) {
      localsend({ type: "keydn", data: {name: name} }) 
   }
  };  

  const keyUpFunc = (e) => {
    var name = e.code;
    if (localstate.context.keys[name] === true) {
      localsend({ type: "keyup", data: {name: name} })
   }
};  


  useEffect(() => {
    document.addEventListener('keydown', KeyDownFunc, true)
    document.addEventListener('keyup', keyUpFunc, true)
    // document.addEventListener('mousemove', (e) => console.log(e), true)
  }, [])

    return ( <></> )
}
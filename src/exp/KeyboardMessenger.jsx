import { useEffect, useState } from "react";

import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'


export function KeyboardMessenger() 
{
  const [k, setK] = useState("a")
    const [ state, send ] = AppContext.useActor()

    useEffect(() => {
      document.addEventListener('keydown', yoho, true)
    }, [])

    const yoho = (e) => {
        var name = e.key;
        // console.log(name, k)g
        if (!name == state.context.keys) {
          console.log("new K", name, state.context.keys)
          setK(name)
          send({ type: "keydown", key:name })
          
        } else {
          console.log("same K", name, state.context.keys)
        }
        
    };

    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        e.stopPropagation();
        var name = e.key;
        send({ type: "keydown", key:name })
    });

      return ( <></> )
}
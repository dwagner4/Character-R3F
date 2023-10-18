import { useEffect, useState } from "react";

import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'
import { useFrame } from "@react-three/fiber";


export function KeyboardDebouncer() 
{  

    const [ state, send ] = AppContext.useActor()

    const keyDownFunc = (e) => {
        var name = e.key;
        if (name === "a") {send({ type: "keyA" })}
        if (name === "d") {send({ type: "keyD" })}
        if (name === "w") {send({ type: "keyW" })}
        if (name === "s") {send({ type: "keyS" })}
    };

    useEffect(() => {
      document.addEventListener('keydown', keyDownFunc, true)
    }, [])

    useFrame(() => {
      // console.log(state.context)
      if (state.context.keyA > 0 ) { send({ type: "Adown" }) } 
      if (state.context.keyD > 0 ) { send({ type: "Ddown" }) } 
      if (state.context.keyW > 0 ) { send({ type: "Wdown" }) } 
      if (state.context.keyS > 0 ) { send({ type: "Sdown" }) } 
      // console.log(state.context.keyA, state.context.keyD, state.context.keyW, state.context.keyS,)
      
    })

    return ( <></> )
}
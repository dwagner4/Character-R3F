import * as React from 'react'
import { AppContext } from '../../App.jsx'
import {CountPanel} from './CountPanel.jsx'

export function HeadsUp(props) {   
  const [ state ] = AppContext.useActor()

  const handleClick = () => {
    console.log(state.value)
    console.log(state.context.cubeRef)
    state.context.cubeRef.send({ type: "CLK" })
  }

  return (
    <div id="nda">
      {/* <Auth /> */}
      <button onClick={handleClick}>Click Me</button>
      < CountPanel />

    </div>
  )
}
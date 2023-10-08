import * as React from 'react'
import { AppContext } from '../../App.jsx'

const handleClick = () => {
    console.log("Fucking coutnPanel")
}

const CountPanel = () => {
    return (
        <div>
            <button onClick={handleClick}>INC</button>
            <span>    {3}</span>
        </div>
    )
}

export { CountPanel }
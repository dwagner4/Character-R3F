import * as React from 'react'
import { AppContext } from '../../App.jsx'
import { useMachine } from '@xstate/react'
import {createMachine} from 'xstate'


const Menu = () => {

    const appActor = AppContext.useActorRef()
    const yoColor = AppContext.useSelector( (state) => state.context.color )
    const [state, send] = useMachine( () => createMachine({
        "id": "demo-menu",
        "context": { mystuff: 100},
        "initial": "zero",
        "states": {
            "zero": {
            "on": {
                "inc": {
                "target": "one"
                }
            }
            },
            "one": {
            "on": {
                "inc": {
                "target": "two"
                }
            }
            },
            "two": {
            "on": {
                "inc": {
                "target": "three"
                }
            }
            },
            "three": {
            "description": "Highest count, reset after 3 seconds",
            "entry": {
                "params": {},
                "type": "tellParent"
            },
            "after": {
                "3000": {
                "target": "#demo-menu.zero",
                "actions": [],
                "internal": false
                }
            }
            }
        },
        "predictableActionArguments": true,
        "preserveActionOrder": true
    }, {
        actions: {"tellParent": (context, event) => { appActor.send({ type: 'toggleColor' });}},
        services: {},
        guards: {},
        delays: {},
    }))

    return (
        <div id="menu" style={{ backgroundColor: yoColor }}>
            <button onClick={() => send({type: 'inc'})}>INC</button>
            <span>  I am A MENU, {state.value}</span>
        </div>
    )
}

export { Menu }
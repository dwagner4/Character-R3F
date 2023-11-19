import { createMachine, assign, spawn } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'
import { knightLogic, knightFunctions } from './models/knight/Knight.jsx'
import { keys } from 'xstate/lib/utils.js';

const cubeMachine1 = createMachine( cubeLogic )
const cubeMachine2 = createMachine( cubeLogic )
const knightMachine = createMachine( knightLogic, knightFunctions)

export const appMachine = createMachine({
  predictableActionArguments: true,
  "id": "appMachine",
  "context": {
    "message": "no message",
    "shapeRef1": null,
    "shapRef2": null,
    "knightRef": null,
    "count": 0,
    "color": "#ff8800",
    "keyA": 0,
    "keyD": 0,
    "keyW": 0,
    "keyS": 0,
  },
  "initial": "home",
  "states": {
    "home": {
      entry: [
        assign({
          shapeRef1: () => spawn(cubeMachine1),
        }),
        assign({
          shapeRef2: () => spawn(cubeMachine2),
        }),
        assign({
          knightRef: () => spawn(knightMachine ),
        }),
      ],
      "on": {
        "menu.loading": {
          "target": "loading"
        }
      }
    },
    "loading": {
      "after": {
        "3000": {
          "target": "#appMachine.play",
          "actions": [],
          "internal": false
        }
      }
    },
    "play": {
      "on": {
        "menu.home": {
          "target": "home"
        }
      }
    }
  },
  "on": {
    "toggleColor": {
      "actions": {
        "params": {},
        "type": "toggleColor"
      }
    },
    "getSnapShots": {
      "actions": {
        "params": {},
        "type": "logit"
      }
    },
    "KEYBOARD": {actions: [
      (context, event) => context.knightRef.send( {type: 'KEYBOARD', data: event.data} )
    ]},
  }
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
    })


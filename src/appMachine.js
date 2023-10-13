import { createMachine, assign, spawn } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'
import { keys } from 'xstate/lib/utils.js';

const cubeMachine1 = createMachine( cubeLogic )
const cubeMachine2 = createMachine( cubeLogic )

export const appMachine = createMachine({
  predictableActionArguments: true,
  "id": "appMachine",
  "context": {
    "message": "no message",
    "shapeRef1": null,
    "shapRef2": null,
    "count": 0,
    "color": "#ff8800",
    keys: "q",
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
    "keydown": {
      "actions": [
        "changeKey",
        // "logit"
      ]
    },
    "keyup": {
      "actions": [
        "changeKey",
        // "logit"
      ]
    },
    "getSnapShots": {
      "actions": {
        "params": {},
        "type": "logit"
      }
    }
  }
}, {
      actions: {"getActorData": ({ context, event }) => {},
                "toggleColor": assign({
                  color: ( context, event ) => context.color = context.color == "blue" ? 'red' : "blue"
                }),
                "changeKey": assign({
                  keys: (context, event) => event.key
                }),
                "logit": (ctx, e) => console.log(ctx.keys, e)
              },
      actors: {},
      guards: {},
      delays: {},
    })


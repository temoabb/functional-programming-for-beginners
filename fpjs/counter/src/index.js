import hh from "hyperscript-helpers";
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h); // returns an object with properties for all the tag writing functions

const initValue = 0;

function view(dispatch, state) {
  return (
    div([
      div({ className: "mv2" }, `Count: ${state}`),
      button(
        {
          className: "pv1 ph2 mr2",
          onclick: () => dispatch(MSGS.ADD)
        },
        "+"
      ),
      button(
        {
          className: "pv1 ph2",
          onclick: () => dispatch(MSGS.SUBTRACT)
        },
        "-"
      ),
    ])
  );
}

function update(msg, state) {
  switch (msg) {
    case MSGS.ADD:
      return state + 1;
    case MSGS.SUBTRACT:
      return state - 1;
    default:
      return state;
  }
}


const MSGS = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
};


// impure code below

function app(initValue, update, view, node) {
  let state = initValue;
  let currentView = view(dispatch, state); // returns div
  let rootNode = createElement(currentView);
  console.log('dsd')
  node.appendChild(rootNode); // this line is interacting with the dom causing side effect, showing the initial app view

  function dispatch(msg) {
    console.log('dasdsa')
    state = update(msg, state); // returns state value + 1 or - 1
    const updatedView = view(dispatch, state); // returns div with new state
    const patches = diff(currentView, updatedView); // determining exactly what changed between last view and new updated view that needs to render
    rootNode = patch(rootNode, patches);

    // node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");

app(initValue, update, view, rootNode);

// rootNode.appendChild(view(update("minus", initValue))); // update('plus', initValue) returns a number;


// Rendering things in the browser is an expensive task. All dom nodes are heavyweight and are expensive to create and to destroy;
import h from "hyperscript";
import hh from "hyperscript-helpers";

const { div, button } = hh(h); // returns an object with properties for all the tag writing functions
const initModel = 0;

function view(model) {
  return div([
    div({ className: "mv2" }, `Count: ${model}`),
    button(
      { className: "pv1 ph2 mr2", onclick: () => console.log("+ clicked!") },
      "+"
    ),
    button(
      { className: "pv1 ph2", onclick: () => console.log("- clicked!") },
      "-"
    ),
  ]);
}

function update(msg, model) {
  switch (msg) {
    case "plus":
      return model + 1;
    case "minus":
      return model - 1;
    default:
      return model;
  }
}

// impure code below
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(model);
  node.appendChild(currentView); // this line is interacting with the dom causing side effect, showing the initial app view

  model = update(msg, model);
  currentView = view(model);
}

const rootNode = document.getElementById("app");

app(initModel, update, view, rootNode);

// rootNode.appendChild(view(update("minus", initModel))); // update('plus', initModel) returns a number;

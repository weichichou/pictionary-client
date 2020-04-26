import { combineReducers } from "redux";

const initialState = "rainbow";
function questionReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

function guessReducer(state = null, action) {
  switch (action.type) {
    case "GUESSED": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

// put checkanswer login here
function hintReducer(state = initialState.split("").map((e) => "_ "), action) {
  switch (action.type) {
    case "HINT": {
      const newState = [...state];
      initialState.split("").forEach((element, index) => {
        if (action.payload.includes(element)) {
          newState[index] = element;
        }
      });
      /* const newState = [...state];
      newState[action.payload.index] = action.payload.element; */

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  question: questionReducer,
  guess: guessReducer,
  hint: hintReducer,
});

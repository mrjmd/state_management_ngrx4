import {Action} from "../actions/actions";
import {AppState} from "../models/model";

// reducer
export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TALKS_UPDATED': {
      return {...state, ...action.payload};
    }
    case  'TALK_UPDATED': {
      const recipes = {...state.recipes};
      recipes[action.payload.id] = action.payload;
      return {...state, recipes};
    }
    default: {
      return state;
    }
  }
}
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
    case 'RATE': {
      const recipes = {...state.recipes};
      recipes[action.payload.recipeId].rating = action.payload.rating;
      return {...state, recipes};
    }
    case 'UNRATE': {
      const recipes = {...state.recipes};
      recipes[action.payload.recipeId].rating = null;
      return {...state, recipes};
    }
    case 'TALK_WATCHED': {
      const watched = {...state.watched};
      watched[action.payload.recipeId] = true;
      return {...state, watched};
    }
    default: {
      return state;
    }
  }
}
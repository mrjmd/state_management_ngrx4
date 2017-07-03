import {RouterAction} from '@ngrx/router-store';

import {Recipe} from "../models/recipe.model";
import {Filters, State} from "../models/model";

// actions
export type RecipesUpdated = { type: 'TALKS_UPDATED', payload: { recipes: { [id: number]: Recipe }, list: number[] }, filters: Filters };
export type RecipeUpdated = { type: 'TALK_UPDATED', payload: Recipe };
export type Watch = { type: 'WATCH', payload: { recipeId: number } };
export type RecipeWatched = { type: 'TALK_WATCHED', payload: { recipeId: number } };
export type Rate = { type: 'RATE', payload: { recipeId: number, rating: number } };
export type Unrate = { type: 'UNRATE', payload: { recipeId: number, error: any } };

export type Action = RouterAction<State> | RecipesUpdated | RecipeUpdated | Watch | RecipeWatched | Rate | Unrate;
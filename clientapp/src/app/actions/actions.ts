import {RouterAction} from '@ngrx/router-store';

import {Recipe} from "../models/recipe.model";
import {Filters, State} from "../models/model";

// actions
export type RecipesUpdated = { type: 'TALKS_UPDATED', payload: { recipes: { [id: string]: Recipe }, list: string[] }, filters: Filters };
export type RecipeUpdated = { type: 'TALK_UPDATED', payload: Recipe };
export type Watch = { type: 'WATCH', payload: { recipeId: string } };
export type RecipeWatched = { type: 'TALK_WATCHED', payload: { recipeId: string } };
export type Rate = { type: 'RATE', payload: { recipeId: string, rating: number } };
export type Unrate = { type: 'UNRATE', payload: { recipeId: string, error: any } };

export type Action = RouterAction<State> | RecipesUpdated | RecipeUpdated | Watch | RecipeWatched | Rate | Unrate;
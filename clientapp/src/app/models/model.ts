import {RouterAction, ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Actions, Effect} from '@ngrx/effects';
import {WatchService} from "app/watch";
import {Backend} from "app/backend";
import {Params, ActivatedRouteSnapshot} from "@angular/router";
import {Store, combineReducers} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/withLatestFrom';

import {Recipe} from './recipe.model';

export type Recipe = Recipe;
export type Filters = { speaker: string, title: string, minRating: number };
export type AppState = { recipes: { [id: number]: Recipe }, list: number[], filters: Filters, watched: { [id: number]: boolean } };
export type State = { app: AppState }; // this will also contain router state

export const initialState: State = {
  app: {
    filters: {speaker: "", title: "", minRating: 0},
    recipes: {},
    list: [],
    watched: {}
  }
};

// actions
export type RecipesUpdated = { type: 'TALKS_UPDATED', payload: { recipes: { [id: number]: Recipe }, list: number[] }, filters: Filters };
export type RecipeUpdated = { type: 'TALK_UPDATED', payload: Recipe };
export type Watch = { type: 'WATCH', payload: { recipeId: number } };
export type RecipeWatched = { type: 'TALK_WATCHED', payload: { recipeId: number } };
export type Rate = { type: 'RATE', payload: { recipeId: number, rating: number } };
export type Unrate = { type: 'UNRATE', payload: { recipeId: number, error: any } };
type Action = RouterAction<State> | RecipesUpdated | RecipeUpdated | Watch | RecipeWatched | Rate | Unrate;

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

@Injectable()
export class RecipesEffects {
  @Effect() navigateToRecipes = this.handleNavigation('recipes', (r: ActivatedRouteSnapshot) => {
    const filters = createFilters(r.params);
    return this.backend.findRecipes(filters).map(resp => ({type: 'TALKS_UPDATED', payload: {...resp, filters}}));
  });

  @Effect() navigateToRecipe = this.handleNavigation('recipe/:id', (r: ActivatedRouteSnapshot, state: State) => {
    const id = +r.paramMap.get('id');
    if (! state.app.recipes[id]) {
      return this.backend.findRecipe(+r.paramMap.get('id')).map(resp => ({type: 'TALK_UPDATED', payload: resp}));
    } else {
      return of();
    }
  });

  @Effect() rateRecipe = this.actions.ofType('RATE').
    switchMap((a: Rate) => {
      return this.backend.rateRecipe(a.payload.recipeId, a.payload.rating).switchMap(() => of()).catch(e => {
        console.log('Error', e);
        return of({type: 'UNRATE', payload: {recipeId: a.payload.recipeId}});
      });
    });

  @Effect() watchRecipe = this.actions.ofType('WATCH').
    map((a: Watch) => {
      this.watch.watch(a.payload.recipeId);
      return {type: 'TALK_WATCHED', payload: a.payload};
    });

  constructor(private actions: Actions, private store: Store<State>, private backend: Backend, private watch: WatchService) {
  }

  private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: State) => Observable<any>) {
    const nav = this.actions.ofType(ROUTER_NAVIGATION).
      map(firstSegment).
      filter(s => s.routeConfig.path === segment);

    return nav.withLatestFrom(this.store).switchMap(a => callback(a[0], a[1])).catch(e => {
      console.log('Network error', e);
      return of();
    });
  }
}


function firstSegment(r: RouterNavigationAction) {
  return r.payload.routerState.root.firstChild;
}


function createFilters(p: Params): Filters {
  return {speaker: p['speaker'] || null, title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0};
}

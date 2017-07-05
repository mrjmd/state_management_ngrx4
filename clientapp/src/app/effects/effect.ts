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
import {State, Filters} from "../models/model";
import {Rate, Watch} from "../actions/actions";

@Injectable()
export class RecipesEffects {
  @Effect() navigateToRecipes = this.handleNavigation('recipes', (r: ActivatedRouteSnapshot) => {
    const filters = createFilters(r.params);
    return this.backend.findRecipes(filters).map(resp => ({type: 'TALKS_UPDATED', payload: {...resp, filters}}));
  });

  @Effect() navigateToRecipe = this.handleNavigation('recipe/:id', (r: ActivatedRouteSnapshot, state: State) => {
    const id = r.paramMap.get('id');
    if (! state.app.recipes[id]) {
      return this.backend.findRecipe(r.paramMap.get('id')).map(resp => ({type: 'TALK_UPDATED', payload: resp}));
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

function createFilters(p: Params): Filters {
  return {title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0};
}


function firstSegment(r: RouterNavigationAction) {
  return r.payload.routerState.root.firstChild;
}

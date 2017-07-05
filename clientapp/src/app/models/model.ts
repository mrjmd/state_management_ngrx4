import {RouterAction, ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Actions, Effect} from '@ngrx/effects';
import {Backend} from "../services/backend";
import {Params, ActivatedRouteSnapshot} from "@angular/router";
import {Store, combineReducers} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/withLatestFrom';

import {Recipe} from './recipe.model';
import {Action} from '../actions/actions';
import {appReducer} from '../reducers/reducer';

export type Filters = { title: string, difficulty: string };
export type AppState = { recipes: { [id: string]: Recipe }, list: number[], filters: Filters };
export type State = { app: AppState }; // this will also contain router state

export const initialState: State = {
  app: {
    filters: {title: "", difficulty: ""},
    recipes: {},
    list: []
  }
};

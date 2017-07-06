import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";
import {Filters} from "../models/model";

@Injectable()
export class Backend {
  private url = 'https://dev-contentacms.pantheonsite.io/api';

  constructor(private http: Http) {}

  findRecipes(filters: Filters): Observable<{recipes: {[id: string]: Recipe}, list: number[]}> {
    const params = new URLSearchParams();
    params.set("title", filters.title);
    params.set("difficulty", filters.difficulty);
    return this.http.get(`${this.url}/recipes`, {search: params}).map(this.normalizeData);
  }

  private normalizeData(res) {
    let response = res.json();
    let normalized = {
      recipes: {},
      list: []
    };
    for (var key in response) {
      if (key === 'data') {
        //console.log('number of recipes: ' + response[key].length);
        for (let num = 0; num < response[key].length; num++) {
          normalized.recipes[response[key][num]['id']] = {'data': response[key][num]};
          normalized.list.push(response[key][num]['id']);
        }
      }
    }
    return normalized;
  }

  findRecipe(id: string): Observable<Recipe> {
    const params = new URLSearchParams();
    params.set("id", id);
    return this.http.get(`${this.url}/recipe/`, {search: params}).map(r => r.json()['recipe']);
  }
}
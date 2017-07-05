import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Recipe} from "./models/recipe.model";
import {Filters} from "./models/model";

@Injectable()
export class Backend {
  private url = 'http://localhost:4444';

  constructor(private http: Http) {}

  findRecipes(filters: Filters): Observable<{recipes: {[id: string]: Recipe}, list: number[]}> {
    const params = new URLSearchParams();
    params.set("title", filters.title);
    params.set("difficulty", filters.difficulty);
    params.set("minRating", filters.minRating.toString());
    return this.http.get(`${this.url}/recipes`, {search: params}).map(r => r.json());
  }

  findRecipe(id: string): Observable<Recipe> {
    const params = new URLSearchParams();
    params.set("id", id);
    return this.http.get(`${this.url}/recipe/`, {search: params}).map(r => r.json()['recipe']);
  }

  rateRecipe(id: string, rating: number): Observable<any> {
    return this.http.post(`${this.url}/rate`, {id, yourRating: rating});
  }
}
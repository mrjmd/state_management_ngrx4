import {Component, Inject} from "@angular/core";
import { Router, Params } from "@angular/router";
import { Filters, State } from "../../models/model";
import { Recipe } from "../../models/recipe.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-cmp',
  templateUrl: './recipes-and-filters.component.html',
  styleUrls: ['./recipes-and-filters.component.css']
})
export class RecipesAndFiltersComponent {
  filters: Observable<Filters>;
  recipes: Observable<Recipe[]>;

  constructor(private router: Router, store: Store<State>) {
    this.filters = store.select('app', 'filters');
    this.recipes = store.select('app').map(s => s.list.map(n => s.recipes[n]));
  }

  handleFiltersChange(filters: Filters): void {
    this.router.navigate(["/recipes", this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r: any = {};
    if (filters.title) r.title = filters.title;
    if (filters.difficulty) r.difficulty = filters.difficulty;
    if (filters.limit) r.limit = filters.limit;
    return r;
  }
}

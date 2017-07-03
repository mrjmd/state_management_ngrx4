import {Component, Inject} from "@angular/core";
import { Router, Params } from "@angular/router";
import { Filters, State, Recipe } from "../model";
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
    if (filters.speaker) r.speaker = filters.speaker;
    if (filters.title) r.title = filters.title;
    if (filters.minRating) r.minRating = filters.minRating;
    return r;
  }
}

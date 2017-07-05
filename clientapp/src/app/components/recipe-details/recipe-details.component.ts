import {Component, Input} from "@angular/core";
import {Backend} from "../../services/backend";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/mergeMap';
import {WatchService} from "../../watch";
import { State } from "../../models/model";
import { Recipe } from "../../models/recipe.model";
import { Store } from "@ngrx/store";

@Component({
  selector: 'recipe-details-cmp',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipe: Recipe;
  isWatched: boolean;

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    store.select('app').subscribe(t => {
      const id = route.snapshot.paramMap.get('id');
      console.log(id);
      this.recipe = t.recipes[id];
      this.isWatched = t.watched[id];
    });
  }

  handleWatch(): void {
    this.store.dispatch({
      type: 'WATCH',
      payload: {
        recipeId: this.recipe.id,
      }
    });
  }
}

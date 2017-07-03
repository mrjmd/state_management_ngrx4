import {Component, Input} from "@angular/core";
import {Recipe} from "../model";

@Component({
  selector: 'recipe-cmp',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe: Recipe;
}
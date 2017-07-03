import {Component, Input} from '@angular/core';
import {Recipe} from "../model";

@Component({
  selector: 'recipes-cmp',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  @Input() recipes: Recipe[];
}
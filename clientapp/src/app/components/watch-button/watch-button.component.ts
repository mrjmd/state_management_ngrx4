import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'watch-button',
  templateUrl: './watch-button.component.html'
})
export class WatchButtonComponent {
  @Input() recipe: Recipe;
  @Input() watched: boolean;
  @Output() watch = new EventEmitter();

  handleWatch(): void {
    this.watch.next(null);
  }
}

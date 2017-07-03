import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../model";

@Component({
  selector: 'rate-button',
  templateUrl: './rate-button.component.html'
})
export class RateButtonComponent {
  @Input() recipe: Recipe;
  @Output() rate = new EventEmitter();

  promptRating(): void {
    const value = prompt("Enter rating");
    if (value) {
      this.rate.next(+value);
    }
  }
}

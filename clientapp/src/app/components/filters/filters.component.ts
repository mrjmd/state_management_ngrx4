import {Component, EventEmitter, Output, Inject, Input} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {Filters} from "../../models/model";

@Component({
  selector: 'filters-cmp',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  difficultyList = [
    {value: '', name: 'All'},
    {value: 'easy', name: 'Easy'},
    {value: 'middle', name: 'Moderate'},
    {value: 'difficult', name: 'Difficult'}
  ];

  @Output() filtersChange = new EventEmitter();

  @Input() set filters(v) {
    this.filtersForm.setValue({
      title: v.title,
      difficulty: v.difficulty,
      highRating: v.minRating >= 9
    }, {emitEvent: false});
  }

  filtersForm = new FormGroup({
    title: new FormControl(),
    difficulty: new FormControl(),
    highRating: new FormControl(false),
  });

  constructor() {
    this.filtersForm.valueChanges.debounceTime(200).subscribe((value) => {
      this.filtersChange.next(this.createFiltersObject(value));
    });
  }

  private createFiltersObject({title, difficulty, highRating}: { title: string, difficulty: string, highRating: false }): Filters {
    const minRating = highRating ? 9 : 0;
    return {title: title || null, difficulty: difficulty || null, minRating};
  }
}

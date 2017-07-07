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
    {value: 'hard', name: 'Difficult'}
  ];

  limitList = [
    '12', '24', '36', '48'
  ];

  @Output() filtersChange = new EventEmitter();

  @Input() set filters(v) {
    this.filtersForm.setValue({
      title: v.title,
      difficulty: v.difficulty,
      limit: v.limit,
    }, {emitEvent: false});
  }

  filtersForm = new FormGroup({
    title: new FormControl(),
    difficulty: new FormControl(),
    limit: new FormControl(),
  });

  constructor() {
    this.filtersForm.valueChanges.debounceTime(200).subscribe((value) => {
      this.filtersChange.next(this.createFiltersObject(value));
    });
  }

  private createFiltersObject({title, difficulty, limit}: { title: string, difficulty: string, limit: number}): Filters {
    return {title: title || null, difficulty: difficulty || null, limit: limit || null};
  }
}

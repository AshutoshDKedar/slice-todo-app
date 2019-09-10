import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {VISIBILITY_FILTER, VISIBILITY_FILTER_VALUES, ACTIVE_FILTER_KEY } from './filter.model';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { TodoService } from "./todo.service";

@Component({
  selector: 'app-todos-filters',
  template: `
      <select [formControl]="control" class="browser-default">
        <option *ngFor="let filter of filterValues" [ngValue]="filter">{{filter}}
        </option>
      </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosFiltersComponent implements OnInit, OnDestroy {

  constructor(private ts:TodoService) {}

  active: VISIBILITY_FILTER;
  control: FormControl;
  filterValues = VISIBILITY_FILTER_VALUES();

  ngOnInit() {
    this.active = this.ts.ostore.select(ACTIVE_FILTER_KEY);
    this.control = new FormControl(this.active)
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(c => {
      this.ts.ostore.put(ACTIVE_FILTER_KEY, c);
    });
  }
  ngOnDestroy(): void {}
}
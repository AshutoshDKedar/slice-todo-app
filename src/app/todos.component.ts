import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo, TodoSliceEnum } from './todo.model';
import { TodoService } from './todo.service';
import { Observable,combineLatest } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-todos',
  template: `
    <div class="collection with-header">
      <h4 class="collection-header">Todos:</h4>
      <app-todo *ngFor="let todo of render$ | async;"
                class="collection-item"
                [todo]="todo"></app-todo>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  constructor(private ts:TodoService) {}
  render$: Observable<Todo[]>; 

  ngOnInit() {
    this.render$ = this.ts.selectedTodos$;
  }
}
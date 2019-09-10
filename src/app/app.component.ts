import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
<div style="margin: 2rem;">
<div class="input-field">
	<i class="material-icons prefix">add_box</i>
	<input [formControl]="titleControl" type="text" class="form-control" placeholder="Add Todo..." #input (keydown.enter)="addTodo()">
</div>

<p><b>Slice</b> the <b>List</b></p> <app-todos-filters></app-todos-filters>
<app-todos></app-todos>
<div *ngIf="finito$ | async">Finito!</div>
</div>`
})
export class AppComponent {
  constructor(private ts:TodoService) {}
  titleControl:FormControl = new FormControl(null);

  get finito$() {
    return this.ts.finito$;
  }

  addTodo() {
    this.ts.add(this.titleControl.value);
    this.titleControl.reset();
  }
}

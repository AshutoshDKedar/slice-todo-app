import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-todo',
  template: `
    <div class="flex align-center sb">
     <div class="flex">
      <label>
        <input type="checkbox" [formControl]="control"/>
        <span></span>
      </label>
      {{todo.title}}
    </div>
    <a class="btn waves-effect waves-light red btn-small btn-floating">
      <i class="material-icons" (click)="delete()">delete_forever</i>
    </a>
   </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnDestroy{
  constructor(private ts:TodoService) {}
  control: FormControl;
  @Input() todo: Todo;
  complete() {
    this.ts.complete(this.todo);
  }
  delete() {
    this.ts.delete(this.todo);
  }
  ngOnInit() {
    this.control = new FormControl(this.todo.completed);
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((completed: boolean) => {
      this.todo.completed = completed;
      this.complete();
    });
  }

  ngOnDestroy() {
    
  }
}
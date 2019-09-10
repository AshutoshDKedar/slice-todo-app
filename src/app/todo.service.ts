import { ACTIVE_FILTER_KEY, VISIBILITY_FILTER } from './filter.model';
import { Injectable } from '@angular/core';
import { OStore, EStore } from "@fireflysemantics/slice";
import { Todo, TodoSliceEnum } from "./todo.model";
import { combineLatest, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public ostore:OStore = new OStore();
  public todoStore:EStore<Todo> = new EStore<Todo>();
  public activeFilter$;
  public todos$:Observable<Todo[]>;
  public completeTodos$:Observable<Todo[]>;
  public incompleteTodos$:Observable<Todo[]>;
  public selectedTodos$:Observable<Todo[]>;
  public finito$:Observable<boolean>;

  constructor() {
    this.ostore.post(
      ACTIVE_FILTER_KEY, 
      VISIBILITY_FILTER.SHOW_ALL);
      this.todoStore.addSlice(todo => todo.completed, TodoSliceEnum.COMPLETE);      
      this.todoStore.addSlice(todo => !todo.completed, TodoSliceEnum.INCOMPLETE);      

      this.todos$ = this.todoStore.observe();
      this.activeFilter$ = this.ostore.observe(ACTIVE_FILTER_KEY);
      this.completeTodos$ = this.todoStore.getSlice(TodoSliceEnum.COMPLETE).observe();
      this.incompleteTodos$ = this.todoStore.getSlice(TodoSliceEnum.INCOMPLETE).observe();
      this.selectedTodos$ = 
      combineLatest(this.activeFilter$, this.completeTodos$, this.incompleteTodos$, this.todos$, this.applyFilter);
      this.finito$ = combineLatest(this.completeTodos$, this.todos$, this.isComplete);
  } 

  public applyFilter(filter, completeTodos, incompleteTodos, todos): Todo[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return completeTodos;
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return incompleteTodos;
      default:
        return todos;
    }
  }

  isComplete(completeTodos:Todo[], todos:Todo[]):boolean {
    if (todos.length > 0 ) {
      return completeTodos.length == todos.length ? true : false; 
    }
    return false;
  }


  complete(todo: Todo) {
    this.todoStore.put(todo);
  }
  add(title: string) {
    const todo = new Todo(title, false);
    this.todoStore.post(todo);
  }
  delete(todo: Todo) {
    this.todoStore.delete(todo);
  }
}
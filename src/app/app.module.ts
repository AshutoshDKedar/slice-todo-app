import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodosFiltersComponent } from './filter.component';
import { TodoComponent } from './todo.component';
import { TodosComponent } from './todos.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, TodosFiltersComponent, TodoComponent, TodosComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { CounterComponent } from './counter/counter.component';

import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-components/todo-form/todo-form.component';
import { TodoListComponent } from './todo/todo-components/todo-list/todo-list.component';
import { TodoListItemComponent, TodoListItemEditComponent } from './todo/todo-components/todo-list-item/todo-list-item.component';
import { FilterByPipe } from './todo/pipes/filter-by.pipe';
import { TodoDoneComponent } from './todo/todo-components/todo-done/todo-done.component';

@NgModule({
  declarations: [
    AppComponent, //root
    HelloWorldComponent, //temp
    CounterComponent, //temp
    TodoComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoListItemEditComponent,
    FilterByPipe,
    TodoDoneComponent,
  ],
  exports:[

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,


  ],
  entryComponents: [TodoListItemEditComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit, Input, OnChanges, DoCheck, ViewChild } from '@angular/core';
import { Todo } from '../../todo.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-todo-done',
  templateUrl: './todo-done.component.html',
  styleUrls: ['./todo-done.component.scss']
})
export class TodoDoneComponent implements OnInit, OnChanges,DoCheck {
  
  @Input()
  todos: Todo[];
  undoneTodo: Todo[];
  displayedColumns: string[] = ['title', 'description', 'author', 'priority','deadline']; /// Anume acest array defineste in ce ordine se vor vizualiza elementele
  dataSource = new MatTableDataSource(this.undoneTodo);
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor() { }
  
  ngOnInit(): void {
  this.todos;
  this.undoneTodo = this.todos.filter(todo => todo.done);
  }

  ngOnChanges(){
  }

  ngDoCheck(){
  this.undoneTodo = this.todos.filter(todo => todo.done);
  }

}

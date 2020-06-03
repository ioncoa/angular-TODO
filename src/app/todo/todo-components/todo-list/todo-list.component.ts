import { Component,  Input, OnInit, DoCheck} from '@angular/core';
import  {Todo} from '../../todo.component'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {
  @Input() todos: Todo[];
  titleHovered: string;
  undoneTodo: Todo[] = [];
  search: string = '';
  searchByTypes: string[] = ['Title', 'Description']
  searchBy: string = this.searchByTypes[0];
  
  
  ngOnInit(): void {  
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.undoneTodo = this.todos.filter(todo => !todo.done); // 1st time and last (because of init lifecycle , it cals only one time ): Call here because : on init to have  updated a List
    }

  ngDoCheck() {
    this.undoneTodo = this.todos.filter(todo => !todo.done);
  }  
    
    onItemHover(title: string): void {
      this.titleHovered = title;
    }
    
    setDoneToDo(todo:Todo){
      if(this.todos.indexOf(todo) !== -1) {
        this.todos[this.todos.indexOf(todo)].done= true;
        this.undoneTodo = this.todos.filter(todo => !todo.done);   // 2nd time: Call here, and every time when we set it DONE
        
      }
      
    }
    
    deleteToDo(id: string) {
      let obj = this.todos.find(obj => obj.id === id);
      if (this.todos.indexOf(obj) !== -1) {
        this.todos.splice(this.todos.indexOf(obj), 1);
      }
    }
  }

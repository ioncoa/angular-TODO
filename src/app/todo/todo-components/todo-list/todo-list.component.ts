import { Component,  Input, OnInit, DoCheck} from '@angular/core';
import  {Todo} from '../../todo.component'
import { HttpClient } from '@angular/common/http';


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
  
  constructor(private http: HttpClient){}

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
      this.http.post(`https://gentle-reef-67626.herokuapp.com/complete/${todo.id}`,{})
      .subscribe( response =>{
        console.log('On Set Done , result :', response)
        if(this.todos.indexOf(todo) !== -1) {
          this.todos[this.todos.indexOf(todo)].done= true;
          this.undoneTodo = this.todos.filter(todo => !todo.done);   // 2nd time: Call here, and every time when we set it DONE
        }
      },
      err => {
        alert('Something wrong Happened, please see console log')
        console.log('On Set Done, HTTP Error: ',err)
      }
      )
    }
    
    deleteToDo(id: string) {
      this.http.delete(`https://gentle-reef-67626.herokuapp.com/todos/${id}`)
      .subscribe( response => {
        console.log('On delete , result : ',response)
        this.todos = this.todos.filter( todo => todo.id !== id)
        },
        err => {
          alert('Something wrong Happened, please see console log')
          console.log('On Set Done, HTTP Error: ', err)
      })
    }
  }

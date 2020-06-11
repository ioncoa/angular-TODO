import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Todo {
  title: string;
  description: string;
  id: string;
  done: boolean;
  author: string;
  priority: string;
  deadline: Date;
  __v?: Number;
  _id?: String;

}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  todos: Todo[] = []

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Todo[]>('https://gentle-reef-67626.herokuapp.com/todoList')
    .subscribe(response => {
      console.log('Response: ', response)
      this.todos = response
    })
  }

  // todos: Todo[] = [
  //   { title: 'Create App', description: 'Use Angular', id: 'dd32dsd-d-d23dd3d3d3d-ddesd', done: false, author: 'Ion', priority: 'High', deadline: new Date() },
  //   { title: 'Buy Milk', description: 'In Linella', id: 'dd32dsddsfsfdfsdfsd3d-ddesd', done: false, author: 'Ion', priority: 'High', deadline: new Date() },
  //   { title: 'Talk to John', description: 'John\'s number: 079xxxxxx', id: 'dd32dsfsdfdsfdshj3d3d3d-ddesd', done: false, author: 'Ion', priority: 'High', deadline: new Date() },
  // ];

  handleTodoSubmited(newTodo: Todo): void {
    const isTodoAlreadyExists = this.todos.some((todo: Todo) => {
      return (newTodo.title === todo.title) && (newTodo.description === todo.description);
    });

    if (!isTodoAlreadyExists) {
      this.http.post<Todo>('https://gentle-reef-67626.herokuapp.com/create', newTodo)
      .subscribe( response => {
        this.todos.unshift(response)
      })
        
      console.log('new TODO: ', newTodo)
      console.log('TODOS: ', this.todos)
    }
  }
}

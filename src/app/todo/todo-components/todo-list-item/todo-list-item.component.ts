import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit,
  OnChanges,
  DoCheck
} from '@angular/core';
import {Todo} from '../../todo.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit, OnChanges, DoCheck  {
   @Input()
   todo: Todo
  @Input()
  todos: Todo[]



  @Output()
  itemToDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  itemSetDone: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  displayedColumns: string[] = ['title', 'description', 'author', 'priority', 'deadline','actions']; /// Anume acest array defineste in ce ordine se vor vizualiza elementele
  dataSource = new MatTableDataSource()
  constructor(public dialog: MatDialog , private http: HttpClient) {}
  
  ngOnInit(): void {
    this.todos;
    this.dataSource = new MatTableDataSource(this.todos.filter(todo => !todo.done))
    console.log('todosa  aa: ',this.todos)
  }
  
  ngOnChanges() {
  }
  
  ngDoCheck() {
    this.dataSource = new MatTableDataSource(this.todos.filter(todo => !todo.done))
    // console.log('dataSource for Tabletemplate is updated in ngDocheck lifeCycle [todo-list-item-component]')
    // this.dataSource = new MatTableDataSource(this.todos.filter(todo => !todo.done)) // FIXME:Solve the problem with observable?
  }
  
  deleteMe(todorow: Todo) {
    this.itemToDelete.emit(todorow.id);
  }

  setDone(todorow: Todo) {
    this.itemSetDone.emit(todorow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogEdit(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoListItemEditComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        title: todo.title,
        description: todo.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let obj = this.todos.find(obj => obj.id === todo.id);
      console.log('todooo: ',todo)
      if (result) {
        this.http.post(`http://localhost:3000/edit/${obj.id}`, {title: result.title, description: result.description})
        .subscribe(
          response => {
            console.log('On Edit Todo, result :',response)
            this.todos[this.todos.indexOf(obj)].title = result.title
            this.todos[this.todos.indexOf(obj)].description = result.description
          },
          err => {
            alert('Something wrong Happened, please see console log')
            console.log('On Edit todo, HTTP Error: ', err)
          }
         )
      }
    });
  }
}

@Component({
  selector: 'app-todo-list-item-edit',
  templateUrl: 'todo-list-item-edit-component.html',
})
export class TodoListItemEditComponent {

  constructor(
    public dialogRef: MatDialogRef < TodoListItemEditComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

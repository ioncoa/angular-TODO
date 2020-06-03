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


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit, OnChanges, DoCheck  {
  @Input() 
  todo: Todo;
  @Input()
  todos: Todo[]
  @Output()
  itemToDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  itemSetDone: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  titleHovered: string;  //keep as example only 
  displayedColumns: string[] = ['title', 'description', 'author', 'priority', 'deadline', 'done']; /// Anume acest array defineste in ce ordine se vor vizualiza elementele
  dataSource = new MatTableDataSource()
  
  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.todos;
    this.dataSource = new MatTableDataSource(this.todos.filter(todo => !todo.done))
  }

  ngOnChanges() {
  }

  ngDoCheck() {
    this.dataSource = new MatTableDataSource(this.todos.filter(todo => !todo.done)) // FIXME:Solve the problem with observable
  }
  
  deleteMe(todorow: Todo) {
    console.log('deleteMe : ', todorow, typeof todorow);
    this.itemToDelete.emit(todorow.id);
  }

  setDone(todorow: Todo) {
    this.itemSetDone.emit(todorow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // onItemHover(title: string): void {  // keep as example only 
  //   this.titleHovered = title;

  // }
    


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
      if (result) {
        this.todos[this.todos.indexOf(obj)].title = result.title
        this.todos[this.todos.indexOf(obj)].description = result.description
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

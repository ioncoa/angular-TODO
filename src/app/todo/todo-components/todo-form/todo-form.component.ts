import {    Component, Output, EventEmitter, OnInit}from '@angular/core';
import { Todo}from '../../todo.component';
import {v4 as uuidv4}from 'uuid';
import {
    FormGroup,  
    Validators,
    FormBuilder,
    AbstractControl,
    FormControl,} from '@angular/forms';


@Component({ selector: 'app-todo-form', templateUrl: './todo-form.component.html', styleUrls: ['./todo-form.component.scss'] }) 


export class TodoFormComponent implements OnInit{

    @Output() todoSubmit = new EventEmitter<Todo>();

    title: string='';
    description: string='';
    todoForm: FormGroup;
    minDate = new Date();

    ngOnInit(): void {
        this.todoForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ]),
            author: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ]),
            priority: new FormControl('1', [Validators.required]),
            date: new FormControl(new Date(), Validators.required),
        });
    }


    onSubmit():void {
         // TODO: apply form control
        if (this.todoForm.valid) {
            console.log('Form', this.todoForm.value);
        }
        // if( this.title?.trim() && this.description?.trim()){
        //     this.title = null;
        //     this.description = null;
        // }
        this.todoSubmit.emit({ title: this.todoForm.value.title, description: this.todoForm.value.description, id: `${uuidv4()}`, author: this.todoForm.value.author, priority: this.todoForm.value.priority, deadline: this.todoForm.value.date , done:false });
        this.todoForm.reset();
    }
}

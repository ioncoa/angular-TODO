import { Pipe, PipeTransform } from '@angular/core';
import {Todo}from '../todo.component'

@Pipe({
  name: 'filterBy',
  pure: false,
})
export class FilterByPipe implements PipeTransform {

  transform(todos: Todo[], searchString: string = '', searchby: string = ''): Todo[] {
    if (!searchString.trim()){
      return todos;
    }
    if (searchby === 'Description') {
      return todos.filter(todo => {
        return todo.description
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase());
      });
    }
    else {
      return todos.filter((todo) => {
        return todo.title
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase());
      });
    }
  }



}
 
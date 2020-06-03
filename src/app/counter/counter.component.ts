import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {

  @Input() counter = 0;
  @Input() counterText = 'counter text -';

  // counter = 0;

  // plus(): void {
  //   this.counter += 1;
  // }

  // minus(): void {
  //   this.counter -= 1;
  // }
}

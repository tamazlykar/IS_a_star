import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CellType, MyPosition, Cell } from '../shared/types';

@Component({
  selector: 'app-field-element',
  templateUrl: './field-element.component.html',
  styleUrls: ['./field-element.component.css']
})
export class FieldElementComponent {
  @Input() state: Cell;
  @Output() myState = new EventEmitter<Cell>();

  constructor() {
  }

  onClick() {
    this.myState.emit(this.state);
    // console.log(`${this.state.position.x} ${this.state.position.y}`)
  }

}

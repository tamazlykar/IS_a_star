import { Component } from '@angular/core';
import { CellType, MyPosition, Cell, EvristicsList, Evristic } from './shared/types';
import { Field } from './shared/field';
import { AlgorithmService } from './algorithm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Algorithm A*!';
  column = 6;
  row = 5;
  state: AppState;
  field: Field;
  output: string;
  evriscticsList = EvristicsList;
  selectedEvristic: Evristic;

  start: Cell;
  finish: Cell;

  constructor(private algorithm: AlgorithmService) {
    this.field = new Field();
    this.selectedEvristic = this.evriscticsList[0].value;
    this.onGenerateField();
  }

  onGenerateField() {
    this.field.generate(this.row, this.column);
    this.output = `Field ${this.row}x${this.column} was generated`;
  }

  onSelectStart() {
    this.state = AppState.selectStart;
    this.output = 'Choose start point!';
  }

  onSelectFinish() {
    this.state = AppState.selectFinish;
    this.output = 'Choose finish point!';
  }

  onSelectWall() {
    this.state = AppState.selectWall;
    this.output = 'Choose walls point';
  }

  onSelectFindPath() {
    if (!this.start) {
      this.output = 'Select start point';
      return;
    }
    if (!this.finish) {
      this.output = 'Select finish point';
      return;
    }

    this.state = AppState.calculating;
    this.output = 'Calculating...';
    if (!this.algorithm.findPath(this.start, this.finish, this.field, this.selectedEvristic)) {
      this.output = 'There is not direct path!';
      return;
    };

    this.output = '';
    let current = this.finish;
    while (current.parent !== undefined) {
      this.output = `<${current.position.x}, ${current.position.y}> ` + this.output;
      current = current.parent;
    }
    this.output = `<${this.start.position.x}, ${this.start.position.y}> ` + this.output;
    this.output = `Your path is: ` + this.output;
  }

  onClickFromElement(state: Cell) {
    switch (this.state) {
      case AppState.selectStart:
        if (this.start) {
          this.start.setType(CellType.none);
        }
        state.setType(CellType.start);
        this.start = state;
        break;
      case AppState.selectFinish:
        if (this.finish) {
          this.finish.setType(CellType.none);
        }
        state.setType(CellType.finish);
        this.finish = state;
        break;
      case AppState.selectWall:
        if (state.type === CellType.wall) {
          state.setType(CellType.none);
        } else {
          state.setType(CellType.wall);
        }
        break;
    }

  }
}

enum AppState {
  selectStart,
  selectFinish,
  selectWall,
  calculating
}

import { CellType, MyPosition, Cell } from './types';

export class Field {
  private field: Array<Array<Cell>>;
  private row: number;
  private column: number;

  public generate(row: number, column: number) {
    this.field = new Array<Array<Cell>>();
    this.row = row;
    this.column = column;

    for (let y = 0; y < row ; y++) {
      this.field[y] = [];
      for (let x = 0; x < column; x++) {
        this.field[y][x] = new Cell(new MyPosition(x, y));
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.field[y][x];
  }

  public getRow() {
    return this.row;
  }

  public getColumn() {
    return this.column;
  }

  public getField() {
    return this.field;
  }
}

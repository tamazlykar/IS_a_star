export class MyPosition {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export enum CellType {
  none,
  start,
  finish,
  wall
}

export enum CellState {
  unexplored,
  opened,
  closed
}

export enum ListType {
  open,
  closed
}

export class Cell {
  isOpenList: boolean;
  isClosedList: boolean;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isPath: boolean

  state: CellState;
  type: CellType;
  position: MyPosition;
  parent: Cell;
  f: number;
  g: number;
  h:  number;

  constructor(pos: MyPosition) {
    this.isStart = false;
    this.isFinish = false;
    this.isWall = false;
    this.isOpenList = false;
    this.isClosedList = false;
    this.isPath = false;


    this.type = CellType.none;
    this.position = pos;
    this.state = CellState.unexplored;
  }

  setType(type: CellType) {
    this.type = type;
    switch (type) {
      case CellType.start:
        this.isStart = true;
        this.isFinish = false;
        this.isWall = false;
        break;
      case CellType.finish:
        this.isStart = false;
        this.isFinish = true;
        this.isWall = false;
        break;
      case CellType.wall:
        this.isStart = false;
        this.isFinish = false;
        this.isWall = true;
        break;
      case CellType.none:
        this.isStart = false;
        this.isFinish = false;
        this.isWall = false;
        break;
    }
  }

  setState(type: CellState) {
    this.state = type;
    switch (type) {
      case CellState.opened:
        this.isOpenList = true;
        this.isClosedList = false;
        break;
      case CellState.closed:
        this.isOpenList = false;
        this.isClosedList = true;
    }
  }
}

export enum Evristic {
  manhattan,
  pifagor,
  chebishev
}

export const EvristicsList = [
  { name: 'Manhattan', value: Evristic.manhattan },
  { name: 'Pifagor', value: Evristic.pifagor },
  { name: 'Chebishev', value: Evristic.chebishev }
];


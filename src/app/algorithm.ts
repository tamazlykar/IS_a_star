import { Injectable } from '@angular/core';
import { Queue } from './shared/queue';
import { Cell, CellType, CellState, Evristic } from './shared/types';
import { Field } from './shared/field';

@Injectable()
export class AlgorithmService {
  private queue: Queue;
  private exitCell: Cell;
  private evristic: Evristic;

  constructor() {
    this.queue = new Queue();
  }

  public findPath(start: Cell, end: Cell, field: Field, evristic: Evristic) {
    let current: Cell;

    this.evristic = evristic;

    this.exitCell = end;
    this.queue.delete();

    start.g = 0;
    this.queue.add(start);

    while (!this.queue.empty()) {
      current = this.queue.get();

      if (current === end) {
        this.setPath(end);
        return true;
      }

      this.exploreNeighbors(current, field);
      current.setState(CellState.closed);
    }
  }

  private exploreNeighbors(parent: Cell, field: Field) {
    let row = field.getRow();
    let column = field.getColumn();
    let x = parent.position.x;
    let y = parent.position.y;

    let north = {x: x, y: y - 1};
    let south = {x: x, y: y + 1};
    let west = {x: x - 1, y: y};
    let east = {x: x + 1, y: y};
    let northWest = {x: x - 1, y: y - 1, side1: north, side2: west};
    let northEast = {x: x + 1, y: y - 1, side1: north, side2: east};
    let southWest = {x: x - 1, y: y + 1, side1: south, side2: west};
    let southEast = {x: x + 1, y: y + 1, side1: south, side2: east};

    let mainSides = [north, south, west, east];
    let otherSides = [northWest, northEast, southWest, southEast];

    for (let side of mainSides) {
      if (this.isExists(side, row, column)) {
        let node = field.getCell(side.x, side.y);
        this.openNode(node, parent);
      }
    }

    for (let side of otherSides) {
      if (this.isExists(side, row, column)) {
        let side1: Cell;
        let side2: Cell;
        let isCroosedWall = false;
        if (this.isExists(side.side1, row, column)) {
          if (field.getCell(side.side1.x, side.side1.y).isWall) {
            isCroosedWall = true;
          }
        }
        if (isCroosedWall === false && this.isExists(side.side2, row, column)) {
          if (field.getCell(side.side2.x, side.side2.y).isWall) {
            isCroosedWall = true;
          }
        }

        if (!isCroosedWall) {
          let node = field.getCell(side.x, side.y);
          this.openNode(node, parent);
        }
      }
    }
  }

  private openNode(node: Cell, parent: Cell) {
    if (node.type !== CellType.wall && node.state === CellState.unexplored) {
      node.g = this.calculateG(node, parent);
      node.h = this.calculateH(node);
      node.f = node.h + node.g;
      node.parent = parent;
      node.setState(CellState.opened);
      this.queue.add(node);
    } else if (node.state === CellState.opened) {
      if (node.g <= this.calculateG(node, parent)) {
        return;
      }
      node.g = this.calculateG(node, parent);
      node.f = node.h + node.g;
      node.parent = parent;
    }
  }

  private calculateH(current: Cell) {
    let result;
    switch (+this.evristic) {
      case Evristic.manhattan:
        result = (Math.abs(this.exitCell.position.x - current.position.x) + Math.abs(this.exitCell.position.y - current.position.y)) * 10;
        break;
      case Evristic.pifagor:
        let a = Math.pow(Math.abs(this.exitCell.position.x - current.position.x), 2);
        let b = Math.pow(Math.abs(this.exitCell.position.y - current.position.y), 2);
        result = Math.sqrt(a + b);
        break;
      case Evristic.chebishev:
        result = Math.max(Math.abs(this.exitCell.position.x - current.position.x), Math.abs(this.exitCell.position.y - current.position.y));
        break;
    }

    return result;
  }

  private calculateG(current: Cell, parent: Cell) {
    if (parent.position.x !== current.position.x && parent.position.y !== current.position.y) {
      return parent.g + 14;
    } else {
      return parent.g + 10;
    }

  }

  private isExists(location: {x: number, y: number}, row: number, column: number) {
    if (location.x >= 0 && location.y >= 0 &&
       location.x < column && location.y < row) {
      return true;
    }

    return false;
  }

  private setPath(end: Cell) {
    let current = end;
    while (current.parent !== undefined) {
      current.isPath = true;
      current = current.parent;
    }
  }
}

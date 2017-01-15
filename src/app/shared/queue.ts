import { Cell } from './types';


export class Queue {
  private list: Array<Cell>;

  constructor() {
    this.list = new Array<Cell>();
  }

  public add(element: Cell) {
    let index = this.list.findIndex((val) => {
      return val.f > element.f;
    });

    if (index === -1) {
      this.list.push(element);
    } else {
      this.list.splice(index, 0, element);
    }
    // this.list.push(element);
  }

  public get() {
    // if (!this.list.length) {
    //   return undefined;
    // }

    // let min = this.list[0];
    // this.list.forEach((val) => {
    //   if (val.f < min.f) {
    //     min = val;
    //   }
    // });

    // return min;

    return this.list.shift();
  }

  public empty() {
    return this.list.length === 0;
  }

  public delete() {
    this.list.length = 0;
  }

}

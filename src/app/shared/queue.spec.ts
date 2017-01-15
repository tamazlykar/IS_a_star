import { Queue } from './queue';
import { Cell, MyPosition } from './types';

describe('Queue', () => {
  let pos = new MyPosition(1, 1);

  it('should be empty when initialized', () => {
    let queue = new Queue();
    expect(queue.empty()).toEqual(true);
  });

  it('should not be empty when add elements', () => {
    let queue = new Queue();
    queue.add(new Cell(pos));
    queue.add(new Cell(pos));
    expect(queue.empty()).toEqual(false);
  });

  it('should be empty when use delete function', () => {
    let queue = new Queue();
    queue.add(new Cell(pos));
    queue.add(new Cell(pos));
    queue.delete();
    expect(queue.empty()).toEqual(true);
  });

  it('should return Cell type element with min f value [1]', () => {
    let queue = new Queue();
    let e1 = new Cell(pos);
    let e2 = new Cell(pos);
    let e3 = new Cell(pos);
    e1.f = 120;
    e2.f = 44;
    e3.f = 67;

    queue.add(e1);
    queue.add(e2);
    queue.add(e3);

    expect(queue.get()).toEqual(e2);
  });

  it('should return Cell type element with min f value [2]', () => {
    let queue = new Queue();
    let e1 = new Cell(pos);
    let e2 = new Cell(pos);
    let e3 = new Cell(pos);
    e1.f = 120;
    e2.f = 44;
    e3.f = 7;

    queue.add(e1);
    queue.add(e2);
    queue.add(e3);

    expect(queue.get()).toEqual(e3);
  });

  it('should return Cell type element with min f value [3]', () => {
    let queue = new Queue();
    let e1 = new Cell(pos);
    let e2 = new Cell(pos);
    let e3 = new Cell(pos);
    e1.f = 12;
    e2.f = 44;
    e3.f = 67;

    queue.add(e1);
    queue.add(e2);
    queue.add(e3);

    expect(queue.get()).toEqual(e1);
  });
});

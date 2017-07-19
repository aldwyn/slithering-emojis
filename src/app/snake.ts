import { Maze } from './maze';
import { Cell } from './cell';
import { Settings } from './settings';

export class Snake {
  cellsQueue: Cell[];
  nextDirection: string;
  isBodyHit: boolean;
  
  /**
   * Instantiates new snake.
   * @param {Maze}     public mazeRef     Reference to the maze
   * @param {Settings} public settingsRef Reference to the settings
   */
  constructor(
    public mazeRef: Maze,
    public settingsRef: Settings) {
    this.cellsQueue = [
      new Cell(0, 0, settingsRef.snakeEmoji),
      new Cell(0, 1, settingsRef.snakeEmoji),
      new Cell(0, 2, settingsRef.snakeEmoji),
    ];
    this.nextDirection = 'east';
  }

  /**
   * Get new state for this object.
   * @param  {boolean = false}       grow Do not dequeue if true
   * @return {Cell}         Return dequeued cell if grow is false
   */
  walk(grow: boolean = false): Cell {
    let head = this.getHead();
    let newHead = new Cell(head.y, head.x, this.settingsRef.snakeEmoji);
    if (this.nextDirection === 'north') {
      newHead.y = (newHead.y - 1) % this.mazeRef.yLim;
    } else if (this.nextDirection === 'south') {
      newHead.y = (newHead.y + 1) % this.mazeRef.yLim;
    } else if (this.nextDirection === 'east') {
      newHead.x = (newHead.x + 1) % this.mazeRef.xLim;
    } else if (this.nextDirection === 'west') {
      newHead.x = (newHead.x - 1) % this.mazeRef.xLim;
    }
    if (newHead.y === -1) {
      newHead.y = this.mazeRef.yLim - 1;
    }
    if (newHead.x === -1) {
      newHead.x = this.mazeRef.xLim - 1;
    }
    this.cellsQueue.push(newHead);      // enqueue
    if (!grow) {
      return this.cellsQueue.shift();   // dequeue
    }
    return null;
  }

  /**
   * Pivot when a keypress is detected.
   * @param {string} key Event key
   */
  pivot(key: string) {
    if (key === 'ArrowRight' && this.nextDirection !== 'west') {
      this.nextDirection = 'east';
    } else if (key === 'ArrowLeft' && this.nextDirection !== 'east') {
      this.nextDirection = 'west';
    } else if (key === 'ArrowUp' && this.nextDirection !== 'south') {
      this.nextDirection = 'north';
    } else if (key === 'ArrowDown' && this.nextDirection !== 'north') {
      this.nextDirection = 'south';
    }
  }

  /**
   * Get snake.cellsQueue's rear
   * @return {Cell} Rear cell / head
   */
  getHead(): Cell {
    return this.cellsQueue[this.cellsQueue.length - 1];
  }

  /**
   * Check if food is already in the head.
   * @param  {Cell}    food
   * @return {boolean}
   */
  checkFood(food: Cell): boolean {
    let snakeHead = this.getHead();
    return food.y === snakeHead.y && food.x === snakeHead.x;
  }

  /**
   * Check if the given point is in the cellsQueue
   * @param  {Cell}    cell
   * @return {boolean}
   */
  checkIfBodyIsHit(cell: Cell): boolean {
    for (let i = 0; i < this.cellsQueue.length - 2; i++) {
      if (cell.y === this.cellsQueue[i].y &&
          cell.x === this.cellsQueue[i].x) {
        return true;
      }
    }
    return false;
  }
}
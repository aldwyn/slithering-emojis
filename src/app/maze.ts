import { Cell } from './cell';

export class Maze {
  cells: Cell[][];

  /**
   * Instantiates new maze
   * @param {number} public yLim      Row length of the maze
   * @param {number} public xLim      Column length of the maze
   * @param {any}    public cellValue Value to display to the maze
   */
  constructor(
    public yLim: number,
    public xLim: number,
    public cellValue: any) {
    this.cells = [];
    for (let i = 0; i < this.yLim; i++) {
      let cellRow: Cell[] = [];
      for (let j = 0; j < this.xLim; j++) {
        cellRow.push(new Cell(i, j, cellValue));
      }
      this.cells.push(cellRow);
    }
  }
}
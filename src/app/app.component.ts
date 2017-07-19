import { Component, OnInit, HostListener } from '@angular/core';

import swal from 'sweetalert2';

import { Maze } from './maze';
import { Snake } from './snake';
import { Food } from './food';
import { Settings } from './settings';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  maze: Maze;
  snake: Snake;
  food: Food;
  settings: Settings;
  startToggle: any;

  /**
   * Instantiates the app.
   */
  ngOnInit() {
    this.settings = new Settings();
    this.maze = new Maze(18, 32, this.settings.cellEmoji);
    this.snake = new Snake(this.maze, this.settings);
    this.paintSnake();
    this.paintNewFood();
  }

  /**
   * Activates play-mode in the app.
   */
  start() {
    clearInterval(this.startToggle);
    this.startToggle = setInterval(
      this.changeSnakePosition.bind(this), this.settings.moveInterval);
  }

  /**
   * Stops play-mode and re-instantiates app.
   */
  reset() {
    clearInterval(this.startToggle);
    this.startToggle = null;
    this.ngOnInit();
  }

  /**
   * Listens for arrow keypresses in the app.
   * @param {KeyboardEvent} event [description]
   */
  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key.startsWith('Arrow')) {
      this.start();
    }
    this.snake.pivot(event.key);
  }

  /**
   * Puts the current state of the snake to the maze.
   */
  paintSnake() {
    for (let snakeCell of this.snake.cellsQueue) {
      this.maze.cells[snakeCell.y][snakeCell.x] = snakeCell;
    }
  }

  /**
   * Puts the food to the maze.
   * @param {boolean = false} Get another random pos for food if true
   */
  paintNewFood(paintNew: boolean = false) {
    if (paintNew || !this.food) {
      this.food = this.createNewFood();
      while (this.snake.checkIfBodyIsHit(this.food)) {
        this.food = this.createNewFood();
      }
    }
    this.maze.cells[this.food.y][this.food.x] = this.food;
  }

  /**
   * Triggers every interval for changing the pos of the snake.
   */
  changeSnakePosition() {
    let removedIndex = this.snake.walk();
    if (removedIndex) {
      this.maze.cells[removedIndex.y][removedIndex.x].value = this.settings.cellEmoji;
    }
    if (this.snake.checkIfBodyIsHit(this.snake.getHead())) {
      let finalScore = this.snake.cellsQueue.length - 3;
      for (let notif of this.settings.resultNotifs) {
        if (finalScore >= notif.min && finalScore < notif.max) {
          swal({
            title: `Score: ${finalScore}. You are ${notif.type}!`,
            text: notif.message,
            imageUrl: `../assets/twemoji/${notif.emoji}.svg`,
            imageHeight: 200,
            animation: true,
          });
          this.reset();
          return;
        }
      }
    }
    let foodIsFound = this.snake.checkFood(this.food);
    if (foodIsFound) {
      this.snake.walk(true);  // grow
    }
    this.paintSnake();
    this.paintNewFood(foodIsFound);
  }

  /**
   * Gets new position for cell's x/y.
   * @param {number} min
   * @param {number} max
   * @return {number}    New random value
   */
  getRandomIndex(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Instantiates food.
   * @return {Food} New food instance
   */
  createNewFood() : Food {
    return new Food(
        this.getRandomIndex(0, this.maze.yLim),
        this.getRandomIndex(0, this.maze.xLim),
        this.settings.foodEmoji
      );
  }
}

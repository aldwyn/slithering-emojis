export class Settings {
  foodEmoji: string;
  snakeEmoji: string;
  cellEmoji: string;
  moveInterval: number;
  moveIntervalOptions: any[];
  resultNotifs: any[];
  snakeSkins: string[];

  /**
   * Instantiates new settings
   */
  constructor() {
    this.foodEmoji = 'poop';
    this.snakeEmoji = 'pig';
    this.cellEmoji = 'no_mouth';
    this.moveInterval = 50;
    this.moveIntervalOptions = [
      {
        name: 'Mediocre',
        speed: 60,
      },
      {
        name: 'Playing Safe',
        speed: 50,
      },
      {
        name: 'Royal',
        speed: 37,
      },
      {
        name: 'Crazy',
        speed: 25,
      }
    ];
    this.resultNotifs = [
      {
        type: 'Novice',
        min: 0,
        max: 10,
        emoji: 'crying',
        message: 'We see that you\'re still new. Keep up!'
      },
      {
        type: 'Intermediate',
        min: 10,
        max: 30,
        emoji: 'smirking',
        message: 'You are on average. Keep practicing to rank up as Pro!'
      },
      {
        type: 'Pro',
        min: 30,
        max: 75,
        emoji: 'shocked',
        message: 'You are on above average. Beat \'em like a god!'
      },
      {
        type: 'Godlike',
        min: 75,
        max: 5000,
        emoji: 'purple_satan',
        message: 'Gosh... we are speechless!'
      }
    ];
    this.snakeSkins = [
      'pig',
      'purple_heart',
      'dragon',
      'crying',
      'monkey',
      'shocked',
      'panda',
      'lol',
      'sparkling_heart',
      'hamster',
      'kiss',
      'with_shades',
      'dog',
    ];
  }

}

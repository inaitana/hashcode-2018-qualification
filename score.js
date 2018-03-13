class Score {
  constructor() {
    this.score = 0;
  }

  addPoints(points) {
    this.score += points;
  }

  getScore() {
    return this.score;
  }
}

let score = new Score();

module.exports = score;
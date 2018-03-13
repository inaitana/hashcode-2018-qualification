const settings = require('./settings');
const timer = require('./timer');
const score = require('./score');
const rides = require('./rides');

class Ride {
  constructor(id, a, b, x, y, s, f, length) {
    this.id = id;
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
    this.start = s;
    this.finish = f;
    this.length = length;

    this.vehicle = null;
    this.started = false;
    this.finished = false;
    this.bonus = false;
  }

  assignVehicle(vehicle) {
    this.vehicle = vehicle;
    rides.unassignedRides--;
  }

  startRide() {
    if(timer.time == this.start) {
      score.addPoints(settings.B);
      this.bonus = true;
    }

    this.started = true;
  }

  finishRide() {
    if(timer.time <= this.finish) {
      score.addPoints(this.length);
    }

    this.finished = true;
  }
}

module.exports = Ride;
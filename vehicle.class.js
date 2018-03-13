const settings = require('./settings');
const timer = require('./timer');
const score = require('./score');
const rides = require('./rides');
const vehicles = require('./vehicles');

class Vehicle {

  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.completedRides = [];
    this.currentRide = null;
    this.nextRides = [];
    this.freeTime = 0;
    this.full = false;
  }

  setFull() {
    this.full = true;
    vehicles.availableVehicles--;
  }
  
  computeStartTime(ride) {
    if(this.nextRides.length) {
      let lastRide = this.nextRides[this.nextRides.length - 1];
      return Math.max(this.freeTime + Math.abs(lastRide.x - ride.a) + Math.abs(lastRide.y - ride.b), ride.start);
    }
    else {
      return Math.max(this.freeTime + Math.abs(this.x - ride.a) + Math.abs(this.y - ride.b), ride.start);
    }
  }
  
  searchBestRide() {
    let bestRide = null;
    let bestTime = null;
  
    for(let ride of rides.getRides()) {
      if(ride != null && ride.vehicle === null) {
        let startTime = this.computeStartTime(ride);
  
        if(Math.min(ride.finish, settings.T - 1) >= startTime + ride.length) {
          if(bestTime === null || startTime < bestTime) {
            bestTime = startTime;
            bestRide = ride;
          }
        }
      }
    }
  
    return bestRide;
  }

  assignRide(ride) {
    this.freeTime = this.computeStartTime(ride) + ride.length;
    this.nextRides.push(ride);
    ride.assignVehicle(this);
  }

  startRide(ride) {
    this.currentRide = ride;
    this.targetX = ride.a;
    this.targetY = ride.b;
  }

  checkPosition() {
    if(this.currentRide) {
      if(this.x === this.targetX && this.y === this.targetY) {
        if(!this.currentRide.started) {
          if(this.currentRide.start <= timer.time) {
            this.currentRide.startRide();
            this.targetX = this.currentRide.x;
            this.targetY = this.currentRide.y;
          }
        } else {
          if(timer.time <= this.currentRide.finish) {
            this.currentRide.finishRide();
            this.completedRides.push(this.currentRide);
            this.currentRide = null;
          }
        }
      }
    }

    if(!this.currentRide && this.nextRides.length) {
      let nextRide = this.nextRides.shift();
      this.startRide(nextRide);
    }
  }

  doStep() {
    if(this.currentRide) {
      if(this.x > this.targetX) {
        this.x--;
      } else if(this.x < this.targetX) {
        this.x++;
      } else if(this.x === this.targetX) {
        if(this.y > this.targetY) {
          this.y--;
        } else if(this.y < this.targetY) {
          this.y++;
        }
      }
    }
  }
}

module.exports = Vehicle;
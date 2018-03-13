const timer = require('./timer');

class Rides {
  constructor() {
    this.rides = [];
    this.unassignedRides = 0;
  }
  
  getRides() {
    return this.rides;
  }

  getRide(id) {
    return this.rides[id];
  }

  addRide(ride) {
    this.rides.push(ride);
    this.unassignedRides++;
  }

  sortByStart() {
    this.rides.sort(function(a, b) {
      return a.start - b.start;
    });
  }
}

let rides = new Rides();

module.exports = rides;
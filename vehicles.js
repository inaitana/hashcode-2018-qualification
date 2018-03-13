class Vehicles {
  constructor() {
    this.vehicles = [];
    this.availableVehicles = 0;
  }

  getVehicles() {
    return this.vehicles;
  }

  getVehicle(id) {
    return this.vehicles[id];
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
    this.availableVehicles++;
  }
}

let vehicles = new Vehicles();

module.exports = vehicles;
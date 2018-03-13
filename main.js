const settings = require('./settings');
const io = require('./io');
const timer = require('./timer');
const rides = require('./rides');
const vehicles = require('./vehicles');
const score = require('./score');

settings.input = process.argv[2];

io.parseFile();

rides.sortByStart();

for(vehicle of vehicles.getVehicles()) {
  do {
    let bestRide = vehicle.searchBestRide(vehicle);
    if(bestRide === null) {
      vehicle.setFull();
    } else {
      vehicle.assignRide(bestRide);
    }
  } while (!vehicle.full && vehicles.availableVehicles > 0 && rides.unassignedRides > 0);
}

for(let t = 0; t < settings.T; t++) {
  vehicles.getVehicles().forEach(vehicle => vehicle.checkPosition());
  vehicles.getVehicles().forEach(vehicle => vehicle.doStep());

  timer.time++;
}

console.log("Score: " + score.getScore());

io.exportVehicles("./output/" + settings.filename + ".out");

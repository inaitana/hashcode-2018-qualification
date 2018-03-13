const fs = require('fs');
const settings = require('./settings');
const vehicles = require('./vehicles');
const rides = require('./rides');
const Vehicle = require('./vehicle.class');
const Ride = require('./ride.class');

function parseFile() {
  fs.readdirSync(__dirname + '/input/').forEach(filename => {
    if(filename.indexOf(settings.input) === 0) {
      settings.filename = filename.replace('.in', '');
    }
  });

  let content = fs.readFileSync(__dirname + '/input/' + settings.filename + '.in', {encoding: 'ascii'});
  let lines = content.split('\n');

  params = lines[0].split(' ');
  settings.R = parseInt(params[0]);
  settings.C = parseInt(params[1]);
  settings.F = parseInt(params[2]);
  settings.N = parseInt(params[3]);
  settings.B = parseInt(params[4]);
  settings.T = parseInt(params[5]);

  for(let i = 0; i < settings.N; i++) {
    params = lines[i + 1].split(' ');
    let a = parseInt(params[0]);
    let b = parseInt(params[1]);
    let x = parseInt(params[2]);
    let y = parseInt(params[3]);
    let s = parseInt(params[4]);
    let f = parseInt(params[5]);
    let length = Math.abs(a - x) + Math.abs(b - y);
    
    if(Math.max(a + b, s) + length <= f) {
      let ride = new Ride(i, a, b, x, y, s, f, length);
      rides.addRide(ride);
    }
  }

  for(let j = 0; j < settings.F; j++) {
    let vehicle = new Vehicle(j);
    vehicles.addVehicle(vehicle);
  }

  return true;
}

function exportVehicles() {
  let content = "";

  for(vehicle of vehicles.getVehicles()) {
    content += vehicle.completedRides.length;

    for(ride of vehicle.completedRides) {
      content += " " + ride.id;
    }
    content += "\n";
  }

  fs.writeFileSync(__dirname + '/output/' + settings.filename + '.out', content, {encoding: 'ascii'});
}

module.exports.parseFile = parseFile;
module.exports.exportVehicles = exportVehicles;

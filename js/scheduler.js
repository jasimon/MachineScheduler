var Scheduler = (function() {
  var machines = {};
  var locations = ["KHQ", "NCI", "SIMON", "Maintenance"];
  var types = ["Patrolling", "On-site Maintenance", "Off-site Maintenance", "Demonstration", "Transportation"];
  for (var i = 1; i < 5; i++) {
    machines['MIN' + i] = {
      name: 'MIN' + i,
      events: []
    }
  }
  machines['MIN1'].events =  [{start : '2015-11-11', end: '2015-11-12'},
                     {start: '2015-11-14', end: '2015-11-17'},
                     {start: '2015-11-19', end: '2015-11-23'}];
  function addEvent(machineId, start, end, location, type) {
    var machine = machines[machineId];
    var newEvent = {
      start: start, 
      end: end,
      location: location,
      type: type,
      title: type + ' at ' + location
    };
    machine.events.push(newEvent);
  }

  function checkOverlap(machineId, start, end) {
    var machine = machines[machineId];
    for (var i = 0; i < machine.events.length; i++) {
      if(start < machine.events[i].end && end > machine.events[i].start) {
        return true;
      }
    }
    return false;
  }

  function getMachines() {
    return Object.keys(machines);
  }

  function getMachineSchedule(machineId) {
    return machines[machineId].events;
  }

  function removeEvent(machineId, start) {
    var machine = machines[machineId];
    for (var i = 0; i < machine.events.length; i++) {
      if(machine.events[i].start === start) {
        machine.events.splice(i,1);
        return;
      }
    }
    console.error('no event found')
  }

  return {
    addEvent: addEvent,
    checkOverlap: checkOverlap,
    getMachines: getMachines,
    getMachineSchedule: getMachineSchedule,
    removeEvent: removeEvent,
    locations: locations,
    types: types
  }
})();
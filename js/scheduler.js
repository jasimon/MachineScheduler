var Scheduler = (function() {
  var machines = {};
  var locations = ["KHQ", "NCI", "SIMON", "Maintenance"];
  var types = ["Patrolling", "On-site Maintenance", "Off-site Maintenance", "Demonstration", "Transportation"];
  for (var i = 1; i <= 15; i++) {
    machines['MIN' + i] = {
      name: 'MIN' + i,
      events: [],
      currId: 0,
    }
  }

  function addEvent(machineId, start, end, location, type) {
    var machine = machines[machineId];
    var newEvent = {
      id: ++machine.currId,
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

  function removeEvent(machineId, id) {
    var machine = machines[machineId];
    for (var i = 0; i < machine.events.length; i++) {
      if(machine.events[i].id === id) {
        machine.events.splice(i,1);
        return;
      }
    }
    console.error('no event found')
  }

  function updateEvent(machineId, eventId, start, end, location, type) {
    var event = machines[machineId].events.filter(function(event) {
      if (event.id === eventId) {
        return true;
      }
      return false;
    })[0];
    event.start = start;
    event.end = end;
    event.location = location;
    event.type = type;
    event.title = type + ' at ' + location;
  }

  function getMachineEvent(machineId, eventId) {
    return getMachineSchedule(machineId).filter(function(event) {
      if (event.id === eventId) {
        return true;
      }
      return false;
    })[0];
  }

  return {
    addEvent: addEvent,
    checkOverlap: checkOverlap,
    getMachines: getMachines,
    getMachineSchedule: getMachineSchedule,
    removeEvent: removeEvent,
    updateEvent: updateEvent,
    getMachineEvent: getMachineEvent,
    locations: locations,
    types: types
  }
})();
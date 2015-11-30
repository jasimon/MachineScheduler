var Scheduler = (function() {
  var machines = {};
  function addEvent(machineId, start, end, location, type) {
    var machine = machines[machineId];
    var newEvent = {
      start: start, 
      end: end,
      location: location,
      type: type
    };

    if (start > machine.events[machine.events.length-1]) {
      machine.events.push(newEvent);
    } else {
      for (var i = 0; i < machine.events.length; i++) {
        //insert in order
        if (start < machine.events[i].start) {
          machine.events.splice(i, 0, newEvent);
        }  
      }
    }
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

  return {
    addEvent: addEvent
  }
})();
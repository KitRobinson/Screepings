var hiveQueen = {
    
    run: function(spawn, requiredRole){
        
        //scale the creep to available resources!
        var budget = spawn.room.energyAvailable
        
        // set worker stat array based on budget()
        // v2, just loop, adding a base worker module for every 200 in the budget
        var workerStats = []
        while (budget > 200){
            workerStats.push(WORK);
            workerStats.push(MOVE);
            workerStats.push(CARRY);
            budget += -200;
        }
        
        // V1 --- set a bunch of conditions
        // if (budget < 350){
        //     var workerStats = [MOVE, CARRY, WORK]
        // }
        // else if (budget < 550){
        //     var workerStats = [MOVE, MOVE, CARRY, WORK, WORK]
        // }
        // else if (budget < 800){
        //     var workerStats = [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]
        // }
        // else if (budget < 1000){
        //     var workerStats = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK]
        // }
        // else if (budget < 1200){
        //     var workerStats = [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK]
        // }
        
        
        
  
        var canCreate = spawn.canCreateCreep(workerStats, "clone" + spawn.memory.birthed, {role: requiredRole})
        if (canCreate == ERR_NAME_EXISTS){
            spawn.memory.birthed += 1;
        }
        else if (canCreate == OK) {    
            spawn.createCreep(workerStats, "clone" + spawn.memory.birthed, {role: requiredRole})
            console.log ("found " + budget + " and birthed " + spawn.memory.birthed + " a " + requiredRole + " size " + workerStats.length );
            spawn.memory.birthed += 1;
        }    
    }
}

module.exports = hiveQueen
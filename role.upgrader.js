var roleUpgrader = {
    
    run: function(creep){
        
        if(!creep.memory.foodSource){
            var sources = creep.room.find(FIND_SOURCES)
            creep.memory.foodSource = sources[Math.floor(Math.random() * sources.length)].id
        }
        
        if (!creep.memory.spending){
            if(creep.carry.energy < creep.carryCapacity){
                var source = Game.getObjectById(creep.memory.foodSource)
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else{
                var cont = creep.room.controller
                if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont);
                    creep.memory.spending = true;
                }
            }
        }
        else {
            if (creep.carry.energy > 0){
                var cont = creep.room.controller
                if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont);
                    creep.memory.spending = true;
                }
            }
            if (creep.carry.energy == 0){
                creep.memory.spending = false;
            }
        }
    }
}
module.exports = roleUpgrader
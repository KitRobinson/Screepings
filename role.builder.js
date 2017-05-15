var roleHarvester = require('role.harvest')
var roleBuilder = {

    run: function(creep){
        
        if(!creep.memory.foodSource){
            var sources = creep.room.find(FIND_SOURCES)
            creep.memory.foodSource = sources[Math.floor(Math.random() * sources.length)].id
        }
        
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
        if (target) {
            if (!creep.memory.spending){
                if(creep.carry.energy < creep.carryCapacity){
                    var source = Game.getObjectById(creep.memory.foodSource)
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                else{
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        creep.memory.spending = true;
                    }
                }
            } else {
                creep.memory.spending = true;
                if (creep.carry.energy > 0){
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        creep.memory.spending = true;
                    }
                }
                else {
                    creep.memory.spending = false;
                }
            }
        } else {
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.spending = true;
            }
            roleHarvester.run(creep)
        }
    }
}

module.exports = roleBuilder
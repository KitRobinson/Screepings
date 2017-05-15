var pickFoodSource = require('creepHelper.pickFoodSource')
var roleUpgrade = require('role.upgrader')
var roleHarvest = {
    
    run: function(creep){

        //v4.1 - set aside a method to randomize based on availability, and add this to the citizen routine        
        // //randomly assign each creep a favorite food source when possible
        // if(!creep.memory.foodSource){
        //     creep.memory.foodSource = pickFoodSource(creep.room)
        //     creep.say("food source " + creep.memory.foodSource)
        // }
        
        //v2 --- assign creeps to source when they first learn to love harvesting
        
        
        //v1 --- this pick up energy whenever the creep is less than full... which is poor when the creep carries more than an extensions worth of energy
        //   --- or when it is defaulting to other roles.
        
        //v2 --- implement spending in harvester memory
        if(!creep.memory.spending){
            if(creep.carry.energy < creep.carryCapacity){
                //console.log("harvester " + creep.name + "trying to get food at " + creep.memory.foodSource)
                source = Game.getObjectById(creep.memory.foodSource)
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
                // else{
                //     creep.say(creep.harvest(source))
                // }
            }
            else {
                creep.memory.spending = true
            }
        }
        
        // ----------- v1 basic method
        // if(creep.carry.energy < creep.carryCapacity){
        //     //console.log("harvester " + creep.name + "trying to get food at " + creep.memory.foodSource)
        //     var sources = creep.room.find(FIND_SOURCES)
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0]);
        //     }
        // }
        
        else {
            // set spending toggle to true
            creep.memory.spending = true;
            
            // choose a reasonable container to deposit into
            homeSpawn = Game.spawns["RexRose"]
            
            if (homeSpawn.energy < homeSpawn.energyCapacity){
                if (creep.transfer(homeSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(homeSpawn);
                }
            }
            // if the spawn is full, find an extension
            else {
                var tExtension = (Game.getObjectById(creep.memory.targetExtension))
                if (tExtension && tExtension.energy < tExtension.energyCapacity){
                    if (creep.transfer(tExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tExtension);
                    }
                }
                else{
                    var acted = 0
                    // v1 - works but screeps change their mind about their target extension, apparently ordering of exensions[] is not auto-enforced
                    var extensions = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }})
                    // v2 - store targetted exension in creem memory to enforce more consistent behaviour
                    for (id in extensions){
                            if(acted == 0 && extensions[id].energy < extensions[id].energyCapacity){
                            creep.memory.targetExtension = extensions[id].id
                            if (creep.transfer(extensions[id], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(extensions[id]);
                                var acted = 1
                            }
                        }
                    }     
                }
            }
            if (acted == 0){
                roleUpgrade.run(creep)
            }
            // and if the creep is empty, set spending to false
            if (creep.carry.energy == 0){
                creep.memory.spending = false;
            }
        }
        
        // // v1 - just to source
        // else {
        //     // choose a reasonable container to deposit into
            
        //     if (creep.transfer(Game.spawns["RexRose"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(Game.spawns["RexRose"]);
        //     }
        //     else {
        //         creep.say(creep.transfer(Game.spawns["RexRose"], RESOURCE_ENERGY))
        //     }
        // }
    }
};
  
module.exports = roleHarvest;
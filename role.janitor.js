var roleHarvester = require('role.harvest')
var roleJanitor = {
    
    run: function(creep){
        
        //designate this creep a preferred foodSource if it lacks one
        if(!creep.memory.foodSource){
            var sources = creep.room.find(FIND_SOURCES)
            creep.memory.foodSource = sources[Math.floor(Math.random() * sources.length)].id
        }
        
        //locate an action target...
        
        //find all structures in need of repair
        var repairables = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
        
        //choose the closest one
        var target = creep.pos.findClosestByRange(repairables);
        
        //todo... should there be a PRIORITY targets thing, which sets nearly collapsed entities as the repair target?
            // that only makes sense in the event of a janitor shortage...
            // perhaps we should periodically test for badly damaged structues and then create a new janitor if needed.
        
        //if there is a valid target
        if (target) {
            
            //and you are NOT in the middle of repairs
            if (!creep.memory.spending){
                //and you have less than full energy
                if(creep.carry.energy < creep.carryCapacity){
                    //get energy
                    var source = Game.getObjectById(creep.memory.foodSource)
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                //if you DO have full energy
                else{
                    //goto and repair the target
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        //and remember that you are doing it!
                        creep.memory.spending = true;
                    }
                }
            //if you are already in the middle of repairs
            } else {
                //and youo have energy
                if (creep.carry.energy > 0){
                    //goto and repair the target
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        creep.memory.spending = true;
                    }
                }
                //if you DONT have energy
                else {
                    //cease repairs
                    creep.memory.spending = false;
                    //and get energy
                    var source = Game.getObjectById(creep.memory.foodSource)
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        //if there are no valid targets
        } else {
            //function as a harvester
            roleHarvester.run(creep)
        }
    }
}

module.exports = roleJanitor
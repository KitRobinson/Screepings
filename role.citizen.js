var pickFoodSource = require('creepHelper.pickFoodSource')
var roleCitizen = {

    //this is for flag planting, at the moment for road planning purposes
    run: function(creep){
        
        // pick foodsource
        if(!creep.memory.foodSource){
            creep.memory.foodSource = pickFoodSource.run(creep.room)
            creep.say("food source " + creep.memory.foodSource)
        }
        
        //if the creep has any fatigue
        var thisRoom = creep.room
        if (creep.fatigue > 0){
        // plant or upgrade flag. (removing inappropriate flags is done by the colony flag manager)
            var hereFlag = creep.pos.lookFor(LOOK_FLAGS)
            // if there is alrady a flag, and it is a white road-flag
            if (hereFlag.length > 0 && hereFlag[0].color == COLOR_WHITE){
                //increment its visit counter
                hereFlag[0].memory.visits += 1
                creep.say("visits:" + hereFlag[0].memory.visits)
            }
            //if there is no flag, make a white road-flag
            else {
                var newFlag = creep.pos.createFlag(undefined, COLOR_WHITE, COLOR_WHITE, {visits: 1});
            }
        }
    }
}

module.exports = roleCitizen
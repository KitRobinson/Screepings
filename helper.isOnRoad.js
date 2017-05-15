var isOnRoad = {
    
    run: function(position){
        structs = position.lookFor(LOOK_STRUCTURES)
        if (structs.length > 0){
            for(s in structs){
                if(structs[s].structureType = STRUCTURE_ROAD){
                    return true
                }
            }
        }
        else{
            return false;
        }
    }    
}

module.exports = isOnRoad
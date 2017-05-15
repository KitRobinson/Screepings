var isOnRoad = require('helper.isOnRoad')
var isOnRoadConstruction = require('helper.isOnRoadConstruction')
var roadFlagger = {
    
    //the colony roadflagger runs through all the roadflags in a room.  It ticks them down to degrade them, and alternately places a road construction requst if the flag has a high enough value
    run: function(room){
        console.log("---- Road Flagging REPORT ---- ")
        var roadFlags = room.find(FIND_FLAGS, {filter: {color: COLOR_WHITE}})
        console.log("---- Flags Found: " + roadFlags.length)
        for (f in roadFlags){
            // go through each flag.
            
            // if it is on a road or a road construction site delete it
            if (isOnRoad.run(roadFlags[f].pos)){
                roadFlags[f].remove()
            }
            else if (isOnRoadConstruction.run(roadFlags[f].pos)){
                roadFlags[f].remove()
            }
            else {
                roadFlags[f].memory.visits += -1;
                if (roadFlags[f].memory.visits < 1){
                    roadFlags[f].remove()
                }
                else if (roadFlags[f].memory.visits > 5){
                    console.log(roadFlags[f].pos.createConstructionSite(STRUCTURE_ROAD))
                }
            }
            // remove one from its visit count
            // if it has no visits, delet it
            // if it has 5 visits, build road here.
        }
    }
    
}

module.exports = roadFlagger
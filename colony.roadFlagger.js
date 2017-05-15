var roadFlagger = {
    
    //the colony roadflagger runs through all the roadflags in a room.  It ticks them down to degrade them, and alternately places a road construction requst if the flag has a high enough value
    run: function(room){
        var roadFlags = room.find(FIND_FLAGS, {filter: {color: COLOR_WHITE}})
        console.log(roadFlags.length)
    }
    
}

module.exports = roadFlagger
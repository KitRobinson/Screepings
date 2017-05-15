//takes a roomposition, an object type, and optionally a subtype (such as (roomPos, 'structure', STRUCTURE_ROAD) and returns an array of all adjacent matches

var getAdjacentObjects = {
    
    //subType is intended to be optional here
    run: function(roomPos, oType, subType){
        var thisRoom = Game.rooms[roomPos.roomName];
        var adjacents = []
        for (var i = -1; i < 2; i++){
            for (var j = -1; j < 2; j++){
                //avoid testing the position itself!
                if (i != 0 || j != 0){
                    //look for a structure at each location
                    var f = thisRoom.lookForAt(oType, roomPos.x + i, roomPos.y + j)
                    //if we found an object of type 
                    if (f[0] != undefined){
                        //match subtype if any....
                        //GRRRRR - looks like objects have different methods for getting their type!
                        if (subType != undefined){
                            if(oType == "structure"){
                                if (f[0].structureType == subType){
                                    adjacents.push(f[0])
                                }
                            }
                        }
                        //if there is no declared subtype
                        else {
                            //just add the object
                            adjacents.push(f[0]);
                        }
                    }
                }                    
            }
        }
        return adjacents
    }
}

module.exports = getAdjacentObjects
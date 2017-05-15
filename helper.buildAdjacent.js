var getAdjacentPlains = require('helper.getAdjacentPlains')

var buildAdjacent = {
    
    run: function(roomPos, structType){
        //getting the room room from the roomname is probably somewhat expensive in a large map...
        var thisRoom = Game.rooms[roomPos.roomName]
        
        //right now we are adding possible building locations to this array, then building all of them.
        //if we never do anything with this array, why bother assigning?  we could just build them when we would assign.
        //the eventual purpose for this array is to allow more intelligent placement... I don't think it's overly expensive to placehold.
        //but don't forget to refactor if we don't find advantage!
        var locs = []
        for (var i = -1; i < 2; i++){
            for (var j = -1; j < 2; j++){
                //we may as well avoid testing the position of the building itself!
                if (i != 0 || j != 0){
                    var testLoc = new RoomPosition(roomPos.x + i, roomPos.y +j, roomPos.roomName)
                    //if not blocked by a wall
                    if (thisRoom.lookForAt('terrain', testLoc.x, testLoc.y) != 'wall'){
                        //and has no structures
                        if(thisRoom.lookForAt('structure', testLoc.x, testLoc.y).length == 0){
                            //and no construction sites
                            if(thisRoom.lookForAt('constructionSite', testLoc.x, testLoc.y).length == 0){
                                //and is not adjacent to more than one wall
                                if(getAdjacentPlains.run(testLoc) > 6){
                                //then we can add it to the possibility array!
                                    locs.push(new RoomPosition(roomPos.x + i, roomPos.y + j, roomPos.roomName))
                                }
                            }
                        }
                    }
                }
            }
        }
        for(site in locs){
            thisRoom.createConstructionSite(locs[site], structType)
        }
        
    }
    
}
module.exports = buildAdjacent
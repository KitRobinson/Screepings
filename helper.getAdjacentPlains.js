var getAdjacentPlains = {
    
    run: function(position){
        var thisRoom = Game.rooms[position.roomName];
        var adjacentWalls = 0
        for (var i = -1; i < 2; i++){
            for (var j = -1; j < 2; j++){
                //avoid testing the position itself!
                if (i != 0 || j != 0){
                    //look for a plains at each location
                    var p = new RoomPosition(position.x + i, position.y + j, position.roomName)
                    var t = p.lookFor('terrain')
                    if (t == 'wall'){
                        adjacentWalls += 1
                    }
                }
            }
        }
        return (8 - adjacentWalls)
    }
}

module.exports = getAdjacentPlains
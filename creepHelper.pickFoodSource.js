var getAdjacentPlains = require('helper.getAdjacentPlains')
var pickFoodSource = {

    run: function(thisRoom){
        
        //set up a counting array
        var chances = []
        //for each source in the room
        var sources = thisRoom.find(FIND_SOURCES)
        for(s in sources){
            //get its adjacent openings
            opens = getAdjacentPlains.run(sources[s].pos)
            //and add it to the chance array once for each opening
            for(var i = 0; i < opens; i++){
                chances.push(sources[s].id)
            }
        }
        //return a random id, weighted by number of times in the array
        return chances[Math.floor(Math.random(chances.length))]
    }    
}

module.exports = pickFoodSource
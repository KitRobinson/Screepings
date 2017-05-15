var buildAdjacent = require('helper.buildAdjacent')
var getAdjacentObjects = require('helper.getAdjacentObjects')
var colonyArchitect = {
    
    run: function(spawn){
        //decide what buildings, if any, are needed
        
        //find out how many buildings exist
        var spawnPresent = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_SPAWN }}).length
        var extensionPresent = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).length
        var containerPresent = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER}}).length
        var towerPresent = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER}}).length
        var storagePresent = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER}}).length
        
        //find out how many buildings we CAN make
        
        //start with the controller level
        var cLevel = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_CONTROLLER }})[0].level
        
        var spawnMax = 0;
        var extensionMax = 0;
        var containerMax = 5;
        var towerMax = 0;
        var storageMax = 0;
        
        if (cLevel == 1){
            spawnMax = 1;
        }
        else if (cLevel == 2){
            spawnMax = 1;
            extensionMax = 5;
        }
        else if (cLevel == 3){
            spawnMax = 1;
            extensionMax = 10;
            towerMax = 1;
        }
        else if (cLevel == 4){
            spawnMax = 1;
            extensionMax = 20;
            towerMax = 1;
            storageMax = 1;
        }
        // this can continue to higher tower levels, of course
        
        var spawnAvail = spawnMax - spawnPresent
        var extensionAvail = extensionMax - extensionPresent
        var containerAvail = containerMax - containerPresent
        var towerAvail = towerMax - towerPresent
    
    
        if (extensionAvail > 1){
            //if we can build an extension, build an extension!
            
            
            
            //for now lets just collect them near other extensions.
            
            //find other extensions
            var exts = spawn.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
            
            // v1: choose one randomly, and remove it from the array
            // var ext = exts.splice(Math.floor(Math.random(exts.length)),1)
            
            // v2: while that worked, I'd rather only run this code periodically, so selecting an unbuildable extension could waste a lot of time.
            // instead lets do ALL that we can... if we want to subsection them later, then roads makes good sense.
            
            while(exts.length > 0){
                
                // store its current position
                var ext = exts.splice(Math.floor(Math.random(exts.length)),1)
                var loc = ext[0].pos
                
                buildAdjacent.run(loc, STRUCTURE_EXTENSION)
            
            }    
            //now what do do if we failed to find a valid extension-extending site?
            
            // if there are no active construction sites, we will have to look harder for a place to build!
            //first lets find out if there are, in fact, active sites.
            var activeSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_EXTENSION}})
            
            //first lets try adjacent to the spawn
            if (activeSites.length == 0){
                buildAdjacent.run(spawn.pos, STRUCTURE_EXTENSION)
            }
            
            //if that didn't work...
            var activeSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_EXTENSION}})
            if (activeSites.length == 0){
                
                console.log("trying via getAdjacentRoads method")
                // then we should try adjacent to a road which is adjacent to at least 3 extensions
                // because at least hypothetically, I intend to use that as a condition for building roads
                
                // in order to do this efficiently, we should start from the extensions... as there are fewer of them.
                var exts = spawn.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
                var locatedRoads = {}
                for (x in exts){
                    //find roads adjacent to the extension
                    var adjRoads = getAdjacentObjects.run(exts[x].pos, 'structure', 'road')
                    //then for each of those roads, get the ID
                    roadIds = []
                    for (r in adjRoads){
                        roadIds.push(adjRoads[r].id)
                    }
                    //then check to see if the ID is already in the loactedRoads array... no, better yet, lets make that a HASH and add one to the value!
                    for (i in roadIds){
                        //if this is a new road, add it at 0
                        if (locatedRoads[roadIds[i]] == null){
                            locatedRoads[roadIds[i]] = 0;
                        }
                        //either way, add 1 to the count of times it has appeared
                        locatedRoads[roadIds[i]] += 1
                    }
                }
                //once the locatedroads object is filled with all roads and counts... we remove all elements with less than 3!
                for(rid in locatedRoads){
                    if (locatedRoads[rid] < 3){
                        delete locatedRoads[rid];
                    }
                }
                //then build adjacent to each of the located roads!
                for(rid in locatedRoads){
                    buildAdjacent.run(Game.getObjectById(rid).pos, STRUCTURE_EXTENSION)
                }
            }
        }
    }
}

module.exports = colonyArchitect

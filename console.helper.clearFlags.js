var clearFlags = {
    
    run: function(thisRoom){
        var badFlags = thisRoom.find(FIND_FLAGS)
        for (i in badFlags){
            badFlags[i].remove()
        }
    }
}

module.exports = clearFlags
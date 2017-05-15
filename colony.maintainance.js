var maintainance = {
    
    run: function(){
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        for(var i in Memory.flags) {
            if(!Game.flags[i]) {
                delete Memory.flags[i];
            }
        }
    }
}

module.exports = maintainance
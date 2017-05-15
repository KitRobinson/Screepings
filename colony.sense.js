var hiveQueen = require('role.hivequeen')

var colonySense = {
    
    run: function(){
        
        var desiredHarvesters = 4
        var harvesters = 0
        var desiredUpgraders = 4
        var upgraders = 0
        var desiredBuilders = 4
        var builders = 0
        var desiredJanitors = 1
        var janitors = 0
        
        for (var name in Game.creeps){
            creep = Game.creeps[name]
            if (creep.memory.role == "upgrader"){
                upgraders += 1;
            }
            else if (creep.memory.role == "builder"){
                builders += 1;
            }
            else if (creep.memory.role == "harvester"){
                harvesters += 1;
            }
            else if (creep.memory.role == "janitor"){
                janitors += 1;
            }
        }
        
        //  --------V1 - demonstrated a loop where this gets stuck promoting the same creep... why?
        //  --------answer - the idea should be to assign x, not x - assinged.
        //  --------unfortunately, this wont be a good method when we are assigning many roles
        
        // for (var i = 0; i < desiredUpgraders - upgraders; i++){
        //     var name = Object.keys(Game.creeps)[i]
        //     Game.creeps[name].memory.role = "upgrader"
        //     console.log ("promoted " + name + " to upgrader")
        // }
        
        // ----------V2 - seems like a cool plan, except this seems memory intensive
        // while (upgraders < desiredUpgraders){
        //     for (var name in Game.creeps){
        //         if (Game.creeps[name].memory.role == "harvester"){
        //             Game.creeps[name].memory.role = "upgrader";
        //             upgraders += 1;
        //             console.log("promoted " + name + " to upgrader")
        //             break;
        //         }
        //     }
        // }
        
        // while (builders < desiredBuilders){
        //     for (var name in Game.creeps){
        //         if (Game.creeps[name].memory.role == "harvester"){
        //             Game.creeps[name].memory.role = "builder";
        //             upgraders += 1;
        //             console.log("promoted " + name + " to builder")
        //             break;
        //         }
        //     }
        // }
        
        // -----------V3, just birth whatever is missing
        
        if (harvesters < desiredHarvesters) {
            hiveQueen.run(Game.spawns["RexRose"], "harvester")
        }
        else if (upgraders < desiredUpgraders){
            hiveQueen.run(Game.spawns["RexRose"], "upgrader")
        }
        else if (builders < desiredBuilders){
            hiveQueen.run(Game.spawns["RexRose"], "builder")
        }
        else if (janitors < desiredJanitors){
            hiveQueen.run(Game.spawns["RexRose"], "janitor")
        }
    }
};

module.exports = colonySense
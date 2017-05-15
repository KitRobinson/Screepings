var reportStatus = {
    
    run: function(){
        
        var desiredHarvesters = 3
        var harvesters = 0
        var desiredUpgraders = 6
        var upgraders = 0
        var desiredBuilders = 3
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
        console.log(" ------ REPORT ------")
        console.log("time " + Game.time)
        console.log("energy " + Game.spawns["RexRose"].room.energyAvailable)
        console.log("harvesters: " + harvesters);
        console.log("upgraders: " + upgraders);
        console.log("builders " + builders);
        console.log("janitors " + janitors);
    }
}
module.exports = reportStatus
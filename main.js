var roleHarvest = require('role.harvest')
var hiveQueen = require('role.hivequeen')
var roleUpgrader = require('role.upgrader')
var colonySense = require('colony.sense')
var roleBuilder = require('role.builder')
var roleJanitor = require('role.janitor')
var colonyMaintainance = require('colony.maintainance')
var reportStatus = require('report.status')
var colonyArchitect = require('colony.architect')
var colonyRoadFlagger = require('colony.roadFlagger')
var roleCitizen = require('role.citizen')
//require('colony.behaviourconstants')

module.exports.loop = function () {
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        
        roleCitizen.run(creep)
        
        if (creep.memory.role == "harvester"){
            roleHarvest.run(creep)
        }
        else if (creep.memory.role == "upgrader"){
            roleUpgrader.run(creep)
        }
        else if (creep.memory.role == "builder"){
            roleBuilder.run(creep)
        }
        else if (creep.memory.role == 'janitor'){
            roleJanitor.run(creep)
        }
        

    }
    
    //hiveQueen.run(Game.spawns["RexRose"]);
    //run these only occasionally, as they are not always needed

    if (Game.time % 50 == 0) {
        colonyMaintainance.run();
        reportStatus.run();
        colonySense.run();
        colonyRoadFlagger.run(Game.spawns["RexRose"].room)
        colonyArchitect.run(Game.spawns["RexRose"])
    }
    
}
//Author: Yu Xu @ sjsu May2018


pragma solidity ^0.4.6;

contract HomeSafeFactory{
    address[] deployedHomeSafes;
    
    function createHomeSafe() public {
        address newHomeSafe = new HomeSafe(msg.sender);
        deployedHomeSafes.push(newHomeSafe);
    }
    
    function getDeployedHomeSafes() public view returns (address[]){
        return deployedHomeSafes;
    }
}

contract HomeSafe{    
    struct DoorBellEvent{   
        uint doorBellEventId;        
        string name;        
        uint timestamp;        
        string secret;    
    }  
    
    address public manager;
    DoorBellEvent[] public doorBellEvents; 
    
    constructor(address creator) public {
        manager = creator;
    }
    
    function addNewDoorBellEvent(uint id, string name, string secret) public {        
        DoorBellEvent memory newDoorBellEvent = DoorBellEvent({
            doorBellEventId: id,
            name: name,
            timestamp: now,
            secret: secret
        });
        doorBellEvents.push(newDoorBellEvent);
    }
    
    function getSummary() public view returns(uint, address){
        return (
            doorBellEvents.length,
            manager
        );
    }
    
    function getEventsCount() public view returns(uint){
        return doorBellEvents.length;
    }
}
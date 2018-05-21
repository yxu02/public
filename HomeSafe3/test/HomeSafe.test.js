//Author: Yu Xu @ sjsu May2018


const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/HomeSafeFactory.json');
const compiledHomeSafe = require('../ethereum/build/HomeSafe.json');

let accounts;
let factory;
let homeSafe;
let homeSafeAddress;

beforeEach(async ()=>{
  
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode})
    .send({ from: accounts[0], gas: '1000000'});
  await factory.methods.createHomeSafe().send({
    from: accounts[0], gas:'1000000'
  });
  
  [homeSafeAddress]= await factory.methods.getDeployedHomeSafes().call();
  
  homeSafe = await new web3.eth.Contract(JSON.parse(compiledHomeSafe.interface), homeSafeAddress);
});

describe('HomeSafe', ()=>{
  
  it('contract & factory deployed', ()=>{
    assert.ok(homeSafe.options.address);
    assert.ok(factory.options.address);
  });
  
  it('initiator is manager', async()=>{
    const manager = await homeSafe.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  
  it('doorbell event created by manager', async()=>{
    await homeSafe.methods.addNewDoorBellEvent(1, 'jon', 'secret').send({ from: accounts[0], gas:'1000000' });
    
    const doorBellEvent = await homeSafe.methods.doorBellEvents(0).call();
    const doorBellEventCount = await homeSafe.methods.getEventsCount().call();
    assert.equal(1, doorBellEvent.doorBellEventId);
    assert.equal('jon', doorBellEvent.name);
    assert.equal('secret', doorBellEvent.secret);
    assert((new Date())>doorBellEvent.timestamp);
    assert.equal(1, doorBellEventCount);
  });
});

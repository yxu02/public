//Author: Yu Xu @ sjsu May2018


import web3 from './web3';
import CampaignFactory from './build/HomeSafeFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'xxxxxxxxxxxxxxxxxxxxxxxx'
);

export default instance;
//Author: Yu Xu @ sjsu May2018


import web3 from './web3';
import HomeSafe from './build/HomeSafe.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(HomeSafe.interface),
    address
  );
};

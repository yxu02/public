//Author: Yu Xu @ sjsu May2018


const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildpath = path.resolve(__dirname, 'build');

fs.removeSync(buildpath);

const homesafepath = path.resolve(__dirname, 'contracts', 'HomeSafe.sol');

const source = fs.readFileSync(homesafepath, 'utf8');

const outputs = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildpath);

for (let output in outputs){
  fs.outputJsonSync(
    path.resolve(buildpath, output.replace(':', '') + '.json'),
    outputs[output]
  );
}
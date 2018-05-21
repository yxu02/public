//Author: Yu Xu @ sjsu May2018


const routes = require('next-routes')();

routes
  .add('/homes/new', '/homes/new')
  .add('/homes/:address/events', '/homes/events/events')
  .add('/homes/:address/events/new', '/homes/events/new');

module.exports = routes;
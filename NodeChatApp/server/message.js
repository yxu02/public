const moment = require('moment');
const generateMessage=(from, text)=>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

const generateLocationMessage= (from, lat, lon)=>{
  const loclink = `https://www.google.com/maps?q=${lat},${lon}`;
  return{
    from,
    text: loclink,
    createdAt: moment().valueOf()
  }
};

module.exports={
  generateMessage,
  generateLocationMessage
};
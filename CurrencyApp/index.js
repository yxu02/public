const axios = require('axios');
const yargs = require('yargs');
const keys = require('./config/keys');

const argv = yargs.options({
  from: {
    demand: true,
    describe: "currency CODE to change from",
    string: true
  },
  to: {
    demand: true,
    describe: "currency CODE to change to",
    string: true
  },
  amount: {
    demand: true,
    describe: "amount to be exchanged",
    string: true
  }
}).argv;

const getCurrencyRate = async (from, to)=>{
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${keys.fixerAPIKey}`);
  const rate = response.data.rates[to] / response.data.rates[from];
  return rate;
}

const getCountries = async (currency) =>{
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
  return response.data.map((country)=>country.name);
}

const doCurrencyExchange = async (from, to, amount)=>{
  const rate = await getCurrencyRate(from, to);
  const countries = await getCountries(to);
  const total = (amount * rate).toFixed(2);
  return `Exchanging ${amount} from ${from} to ${to} results in ${total} of ${to} in these countries: ${countries.join(', ')}`;
}

doCurrencyExchange(argv.from, argv.to, argv.amount).then((msg)=>{
  console.log(msg);
});
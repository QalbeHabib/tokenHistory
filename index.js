const { default: axios } = require('axios');
const tokenlist = require('./tokenHistory.json')
const fs = require('fs')


const tokens = Object.keys(tokenlist)


console.log({tokens:tokens.length})

const addresses = [
    // '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42',
    // '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8',
    // '0x10393c20975cF177a3513071bC110f7962CD67da',
    // '0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC',
    // '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
    // '0x164731CD270daA4A94bc70761E53320e48367B8B',
    // '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
    // '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8',
    // '0x5190F06EaceFA2C552dc6BD5e763b81C73293293',
    // '0x99C409E5f62E4bd2AC142f17caFb6810B8F0BAAE',
    // '0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418',
    // '0x6694340fc020c5E6B96567843da2df01b2CE1eb6',
    // '0xD67A097dCE9d4474737e6871684aE3c05460F571',
    // '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8',
    // '0x3082CC23568eA640225c2467653dB90e9250AaA0',
    // '0x912CE59144191C1204E64559FE8253a0e49E6548',
    // '0x088cd8f5eF3652623c22D48b1605DCfE860Cd704',
    // '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    // '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
    // '0x18c11FD286C5EC11c3b683Caa813B77f5163A122',

    // '0xF9DF075716B2D9B95616341DC6bC64c85e56645c',
    // '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
    // '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'
  ]

const apiBase = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/';

const fetchData = async () => {
  const result = {};

  for (const address of addresses) {
    const api = `${apiBase}${address}/market_chart/range?vs_currency=usd&from=1685206813%2C&to=1688563849`;

    try {
      const response = await axios.get(api);
      const data = response.data;

      result[address] = {
        prices: data.prices
      };
    } catch (error) {
      console.error(`Error fetching data for address ${address}:`, error.message);
    }
  }

  const resultJson = JSON.stringify(result, null, 2);
  fs.writeFile('result.json', resultJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Result saved to result.json');
    }
  });
};

fetchData();
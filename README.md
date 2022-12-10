# pancakeswap-price

get token price from pancakeswap

## Installation

```
npm install pancakeswap-price
```

## Method

The module provides the following methods.

- getMidPrice
- getExecutionPrice
- getMidPriceViaETH
- getExecutionPriceViaETH
- getMidPriceViaExactToken
- getExecutionPriceViaExactToken

## Usage

```js
const ethers = require('ethers');
const PancakeswapPrice = require('pancakeswap-price');

const provider = new ethers.providers.JsonRpcProvider('https://bsctestapi.terminet.io/rpc');

async function main() {
  // BSC Testnet
  const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
  const BUSD = '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814';
  const CAKE = '0xFa60D973F7642B748046464e165A65B7323b0DEE';
  const chainId = 97;

  const pancakeswapPrice = new PancakeswapPrice(provider);

  const midPrice = await pancakeswapPrice.getMidPrice(BUSD, 18, 'BUSD', WBNB, 18, 'WBNB', chainId);
  console.log(midPrice); // { base2quote: '7.09228', quote2base: '0.140998' }

  const executionPrice = await pancakeswapPrice.getExecutionPrice(
    BUSD,
    18,
    'BUSD',
    WBNB,
    18,
    'WBNB',
    ethers.utils.parseEther('1'),
    chainId,
  );
  console.log(executionPrice); // 5.3642

  const midPriceViaETH = await pancakeswapPrice.getMidPriceViaETH(
    BUSD,
    18,
    'BUSD',
    CAKE,
    18,
    'CAKE',
    chainId,
  );
  console.log(midPriceViaETH); // { base2quote: '558647000000000', quote2base: '0.00000000000000179004' }

  const executionPriceViaETH = await pancakeswapPrice.getExecutionPriceViaETH(
    BUSD,
    18,
    'BUSD',
    CAKE,
    18,
    'CAKE',
    ethers.utils.parseEther('1'),
    chainId,
  );
  console.log(executionPriceViaETH); // 368109000000000

  const midPriceViaExactToken = await pancakeswapPrice.getMidPriceViaExactToken(
    BUSD,
    18,
    'BUSD',
    CAKE,
    18,
    'CAKE',
    WBNB,
    18,
    'WBNB',
    chainId,
  );
  console.log(midPriceViaExactToken); // { base2quote: '558647000000000', quote2base: '0.00000000000000179004' }

  const executionPriceViaExactToken = await pancakeswapPrice.getExecutionPriceViaExactToken(
    BUSD,
    18,
    'BUSD',
    CAKE,
    18,
    'CAKE',
    WBNB,
    18,
    'WBNB',
    ethers.utils.parseEther('1'),
    chainId,
  );
  console.log(executionPriceViaExactToken); // 368109000000000
}
```

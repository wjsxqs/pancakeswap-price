import invariant from 'tiny-invariant';
import { Token, Pair, CurrencyAmount } from '@pancakeswap/sdk';
import { ethers, Contract } from 'ethers';
import dotenv from 'dotenv';
import UniswapV2PairABI from './abis/UniswapV2Pair.json';

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL || 'https://bsc-dataseed.binance.org',
);

export abstract class Fetcher {
  private constructor() {}

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   */
  public static async fetchPairData(tokenA: Token, tokenB: Token): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID');
    const address = Pair.getAddress(tokenA, tokenB);
    const [reserves0, reserves1] = await new Contract(
      address,
      UniswapV2PairABI,
      provider,
    ).getReserves();
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, balances[0]),
      CurrencyAmount.fromRawAmount(tokenB, balances[1]),
    );
  }
}

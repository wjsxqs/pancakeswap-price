import { Token, Route, Trade, CurrencyAmount, TradeType, WNATIVE as WETH } from '@pancakeswap/sdk';
import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Fetcher } from './fetcher';

export default class PancakeswapPrice {
  private provider: BaseProvider | JsonRpcProvider;

  constructor(provider: BaseProvider | JsonRpcProvider) {
    this.provider = provider;
  }

  getMidPrice = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const pair = await Fetcher.fetchPairData(quote, base, this.provider);
    const route = new Route([pair], base, quote);
    const base2quote = route.midPrice.toSignificant(6);
    const quote2base = route.midPrice.invert().toSignificant(6);

    return {
      base2quote,
      quote2base,
    };
  };

  getExecutionPrice = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    tradeAmount: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const pair = await Fetcher.fetchPairData(quote, base, this.provider);
    const route = new Route([pair], base, quote);
    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(base, tradeAmount),
      TradeType.EXACT_INPUT,
    );

    return trade.executionPrice.toSignificant(6);
  };

  getMidPriceViaETH = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], this.provider);
    const WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, this.provider);
    const route = new Route([WETHbase, quoteWETH], base, quote);
    const base2quote = route.midPrice.toSignificant(6);
    const quote2base = route.midPrice.invert().toSignificant(6);

    return {
      base2quote: base2quote,
      quote2base: quote2base,
    };
  };

  getExecutionPriceViaETH = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    tradeAmount: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], this.provider);
    const WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, this.provider);
    const route = new Route([WETHbase, quoteWETH], base, quote);
    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(base, tradeAmount),
      TradeType.EXACT_INPUT,
    );

    return trade.executionPrice.toSignificant(6);
  };

  getMidPriceViaExactToken = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    midToken: string,
    midDecimal: number,
    midSymbol: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const mid = new Token(chainId, midToken, midDecimal, midSymbol);
    const quoteMid = await Fetcher.fetchPairData(quote, mid, this.provider);
    const midBase = await Fetcher.fetchPairData(mid, base, this.provider);
    const route = new Route([midBase, quoteMid], base, quote);
    const base2quote = route.midPrice.toSignificant(6);
    const quote2base = route.midPrice.invert().toSignificant(6);

    return {
      base2quote: base2quote,
      quote2base: quote2base,
    };
  };

  getExecutionPriceViaExactToken = async (
    baseToken: string,
    baseDecimal: number,
    baseSymbol: string,
    quoteToken: string,
    quoteDecimal: number,
    quoteSymbol: string,
    midToken: string,
    midDecimal: number,
    midSymbol: string,
    tradeAmount: string,
    chainId: number,
  ) => {
    const base = new Token(chainId, baseToken, baseDecimal, baseSymbol);
    const quote = new Token(chainId, quoteToken, quoteDecimal, quoteSymbol);
    const mid = new Token(chainId, midToken, midDecimal, midSymbol);
    const quoteMid = await Fetcher.fetchPairData(quote, mid, this.provider);
    const midBase = await Fetcher.fetchPairData(mid, base, this.provider);
    const route = new Route([midBase, quoteMid], base, quote);
    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(base, tradeAmount),
      TradeType.EXACT_INPUT,
    );

    return trade.executionPrice.toSignificant(6);
  };
}

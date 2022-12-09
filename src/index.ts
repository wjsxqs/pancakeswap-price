import { Token, Route, Trade, CurrencyAmount, TradeType, WNATIVE as WETH } from '@pancakeswap/sdk';
import { Fetcher } from './fetcher';

const getMidPrice = async (
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
  const pair = await Fetcher.fetchPairData(quote, base);
  const route = new Route([pair], base, quote);
  const base2quote = route.midPrice.toSignificant(6);
  const quote2base = route.midPrice.invert().toSignificant(6);

  return {
    base2quote,
    quote2base,
  };
};

const getExecutionPrice = async (
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
  const pair = await Fetcher.fetchPairData(quote, base);
  const route = new Route([pair], base, quote);
  const trade = new Trade(
    route,
    CurrencyAmount.fromRawAmount(base, tradeAmount),
    TradeType.EXACT_INPUT,
  );

  return trade.executionPrice.toSignificant(6);
};

const getMidPriceViaETH = async (
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
  const quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId]);
  const WETHbase = await Fetcher.fetchPairData(WETH[chainId], base);
  const route = new Route([WETHbase, quoteWETH], base, quote);
  const base2quote = route.midPrice.toSignificant(6);
  const quote2base = route.midPrice.invert().toSignificant(6);

  return {
    base2quote: base2quote,
    quote2base: quote2base,
  };
};

const getExecutionPriceViaETH = async (
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
  const quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId]);
  const WETHbase = await Fetcher.fetchPairData(WETH[chainId], base);
  const route = new Route([WETHbase, quoteWETH], base, quote);
  const trade = new Trade(
    route,
    CurrencyAmount.fromRawAmount(base, tradeAmount),
    TradeType.EXACT_INPUT,
  );

  return trade.executionPrice.toSignificant(6);
};

const getMidPriceViaExactToken = async (
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
  const quoteMid = await Fetcher.fetchPairData(quote, mid);
  const midBase = await Fetcher.fetchPairData(mid, base);
  const route = new Route([midBase, quoteMid], base, quote);
  const base2quote = route.midPrice.toSignificant(6);
  const quote2base = route.midPrice.invert().toSignificant(6);

  return {
    base2quote: base2quote,
    quote2base: quote2base,
  };
};

const getExecutionPriceViaExactToken = async (
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
  const quoteMid = await Fetcher.fetchPairData(quote, mid);
  const midBase = await Fetcher.fetchPairData(mid, base);
  const route = new Route([midBase, quoteMid], base, quote);
  const trade = new Trade(
    route,
    CurrencyAmount.fromRawAmount(base, tradeAmount),
    TradeType.EXACT_INPUT,
  );

  return trade.executionPrice.toSignificant(6);
};

export default {
  getMidPrice,
  getExecutionPrice,
  getMidPriceViaETH,
  getExecutionPriceViaETH,
  getMidPriceViaExactToken,
  getExecutionPriceViaExactToken,
};

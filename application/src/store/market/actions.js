import axios from 'axios'
export const getCryptos = (state) => {
  const source = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
  axios.get(source)
    .then((res) => {
      state.cryptos = res.data
    })
}

export const getMarketData = (state) => {
  const source = 'https://api.coinmarketcap.com/v1/global/'
  axios.get(source)
    .then((res) => {
      const globalData = res.data
      state.totalMarketCap = globalData.total_market_cap_usd
      state.activeCurrencies = globalData.active_currencies
      state.activeMarkets = globalData.active_markets
    })
}

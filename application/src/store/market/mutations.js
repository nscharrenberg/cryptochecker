import axios from 'axios'

export const setCryptos = (state) => {
  const source = 'https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=10'
  axios.get(source)
    .then((res) => {
      state.cryptos = res.data.data
      Object.values(state.cryptos).forEach(crypto => {
        crypto.quotes.EUR.isPositiveChange = !(crypto.quotes.EUR.percent_change_24h.toString().indexOf('-') > -1)
        crypto.quotes.EUR.priceChangeInPercentage = crypto.quotes.EUR.percent_change_24h.toString().replace(/^-/, '')
      })
    })
    .catch((err) => console.log(err))
}

export const setMarketData = (state) => {
  const source = 'https://api.coinmarketcap.com/v2/global/'
  axios.get(source)
    .then((res) => {
      const globalData = res.data
      state.totalMarketCap = globalData.total_market_cap_usd
      state.activeCurrencies = globalData.active_currencies
      state.activeMarkets = globalData.active_markets
    })
}

import axios from 'axios'

export const setCryptos = (state) => {
  const source = 'https://api.coinmarketcap.com/v2/ticker/?convert=EUR'
  const otherData = require('assets/cryptocurrencies.json')
  axios.get(source)
    .then((res) => {
      state.cryptos = res.data.data
      Object.values(state.cryptos).forEach(crypto => {
        crypto.quotes.EUR.isPositiveChange = !(crypto.quotes.EUR.percent_change_24h.toString().indexOf('-') > -1)
        crypto.quotes.EUR.priceChangeInPercentage = crypto.quotes.EUR.percent_change_24h.toString().replace(/^-/, '')
        var foundJsonData = otherData[crypto.symbol]
        var undefinedImage = 'assets/crypto/undefined.png'
        var undefinedIcon = 'assets/crypto/icons/undefined.png'
        crypto.image = foundJsonData != null ? foundJsonData.image != null ? foundJsonData.image : undefinedImage : undefinedImage
        crypto.icon = foundJsonData != null ? foundJsonData.icon != null ? foundJsonData.icon : undefinedIcon : undefinedIcon
      })
    })
    .catch((err) => console.log(err))
}

export const setMarketData = (state) => {
  const source = 'https://api.coinmarketcap.com/v2/global/?convert=EUR'
  axios.get(source)
    .then((res) => {
      const globalData = res.data.data
      state.totalMarketCap = globalData.quotes.EUR.total_market_cap
      state.activeCurrencies = globalData.active_cryptocurrencies
      state.activeMarkets = globalData.active_markets
    })
}

export const updateCrypto = (state, params) => {
  console.log('Index: ' + params.index)
  console.log('Crypto Id: ' + params.crypto.symbol)
  Object.values(state.cryptos).splice(params.index, 1, params.crypto)
}

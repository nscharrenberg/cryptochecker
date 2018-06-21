<template>
  <div>
    <div class="flex flex-center">
      <div class="q-display-2 text-weight-bold text-white text-center">Total Market Capital: &euro;{{marketCapital.toLocaleString()}}</div>
    </div>
    <div class="row">
      <q-card inline class="q-ma-sm" v-for="(crypto, index) in Object.values(marketState).slice(0, 12)" :key="crypto.id">
        <q-card-media>
          <img :src="crypto.image" style="margin-bottom: 15px" @error="imageLoadError(crypto, index)">
          <q-card-title class="title" slot="overlay">
            {{crypto.name}}
            <span slot="subtitle" class="title price-title">
              &euro;{{getPrice(crypto, "EUR")}}
              <span :class="{'positive-percent-change': crypto.quotes.EUR.isPositiveChange, 'negative-percent-change': !crypto.quotes.EUR.isPositiveChange}"> {{crypto.quotes.EUR.percent_change_24h}}%
                  <q-icon name="arrow_upward" size="12px"/>
                  <q-icon name="arrow_downward" size="12px"/>
                </span>
            </span>
          </q-card-title>
        </q-card-media>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {

  // name: 'ComponentName',
  data () {
    return {
    }
  },
  computed: {
    marketState: {
      get () {
        return this.$store.state.market.cryptos
      },
      set () {
        this.$store.commit('market/setCryptos')
      }
    },
    marketCapital: {
      get () {
        return this.$store.state.market.totalMarketCap
      },
      set () {
        this.$store.commit('market/setMarketData')
      }
    }
  },
  methods: {
    getPercentageDiffirence (crypto) {
      crypto.quotes.EUR.isPositiveChange = !(crypto.quotes.EUR.percent_change_24h.toString().indexOf('-') > -1)
      crypto.quotes.EUR.priceChangeInPercentage = crypto.quotes.EUR.percent_change_24h.toString().replace(/^-/, '')
    },
    getPrice (crypto, valuta) {
      return Number(crypto.quotes.EUR.price).toFixed(3)
    },
    getPercentageOfChangedPricein24h (crypto) {
      return crypto.quotes.EUR.percent_change_24h
    },
    imageLoadError (crypto, index) {
      console.log('Image for ' + crypto.symbol + ' was not found.')
      crypto.image = '/assets/crypto/undefined.png'
    }
  }
}
</script>

<style lang="stylus">
  .bigger {
    width 450px
    max-width 90vw
  }

  @media (max-width $breakpoint-xs-max) {
    .q-card {
      width 100%
    }
  }

  .q-card {
    background-color: initial;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 50px 5px rgba(0,0,0,.25);
    width 300px
    min-height: 150px

    @media screen and (max-width: $medium) {
      max-width: 300px;
      display: block;
      margin: 0 auto;
    }

    @media screen and (max-width: $small) {
      max-width: 200px;
    }

    &:hover {
      border-radius: 4px;
      box-shadow: 0 0 5px 0 #c40000;
      transition: .5s;
    }

    .q-card-media {
      .image {
        top: -15px;

        img {
          @media screen and (max-width: $small) {
            height: 90%;
            width: 90%;
            margin: 0 auto;
          }
        }
      }
    }
  }

  .q-card-media-overlay {
    background-color: transparent;
  }

  .light {
    color: #fff;
    text-align center;
  }

  .title em,
  .title span,
  .subtitle em,
  .subtitle span {
    font-weight: 300;
  }

  .title strong,
  .subtitle strong {
    font-weight: 500;
  }

  .title .tag,
  .subtitle .tag {
    vertical-align: middle;
  }

  .title {
    color: #fff;
    text-align center;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.125;
  }

  .title strong {
    color: inherit;
  }

  .title + .highlight {
    margin-top: -0.75rem;
  }

  .title:not(.is-spaced) + .subtitle {
    margin-top: -1.5rem;
  }

  .price-title {
    font-size: 1.0rem;
    font-weight: 600;

    .positive-percent-change {
      font-size: 0.9em;
      color: #00d1b2;

      .arrow-down {
        display: none;
      }
    }

    .negative-percent-change {
      font-size: 0.9em;
      color: #ff3860;

      .arrow-up {
        display: none;
      }
    }
  }

  .price-title-iframe {
    font-size: 0.9rem;
  }
</style>

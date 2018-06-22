<template>
  <q-page padding>
    <q-page-sticky position="left" :offset="[18, 18]">
      <router-link to="/">
        <div class="hover-icon">
          <q-icon color="white" size="2em" name="keyboard_arrow_left" />
        <p><small class="text-white">Return</small></p>
        </div>
      </router-link>
    </q-page-sticky>
    <div class="row text-center">
      <div class="col-6 image-section">
        <img :src="selectedCrypto.imageLarge" class="crypto-image" style="margin-bottom: 15px" @error="imageLoadError(crypto, index)">
        <h1 class="cryptoCurrency-title text-white">{{ selectedCrypto.name }}</h1>
        <q-chip color="red-14">
          Rank {{ selectedCrypto.rank }}
        </q-chip>
        <p class="cryptoCurrency-description text-white">{{ selectedCrypto.description }}</p>
        <a v-bind:href="selectedCrypto.code"><q-icon name="link" size="2em" color="white" class="q-pa-xl hover-icon"/></a>

        <a v-bind:href="selectedCrypto.code"><q-icon name="insert_drive_file" size="2em" color="white" class="q-pa-xl hover-icon"/></a>
        <a v-bind:href="selectedCrypto.code"><q-icon name="code" size="2em" color="white" class="q-pa-xl hover-icon"/></a>
      </div>
      <div class="col-6 information-section">
        <div class="price-section">
          <p class="price-tag text-white">Current Price</p>
          <p class="price-amount text-white">&euro; {{ Number(selectedCrypto.quotes.EUR.price).toFixed(3).toLocaleString() }}
            <small :class="{'positive-percent-change': selectedCrypto.quotes.EUR.isPositiveChange, 'negative-percent-change': !selectedCrypto.quotes.EUR.isPositiveChange}">
              ({{ selectedCrypto.quotes.EUR.priceChangeInPercentage }}%)
            </small>
          </p>
        </div>
        <div class="price-section text-white">
          <p class="price-tag">Circulating Supply</p>
          <p class="price-amount">{{ selectedCrypto.total_supply.toLocaleString() }} <b :class="{'positive-percent-change': selectedCrypto.quotes.EUR.isPositiveChange, 'negative-percent-change': !selectedCrypto.quotes.EUR.isPositiveChange}">{{ selectedCrypto.symbol }}</b></p>
        </div>
        <div class="price-section text-white">
          <p class="price-tag">Market Capital</p>
          <p class="price-amount">&euro; {{ selectedCrypto.quotes.EUR.market_cap.toLocaleString() }} </p>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    imageLoadError (crypto, index) {
      console.log('Image for ' + crypto.symbol + ' was not found.')
      crypto.imageLarge = '/assets/crypto/large/undefined.png'
    }
  },
  computed: {
    selectedCrypto: {
      get () {
        return this.$store.state.market.selectedCrypto
      },
      set () {
        this.$store.commit('market/addCryptoById', this.$route.params.id)
      }
    }
  },
  created () {
    this.$store.commit('market/addCryptoById', this.$route.params.id)

    setInterval(function () {
      console.log('selectedCrypto testing')
      this.$store.commit('market/addCryptoById', this.$route.params.id)
    }.bind(this), 30000)
  }
}
</script>

<style lang="stylus">
  .hover-icon {
    cursor: pointer;

    &:hover {
      transition: .5s;
      color: #ff0000 !important;
    }
  }

  .image-section {
    position: relative;

    .cryptoCurrency-image {
      height: 200px;

      -webkit-animation-name: spinner;
      -webkit-animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-duration: 60s;
      animation-name: spinner;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-duration: 60s;
      -webkit-transform-style: preserve-3d;
      -moz-transform-style: preserve-3d;
      -ms-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }

    .cryptoCurrency-image-iframe {
      height: 80px;
    }

    .cryptoCurrency-title {
      font-size: 20px;
      font-weight: 600;
    }

    .cryptoCurrency-title-iframe {
      font-size: 16px;
    }

    .tag-iframe {
      font-size: 0.63rem;
    }

    .cryptoCurrency-description {
      font-size: 14px;
      line-height: 1.65;
      max-width: 450px;
      display: block;
      margin: 0 auto;
      padding: 20px 0 30px;

      @media screen and (max-width: $medium) {
        font-size: 12px;
        max-width: 300px;
      }
    }

    .cryptoCurrency-description-iframe {
      font-size: 11px;
      padding-top: 10px;
      padding-bottom: 15px;
      line-height: 1.5;
      max-width: 425px;
    }

    .icons-section {
      height: 0px;

      .icon {
        margin: 0px 30px;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;

        &:hover {
          color: #fd6721;
        }
      }
    }
  }

  .information-section {
    padding-top: 25px;

    .price-section {
      text-align: left;
      padding: 20px 0;

      @media screen and (max-width: $medium) {
        text-align: center;
      }

      .price-tag {
      }

      .price-select-tag {
        display: inline-block;
      }

      .control {
        display: inline-block;
        float: right;
        margin-right: 30px;
        font-size: 0.80rem;
        .select {
          select {
            padding-right: 1.2em;
          }
          &:after {
            right: 0.55em;
            border: 1px solid #fd6721;
            border-top: 0;
            border-right: 0;
          }
        }

        @media screen and (max-width: $medium) {
          display: block;
          text-align: center;
          float: none;
          margin-right: 0px;
        }
      }

      .price-amount {
        font-size: 40px;

        .positive-percent-change {
          color: #00d1b2;
        }

        .negative-percent-change {
          color: #ff3860;
        }

        .percent-tooltip {
          color: #FFF;
          text-align: center;
          font-size: 10px;
          font-weight: 500;
          cursor: initial;
        }

        @media screen and (max-width: $medium) {
          font-size: 30px;
        }
      }

      .market-cap-price-amount {
        display: inline-block;
      }

      .doughnut-chart {
        display: block;
        text-align: center;
        font-weight: 500;
        width: 50px;
        margin: 0 auto;
      }

      .price-amount-iframe {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .price-select-section {
      @media screen and (min-width: $medium) {
      }
    }

    .price-section-iframe {
      padding: 10px 0;
    }
  }
</style>

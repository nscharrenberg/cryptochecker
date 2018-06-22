<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-search class="searchBar" color="transparent" style="width: 100%" inverted v-model="terms" placeholder="Search a crypto currency">
          <q-autocomplete @search="search" @selected="selected" />
        </q-search>
      </div>
    </div>
    <div class="row" style="padding-top: 50px;">
      <div class="col-12">
        <div class="q-display-2 text-weight-bold text-white text-center">Total Market Capital: &euro;{{marketCapital.toLocaleString()}}</div>
      </div>
    </div>
    <div class="row" style="padding-top: 50px;">
      <div class="col-12">
        <CryptoCard></CryptoCard>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import CryptoCard from 'src/components/CryptoCard'
import { filter } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      terms: '',
      cryptos: this.parseCryptos()
    }
  },
  components: {
    CryptoCard
  },
  methods: {
    search (terms, done) {
      setTimeout(() => {
        // TODO: Add multi field search
        var nameFilter = filter(terms, {field: 'label', list: this.parseCryptos()})
        done(nameFilter)
      })
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    parseCryptos () {
      return Object.values(this.$store.state.market.cryptos).map(crypto => {
        return {
          label: crypto.name,
          sublabel: crypto.symbol,
          value: crypto.symbol
        }
      })
    }
  },
  computed: {
    marketCapital: {
      get () {
        return this.$store.state.market.totalMarketCap
      },
      set () {
        this.$store.commit('market/setMarketData')
      }
    }
  },
  created () {
    this.$store.commit('market/setCryptos')
    this.$store.commit('market/setMarketData')
  }
}
</script>

<style lang="stylus">
  .searchBar {
    background-color: transparent;
    box-shadow: 0 0 25px 5px rgb(0, 98, 196, .25);
    height: 75px

    &:hover {
      box-shadow: 0 0 25px 0 #c40000;
      transition: .5s;
    }

    input {
      height: 60px
    }

    i {
      height: 60px
    }
  }
</style>

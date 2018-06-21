<template>
  <q-page class="flex flex-center">
    <q-search inverted v-model="terms" placeholder="Type the crypto currencie you'd like info on.">
      <q-autocomplete @search="search" @selected="selected" />
    </q-search>
    <CryptoCard></CryptoCard>
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
        done(filter(terms, {field: 'label', list: this.parseCryptos()}))
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
  created () {
    this.$store.commit('market/setCryptos')
    this.$store.commit('market/setMarketData')
  }
}
</script>

<style lang="stylus">
</style>

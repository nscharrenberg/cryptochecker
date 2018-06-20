<template>
  <q-page class="flex flex-center">
    <CryptoCard></CryptoCard>
  </q-page>
</template>

<style>
</style>

<script>
import CryptoCard from 'src/components/CryptoCard'
export default {
  name: 'PageIndex',
  components: {
    CryptoCard
  },
  created () {
    this.$store.commit('market/setCryptos')
    this.$store.commit('market/setMarketData')
  }
}
</script>

<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
  body {
    background: #333;
    background: -webkit-linear-gradient(left top, #002244, #440000);
    background: -moz-linear-gradient(bottom right, #002244, #440000);
    background: linear-gradient(to bottom right, #002244, #440000);
  }
</style>

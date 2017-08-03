<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab.vue'
  export default {
    name: 'app',
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

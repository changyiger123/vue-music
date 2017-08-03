<template>
  <div id="app">
    hello word
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "style/variable";

  #app {
    color: $color-theme;
  }
</style>

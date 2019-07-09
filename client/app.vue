<template>
  <base-layout>
    <router-view :books="books"></router-view>
  </base-layout>
</template>

<script>
  import base from 'client/layouts/base';

  export default {
    name: 'App',
    components: {
      'base-layout': base,
    },
    props: {
      books: {
        type: Array,
        default: [],
      },
    },
  }
</script>

<style lang="stylus">
</style>

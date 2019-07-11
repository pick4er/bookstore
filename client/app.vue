<template>
  <base-layout>
    <router-view :books="books" />
  </base-layout>
</template>

<script>
  import BaseLayout from 'client/layouts/BaseLayout';

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
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

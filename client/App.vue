<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>

<script>
  import BaseLayout from 'client/layouts/BaseLayout';

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
    },
  }
</script>

<style lang="stylus">
</style>

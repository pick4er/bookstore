<template>
  <h1 :class="$style.header">
    <base-link isRouter to="/" target="self">
      Книжный магазин
    </base-link>
  </h1>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';

  export default {
    name: 'header-section',
    components: {
      'base-link': BaseLink,
    },
  }
</script>

<style lang="stylus" module>
  .header
    font-family $robotoLight
    font-weight bold
    font-size x(50)
    text-align left
    
    a
      color $black
</style>

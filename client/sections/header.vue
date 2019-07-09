<template>
  <h1 :class="$style.header">
    <base-link isRouter to="/" target="self">
      Книжный магазин
    </base-link>
  </h1>
</template>

<script>
  import link from 'client/elements/link';

  export default {
    name: 'header-section',
    components: {
      'base-link': link,
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

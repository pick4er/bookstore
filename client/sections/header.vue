<template>
  <h1 :class="$style.header">Книжный магазин</h1>
</template>

<script>
  export default {
    name: 'header-section',
  }
</script>

<style lang="styl" module>
  .header
    font-family $robotoLight
    font-weight bold
    font-size x(50)
    text-align left
</style>

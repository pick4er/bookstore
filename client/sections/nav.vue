<template>
  <ul :class="$style.list">
    <li>
      <base-link 
        isRouter 
        to="/admin"
        target="_self"
        :modes="['accent']" 
      >Панель администратора</base-link>
    </li>
    <li>
      <base-link 
        isRouter 
        to="/cart"
        target="_self"
        :modes="['accent']" 
      >В корзине: X книг</base-link>
    </li>
  </ul>
</template>

<script>
  import link from 'client/elements/link';

  export default {
    name: 'nav-section',
    components: {
      'base-link': link,
    },
  }
</script>

<style lang="stylus" module>
  .list
    flexBetween()
    height x(24)
    padding x(0)
    margin x(0)
    list-style none
</style>

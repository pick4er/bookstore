<template>
  <div>
    <order-list />
  </div>
</template>

<script>
  import OrderList from 'client/components/OrderList';

  export default {
    name: 'cart-page',
    components: {
      'order-list': OrderList,
    },
  }
</script>

<style lang="stylus" module>
</style>

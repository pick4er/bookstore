<template>
  <div>
    <order-list />
    <order-form :class="$style.form" />
  </div>
</template>

<script>
  import OrderForm from 'client/components/OrderForm';
  import OrderList from 'client/components/OrderList';

  export default {
    name: 'cart-page',
    components: {
      'order-form': OrderForm,
      'order-list': OrderList,
    },
  }
</script>

<style lang="stylus" module>
  .form
    max-width x(373)
</style>

<template>
  <div>
    <order-list :order="order" />
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
    computed: {
      order() {
        return Object.values(this.$store.state.order);
      },
    },
  }
</script>

<style lang="stylus" module>
  .form
    max-width x(373)
</style>

<template>
  <div>
    <order-list :order="order" />
    <order-form :class="$style.form" />
  </div>
</template>

<script>
  import orderForm from 'client/components/orderForm';
  import order from 'client/components/order';

  export default {
    name: 'cart-page',
    components: {
      'order-form': orderForm,
      'order-list': order,
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

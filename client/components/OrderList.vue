<template>
  <div>
    <template v-if="isOrder">
      <table :class="$style.table">
        <tbody>
          <tr 
            v-for="book in cart"
            :key="book.book_id"
          >
            <td :class="$style.bookTitle">
              <h5>{{ book.title }}</h5>
              <h6>{{ book.authors }}</h6>
            </td>

            <td :class="$style.priceRow">
              <span :class="$style.count">
                {{ book.order_qty }} шт.
              </span>
              ×
              <span>
                {{ book.price }} руб.
              </span>
              =
              <span :class="$style.bookTotal">
                {{ getBookTotal(book.order_qty, book.price) }} руб.
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <hr :class="$style.line" />

      <div :class="$style.total">
        <h3>Итого:</h3>
        <span>{{ getTotal() }} руб.</span>
      </div>

      <base-button 
        type="button"
        :class="$style.submitButton"
        @click="createOrder"
      >Оформить заказ</base-button>
    </template>

    <template v-else>
      <h4 
        :class="$style.center"
      >Добавьте что-нибудь в корзину</h4>
    </template>
  </div>
</template>

<script>
  import BaseButton from 'client/elements/BaseButton';

  export default {
    name: 'order-list',
    components: {
      'base-button': BaseButton,
    },
    computed: {
      cart() {
        return this.$store.state.cart;
      },
      isOrder() {
        return this.cart.length > 0;
      },
      isMobile() {
        return this.$store.state.isMobile;
      }
    },
    methods: {
      getBookTotal(count, price) {
        return count * price;
      },
      getTotal() {
        return this.cart.reduce((total, book, i) => {
          return total + book.price * book.order_qty;
        }, 0);
      },
      createOrder() {
        this.$store.dispatch({
          type: 'CREATE_ORDER',
          onSuccess: this.onSuccessOrder,
          onError: this.onErrorOrder,
        });
      },
      onSuccessOrder() {
        alert('Заказ успешно создан!');
      },
      onErrorOrder() {
        alert('Ошибка при создании заказа. Попробуйте еще раз');
      },
    },
  };
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    .table
      tr
        &:nth-child(even)
          background-color $hover

        &:hover
          background-color auto

    .bookTitle
      h5
        font-size x(16)

      h6
        font-size x(12)

    .priceRow
      font-size x(14)

      .bookTotal
        font-size x(16)

    .total
      h3
        font-size x(32)

      span
        font-size x(28)


  .table
    width 100%
    
    tr
      &:hover
        background-color $hover

  .bookTitle
    padding-top x(12)
    padding-bottom x(12)
    padding-left x(6)
    max-width x(300)

    h5,
    h6
      margin x(0)
      font-weight normal

    h5
      font-family $robotoLight
      font-size x(18)
      
    h6
      font-family $robotoThin
      font-size x(14)
      font-style italic
      margin-top x(5)

  .priceRow
    text-align right
    font-size x(18)
    padding-right x(6)
    
    .count
      font-family $robotoRegular
      font-style italic

    .bookTotal
      font-family $robotoBold
      font-size x(20)

  .line
    border x(0.5) solid $black
    margin-top x(20)
    margin-bottom @margin-top

  .total
    flexBetween()

    h3
      margin x(0)
      font-family $robotoThin
      font-style italic
      font-weight normal
      font-size x(40)
      
    span
      font-size x(36)
      font-family $robotoBold
  
  .submitButton
    blockCenter()
    margin-top x(30)
    max-width x(373)
    
  .center
    blockCenter()
</style>
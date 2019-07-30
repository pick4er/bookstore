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
    </template>
  </div>
</template>

<script>
  export default {
    name: 'order-list',
    computed: {
      cart() {
        return this.$store.state.cart;
      },
      isOrder() {
        return this.cart.length > 0;
      },
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
    },
  };
</script>

<style lang="stylus" module>
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
</style>
<template>
  <div v-if="isLoading">
    Loading ...
  </div>

  <div v-else>
    <div :class="$style.title">
      <h4>{{ book.title }}</h4>
      <p>{{ book.authors }}</p>
    </div>

    <div>
      <div :class="$style.price">
        Цена: <span>{{ book.price }} руб.</span>
      </div>
      <div :class="$style.controls">
        <base-input 
          v-model="count"
          :placeholder="1"
          :modes="['white']"
          :class="$style.input"
          :id="book.title"
        />

        <base-button
          :class="$style.button"
          @click="orderBook"
        >Заказать</base-button>
      </div>

      <div 
        :class="$style.onhand"
        :title="`${book.onhand_qty}`"
      >
        В наличии: 
        {{ book.onhand_qty | kkOnhand }} 
        {{ book.onhand_qty | pluralizeOnhand }}
      </div>
    </div>
  </div>
</template>

<script>
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  import pluralizeWord from 'helpers/pluralizeWord';
  import kkNumber from 'helpers/kkNumber';

  export default {
    name: 'catalog-page',
    components: {
      'base-button': BaseButton,
      'base-input': BaseInput,
    },
    data() {
      return {
        count: 1,
        isLoading: false,
      };
    },
    computed: {
      book() {
        return this.$store.state.book;
      },
      bookId() {
        return this.$route.params.bookId
      }
    },
    filters: {
      pluralizeOnhand(value) {
        return pluralizeWord('книг', ['а', 'и', ''], value);
      },
      kkOnhand(value) {
        return kkNumber(value);
      },
    },
    watch: {
      '$store.state.book'(book) {
        if (this.isLoading && typeof book.book_id !== undefined) {
          this.isLoading = false;
        }
      }
    },
    serverPrefetch() {
      return this.fetchBook();
    },
    beforeMount() {
      if (!this.isBook()) {
        this.fetchBook();
      }
    },
    methods: {
      isBook() {
        return (this.book && 
          (Object.keys(this.book).length !== 0) &&
          this.book.book_id === this.bookId
        );
      },
      fetchBook() {
        this.isLoading = true;

        return this.$store.dispatch({
          type: 'FETCH_BOOK',
          bookId: this.bookId,
        });
      },
      orderBook() {
        this.$store.dispatch({
          type: 'ORDER_BOOK',
          ...this.book,
          count: this.count,
        });

      },
    },
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    .title
      h4
        font-size x(18)

      p
        font-size x(14)

    .price
      font-size x(16)
      margin-bottom x(12)
      
      span
        font-size x(18)
        
    .controls
      margin-bottom x(12)
      
      .input
      .button
        width x(100)

    .onhand
      font-size x(16)

  .title
    margin-bottom x(100)

    h4
      margin-top x(0)
      margin-bottom x(6)
      font-size x(24)

    p
      remarkFont()
      margin x(0)

  .price
    remarkFont()
    font-size x(20)
    margin-bottom x(18)
    
    span
      heavyTextFont()
      margin-left x(2)

  .controls
    display flex
    margin-bottom x(18)

    .input
      width x(130)

    .button
      width x(130)
      margin-left x(10)

  .onhand
    regularTextFont()
</style>

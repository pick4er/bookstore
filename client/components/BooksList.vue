<template>
  <ul :class="$style.list">
    <li v-if="isLoading">
      <p>Loading ...</p>
    </li>

    <li 
      v-else
      v-for="book in booksOrder"
      :key="book.title + '-' + book.book_id"
    >
      <div>
        <h4>Название</h4>
        <span :class="$style.title">
          <base-link
            :isRouter="true"
            :to="`/book/${book.book_id}`"
          >{{ book.title }}</base-link>
        </span>
      </div>

      <div>
        <h4>Авторы</h4>
        <span>{{ book.authors }}</span>
      </div>

      <div>
        <h4>Заказ</h4>
        <span :class="$style.controls">
          <base-input
            v-model.number="book.count"
            :placeholder="1" 
            :id="book.title"
            :class="$style.input"
            :modes="['white']"
          />
          <base-button 
            :class="$style.button"
            @click="orderBook(book)"
          >Заказать</base-button>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';
  import BaseInput from 'client/elements/BaseInput'
  import BaseButton from 'client/elements/BaseButton'

  export default {
    name: 'books-table',
    components: {
      'base-link': BaseLink,
      'base-input': BaseInput,
      'base-button': BaseButton,
    },
    props: {
      books: {
        type: Array,
        default: [],
        required: true,
      },
    },
    data() {
      return {
        booksOrder: [],
        isLoading: true,
      }
    },
    created() {
      if (this.books.length > 0) {
        this.prepareBooks(this.books);
      }
    },
    watch: {
      books(nextBooks, books) {
        if (books.length !== nextBooks.length) {
          this.prepareBooks(nextBooks)
        }
      },
    },
    methods: {
      prepareBooks(nextBooks) {
        this.booksOrder = nextBooks.map(book => ({
          ...book, count: 1,
        }));
        this.isLoading = false;
      },
      orderBook(book) {
        this.$store.dispatch({
          type: 'ORDER_BOOK',
          ...book,
        });
      },
    },
  }
</script>

<style lang="stylus" module>
  .list
    clearList()
    border x(2) solid $gray
    width 100%

    li
      padding x(10)

      &:nth-child(even)
        background-color $lightGray

      div + div
        margin-top x(16)

      h4
        sectionNameFont()

      span
        textFont()

      .title
        text-decoration underline

  .input
    width x(104)

  .button
    width x(104)
    margin-left x(10)
    
  .controls
    display flex
</style>

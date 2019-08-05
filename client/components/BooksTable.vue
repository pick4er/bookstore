<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Авторы</th>
        <th scope="col">Заказ</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td colspan="3">
          Loading ...
        </td>
      </tr>

      <tr 
        v-else
        v-for="book in booksOrder" 
        :key="book.title + '-' + book.book_id"
      >
        <td 
          :title="book.title"
          :class="$style.title"
          scope="row" 
        >
          <base-link
            :isRouter="true"
            :to="`/book/${book.book_id}`"
          >{{ book.title }}</base-link>
        </td>

        <td 
          :title="book.authors"
          :class="$style.authors"
        >{{ book.authors }}</td>

        <td :class="$style.order">
          <div>
            <base-input
              v-model.number="book.count"
              :placeholder="1" 
              :id="book.title"
              :class="$style.input"
            />
            <base-button 
              :class="$style.button"
              @click="orderBook(book)"
            >Заказать</base-button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';
  import BaseInput from 'client/elements/BaseInput';
  import BaseButton from 'client/elements/BaseButton';

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
  .table
    border x(5) solid $gray
    width 100%

    thead
      background-color $gray

      th
        text-align left
        font-size x(18)
        color $text
        padding-top x(5)
        padding-bottom x(10)
        font-weight normal
        font-family $robotoBold

        &:first-child
          padding-left x(5)

        &:last-child
          text-align center

    tbody
      tr
        &:nth-child(even)
          background-color $lightGray

      td
        font-size x(16)
        font-family $robotoLight
        padding-top x(10)
        padding-bottom x(10)
        padding-right x(7)
        max-width x(0)
        textEllipsis()

        &:first-child
          padding-left x(5)

        &:last-child
          padding-right x(0)

      .title
        width 40%
        text-decoration underline

      .authors
        width 30%

      .order
        width 30%
        background-color $lightenSand

        div
          flexCenter()
          justify-content space-evenly

        .input
          width x(130)          

        .button
          width x(130)
</style>

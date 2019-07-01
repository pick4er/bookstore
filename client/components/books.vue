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
          {{ book.title }}
        </td>
        <td 
          :title="book.authors"
          :class="$style.authors"
        >
          {{ book.authors }}
        </td>
        <td :class="$style.order">
          <div>
            <base-input
              placeholder=1 
              v-model="book.value"
            ></base-input>
            <base-button>Заказать</base-button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import input from 'client/elements/input'
  import button from 'client/elements/button'

  export default {
    name: 'books',
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
    components: {
      'base-input': input,
      'base-button': button,
    },
    created() {
      if (this.books.length !== 0) {
        this.getBooks(nextBooks)
      }
    },
    watch: {
      books(nextBooks, books) {
        if (books.length !== nextBooks.length) {
          this.getBooks(nextBooks)
        }
      },
    },
    methods: {
      getBooks(nextBooks) {
        this.booksOrder = nextBooks.map(book => ({
          ...book, value: 1,
        }));
        this.isLoading = false;
      }
    }
  }
</script>

<style lang="styl" module>
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

      .authors
        width 30%

      .order
        width 30%
        background-color $lightenSand

        div
          flexCenter()
          justify-content space-evenly
</style>

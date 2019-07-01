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
      <tr 
        v-for="book in books" 
        :key="book.title + '-' + book.book_id"
        :title="book.title"
      >
        <td scope="row" :class="$style.title">{{ book.title }}</td>
        <td :class="$style.authors">{{ book.authors }}</td>
        <td :class="$style.order"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'books',
    props: {
      books: {
        type: Array,
        required: true,
      },
    },
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
        font-family $fontBold

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
        font-family $fontLight
        padding-top x(10)
        padding-bottom x(10)
        max-width x(0)
        textEllipsis()

        &:first-child
          padding-left x(5)
          padding-right x(5)

      .title
        width 50%

      .authors
        width 30%

      .order
        width 20%
</style>

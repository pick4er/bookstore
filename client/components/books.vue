<template>
  <ul :class="$style.list">
    <li v-for="book in books" :key="book.book_id + '-' + book.display_name">
      {{ book.display_name }}
    </li>
  </ul>
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
  .list
    color $black
</style>

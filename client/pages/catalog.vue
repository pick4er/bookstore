<template>
  <books :books="books"></books>
</template>

<script>
  import books from 'client/components/books';

  export default {
    name: 'catalog-page',
    props: {
      books: {
        type: Array,
        default: [],
      },
    },
    components: {
      books,
    },
  }
</script>

<style lang="stylus" module>
</style>

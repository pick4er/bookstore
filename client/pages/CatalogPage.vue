<template>
  <books-table :books="books" />
</template>

<script>
  import BooksTable from 'client/components/BooksTable';

  export default {
    name: 'catalog-page',
    props: {
      books: {
        type: Array,
        default: [],
      },
    },
    components: {
      'books-table': BooksTable,
    },
  }
</script>

<style lang="stylus" module>
</style>

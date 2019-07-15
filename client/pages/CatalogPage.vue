<template>
  <books-table :books="books" />
</template>

<script>
  import BooksTable from 'client/components/BooksTable';

  export default {
    name: 'catalog-page',
    components: {
      'books-table': BooksTable,
    },
    computed: {
      books() {
        return this.$store.state.books;
      },
    },
    serverPrefetch() {
      return this.fetchBooks();
    },
    mounted() {
      if (this.books.length === 0) {
        return this.fetchBooks();
      }
    },
    methods: {
      fetchBooks() {
        return this.$store.dispatch({
          type: 'FETCH_BOOKS',
        });
      },
    },
  }
</script>

<style lang="stylus" module>
</style>

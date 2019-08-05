<template>
  <books-list v-if="isMobile" :books="books" />
  <books-table v-else :books="books" />
</template>

<script>
  import BooksTable from 'client/components/BooksTable';
  import BooksList from 'client/components/BooksList';

  export default {
    name: 'catalog-page',
    components: {
      'books-table': BooksTable,
      'books-list': BooksList,
    },
    computed: {
      books() {
        return this.$store.state.books;
      },
      isMobile() {
        return this.$store.state.isMobile;
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

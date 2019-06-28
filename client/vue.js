import Vue from 'vue';

import authors from './components/authors.vue';
import books from './components/books.vue';

const data = {
  authors: [],
  books: [],
};

export function changeAuthors(nextAuthors) {
  data.authors = nextAuthors;
}

export function changeBooks(nextBooks) {
  data.books = nextBooks;
}

new Vue({
  el: '#app',
  components: {
    authors,
    books,
  },
  data() {
    return data
  },
});

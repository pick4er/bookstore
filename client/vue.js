import Vue from 'vue';

import books from 'client/components/books.vue';

const data = {
  books: [],
};

export function changeBooks(nextBooks) {
  data.books = nextBooks;
}

new Vue({
  el: '#app',
  components: {
    books,
  },
  data() {
    return data
  },
});

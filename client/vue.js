import Vue from 'vue';

import catalogPage from 'client/pages/catalog';

const data = {
  books: [],
};

export function changeBooks(nextBooks) {
  data.books = nextBooks;
};

new Vue({
  el: '#app',
  components: {
    'catalog-page': catalogPage,
  },
  data() {
    return data;
  },
});

import Vue from 'vue';
import App from 'client/app.vue';

import createRouter from 'client/router';

const data = { books: [] };
const render = h => h(App, { props: data });

export function changeBooks(nextBooks) {
  data.books = nextBooks;
};

export default function createApp() {
  const router = createRouter();

  const app = new Vue({ 
    data,
    router, 
    render,
  });

  return {
    app, 
    router,
  }
}

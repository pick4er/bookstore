import Vue from 'vue';
import App from 'client/app.vue';

import createRouter from 'client/router';
import createStore from 'client/flux';

const data = { books: [] };
const render = h => h(App, { props: data });

export function changeBooks(nextBooks) {
  data.books = nextBooks;
}

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    data,
    store,
    router,
    render,
  });

  return {
    app,
    store,
    router,
  };
}

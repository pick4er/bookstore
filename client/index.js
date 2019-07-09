import request from 'client/fetch';
import createApp, { changeBooks } from 'client/app.js';

import 'client/styles/app.styl';

const { app } = createApp();
app.$mount('#app');

request('books')
  .then(changeBooks)
  .catch(console.error)

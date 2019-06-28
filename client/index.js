/* global BACKEND_URL */
import { changeBooks } from 'client/vue.js';

import 'client/styles/app.styl'

const getBooks = fetch(`${BACKEND_URL}/books`);
getBooks
  .then(res => res.json())
  .then(changeBooks)
  .catch(console.error)

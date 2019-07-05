import request from 'client/fetch';
import { changeBooks } from 'client/vue.js';

import 'client/styles/app.styl';

request('books')
  .then(changeBooks)
  .catch(console.error)

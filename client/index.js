/* global BACKEND_URL */
import { changeAuthors, changeBooks } from './vue';

const getAuthors = fetch(`${BACKEND_URL}/authors`);
const getBooks = fetch(`${BACKEND_URL}/books`);
getAuthors
  .then(res => res.json())
  .then(result => {
    changeAuthors(result)
    return getBooks
  })
  .then(res => res.json())
  .then(changeBooks)  
  .catch(console.error);

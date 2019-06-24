/* global BACKEND_URL */

const getAuthors = fetch(`${BACKEND_URL}/authors`);
getAuthors
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);

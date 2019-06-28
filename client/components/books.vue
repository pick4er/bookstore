<template>
  <ul>
    <li v-for="book in books" :key="book.book_id + '-' + book.display_name">{{ book.display_name }}</li>
  </ul>
</template>

<script>
  export default {
    name: 'books',
    props: ['books'],
  }
</script>

<style></style>

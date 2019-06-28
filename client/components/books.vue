<template>
  <ul>
    <li v-for="book in books" :key="book.book_id + '-' + book.title">{{ book.title }}</li>
  </ul>
</template>

<script>
  export default {
    name: 'books',
    props: ['books'],
  }
</script>

<style></style>

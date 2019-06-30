<template>
  <base-layout>
    <template #header>
      <header-section></header-section>      
    </template>

    <books :books="books"></books>

    <template #footer>
      <footer-section></footer-section>      
    </template>
  </base-layout>
</template>

<script>
  import books from 'client/components/books';
  import baseLayout from 'client/layouts/base';
  import headerSection from 'client/sections/header';
  import footerSection from 'client/sections/footer';

  export default {
    name: 'catalog-page',
    props: {
      books: {
        type: Array,
        default: [],
      },
    },
    components: {
      books,
      'base-layout': baseLayout,
      'header-section': headerSection,
      'footer-section': footerSection,
    }
  }
</script>

<style lang="styl" module></style>

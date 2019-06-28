<template>
  <ul>
    <li v-for="author in authors" :key="author.author_id + '-' + author.first_name">
      {{ author.first_name }} {{ author.last_name}} {{ author.middle_name }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'authors',
    props: ['authors'],
  }
</script>

<style></style>

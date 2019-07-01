<template>
  <a :target="target" :rel="rel" :class="$style.link">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'base-link',
    props: {
      target: {
        type: String,
        default: '_blank',
      },
      rel: {
        type: String,
        default: 'noopener noreferrer',
      },
    },
  };
</script>

<style lang="styl" module>
  .link
    text-decoration none
</style>

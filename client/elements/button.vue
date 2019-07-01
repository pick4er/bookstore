<template>
  <button :type="type" :class="$style.button">
    <slot>Button</slot>
  </button>
</template>

<script>
  export default {
    name: 'base-button',
    props: {
      type: {
        type: String,
        default: 'button',
      },
    },
  };
</script>

<style lang="styl" module>
  .button
    flexCenter()
    display inline-flex
    width x(130)
    height x(30)
    background-color $button
    color $white
    font-size x(16)
    font-family $robotoRegular
    border none
</style>

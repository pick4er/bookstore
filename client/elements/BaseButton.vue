<template>
  <button 
    v-bind="$attrs"
    :type="type" 
    :class="$style.button"
    @click="$emit('click', $event)"
  ><slot>Кнопка</slot></button>
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

<style lang="stylus" module>
  html[data-layout="mobile"]
    .button
      height x(25)
      font-size x(12)

  .button
    flexCenter()
    display inline-flex
    height x(30)
    width 100%
    background-color $button
    color $white
    font-size x(16)
    font-family $robotoRegular
    border none
</style>

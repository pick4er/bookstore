<template>
  <input 
    :class="$style.input"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
  export default {
    name: 'base-input',
    props: {
      value: {
        type: [Number, String],
        required: true,
        default: '',
      },
    },
  };
</script>

<style lang="styl" module>
  .input
    border none
    background-color $white
    height x(30)
    width x(130)
    text-align center
    color $black
    font-size x(16)
    font-family $robotoRegular
</style>

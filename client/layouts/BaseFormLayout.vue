<template>
  <div :class="$style.wrap">
    <slot name="header" />
    <form 
      :class="formClass"
      @submit.prevent="onSubmit"
    >
      <slot name="inputs" />
      <div :class="$style.lastBlock">
        <slot name="submitButton" />
        <div :class="$style.messages">
          <slot name="messages" />
        </div>
      </div>
    </form>
  </div>  
</template>

<script>
  export default {
    name: 'base-form-layout',
    props: {
      formClass: {
        type: [String, Array],
        required: false,
        default: '',
      },
      onSubmit: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
  }
</script>

<style lang="stylus" module>
  .wrap
    flexColumn()
    width 100%

    form
      flex-grow 1
      flexColumn()

  .lastBlock
    flex-grow 1
    display flex
    align-items flex-end
    position relative

  .messages
    position absolute
    bottom x(-20)
</style>

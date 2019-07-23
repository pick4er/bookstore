<template>
  <base-portal 
    :id="id" 
    :shouldOpen="isOpened" 
    :portalClass="$style.background"
    @click="onModalClick"
    @keyup="onModalKeyup"
  >
    <div :class="[$style.modal, modalClass]">
      <slot />
    </div>
  </base-portal>
</template>

<script>
  import BasePortal from 'client/elements/BasePortal';

  const ESC_CODE = 27;

  export default {
    name: 'base-modal',
    components: {
      'base-portal': BasePortal,
    },
    props: {
      isOpened: {
        type: Boolean,
        required: true,
        default: false,
      },
      id: {
        type: [String, Number],
        default: 'base-modal',
      },
      modalClass: {
        type: String,
        default: '',
      },
      backgroundClass: {
        type: String,
        default: '',
      },
      close: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    methods: {
      onModalClick(event) {
        if (event.target.closest(`.${this.$style.modal}`)) return;
        return this.close();
      },
      onModalKeyup(event) {
        if (event.keyCode !== ESC_CODE) return;
        return this.close()
      },
    },
  }
</script>

<style lang="stylus" module>
  .background
    flexCenter()
    outline none
    position fixed
    background-color $modalBackground
    top x(0)
    left x(0)
    width 100%
    height 100%

  .modal
    background-color $white
    width x(420)
    padding x(24)
</style>

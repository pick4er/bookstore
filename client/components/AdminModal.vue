<template>
  <base-portal 
    id="admin-modal" 
    :shouldOpen="isOpened" 
    :portalClass="$style.modal"
  >
    <base-button @click="login">
      Войти
    </base-button>
  </base-portal>
</template>

<script>
  import BasePortal from 'client/elements/BasePortal';
  import BaseButton from 'client/elements/BaseButton';

  export default {
    name: 'admin-modal',
    components: {
      'base-portal': BasePortal,
      'base-button': BaseButton,
    },
    props: {
      isOpened: {
        type: Boolean,
        required: true,
        default: false,
      },
      next: {
        type: Function,
        required: true,
      },
    },
    methods: {
      login() {
        return this.next();
      },
    },
  }
</script>

<style lang="stylus" module>
  .modal
    position fixed
    background-color $modalBackground
    top x(0)
    left x(0)
    width 100%
    height 100%
</style>

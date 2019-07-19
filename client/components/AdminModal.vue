<template>
  <base-portal 
    id="admin-modal" 
    :shouldOpen="isOpened" 
    :portalClass="$style.background"
    @click="onModalClick"
    @keyup="onModalKeyup"
  >
    <div :class="$style.modal">
      <base-input 
        required
        v-model="login"
        name="login"
        id="login"
        labelText="Логин"
        placeholder="pick4er"
        :modes="inputModes"
        :class="$style.input"
      />

      <base-input 
        required
        v-model="password"
        name="password"
        id="password"
        type="password"
        labelText="Пароль"
        placeholder="•••••••••••••"
        :modes="inputModes"
        :class="[$style.input, $style.lastInput]"
      />

      <base-button @click="onAuth">
        Войти
      </base-button>
    </div>
  </base-portal>
</template>

<script>
  import BasePortal from 'client/elements/BasePortal';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  const ESC_CODE = 27;

  export default {
    name: 'admin-modal',
    components: {
      'base-portal': BasePortal,
      'base-button': BaseButton,
      'base-input': BaseInput,
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
      close: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data() {
      return {
        login: '',
        password: '',
        inputModes: [
          'white',
          'textLeft',
        ],
      }
    },
    methods: {
      onAuth() {
        return this.next();
      },
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
    flexColumn()
    background-color $white
    width 100%
    max-width x(424)
    height 100%
    max-height x(288)
    padding x(24)

  .input
    width 100%
    flex-grow 0
  
    &.lastInput
      flex-grow 1

  .input + .input
    margin-top x(24)
</style>

<template>
  <base-modal
    id="login-modal"
    :modalClass="$style.modal"
    :isOpened="isOpened"
    :close="close"
  >
    <base-form-layout :onSubmit="onAuth">
      <template #inputs>
        <base-input 
          required
          v-model="email"
          name="email"
          id="email"
          labelText="Email"
          placeholder="pick4er@gmail.com"
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
          :class="$style.input"
        />

        <span v-if="error" :class="$style.error">
          {{ error }}
        </span>
      </template>

      <template #submitButton>
        <base-button type="submit">
          Войти
        </base-button>
      </template>
    </base-form-layout>
  </base-modal>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BaseModal from 'client/elements/BaseModal';
  import BasePortal from 'client/elements/BasePortal';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  import formMessages from 'client/mixins/formMessages';

  export default {
    name: 'login-modal',
    components: {
      'base-form-layout': BaseFormLayout,
      'base-modal': BaseModal,
      'base-portal': BasePortal,
      'base-button': BaseButton,
      'base-input': BaseInput,
    },
    mixins: [formMessages],
    props: {
      isOpened: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data() {
      return {
        email: '',
        password: '',
        inputModes: [
          'white',
          'textLeft',
        ],
      }
    },
    watch: {
      isOpened(nextIsOpened, isOpened) {
        if (isOpened && !nextIsOpened) {
          this.resetForm();
        }
      },
    },
    methods: {
      onAuth() {
        this.$store.dispatch({
          type: 'LOGIN',
          email: this.email,
          password: this.password,
          onError: this.showError,
        });
      },
      close() {
        this.$store.commit({
          type: 'CLOSE_LOGIN_MODAL',
        });
      },
      resetForm() {
        this.email = '';
        this.password = '';
        this.error = '';
      },
    },
  }
</script>

<style lang="stylus" module>
  .modal
    display flex
    width 100%
    max-width x(424)
    height 100%
    max-height x(288)

  .input
    width 100%
    flex-grow 0
  
  .error
    errorText()

  .input + .input
    margin-top x(18)
</style>

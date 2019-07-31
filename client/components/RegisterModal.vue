<template>
  <base-modal
    id="register-modal"
    :modalClass="$style.modal"
    :isOpened="isOpened"
    :close="close"
  >
    <base-form-layout :onSubmit="onRegister">
      <template #inputs>
        <base-input 
          required
          v-model="email"
          name="email"
          id="email"
          type="email"
          labelText="Email"
          placeholder="pick4er@gmail.com"
          :modes="inputModes"
          :class="$style.input"
        />

        <base-input 
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
          :class="$style.input"
        />

        <span v-if="error" :class="$style.error">
          {{ error }}
        </span>
      </template>

      <template #submitButton>
        <base-button type="submit">
          Зарегистрироваться
        </base-button>
      </template>
    </base-form-layout>
  </base-modal>
</template>

<script>
  import BaseFormLayout from 'client/layouts/BaseFormLayout';
  import BasePortal from 'client/elements/BasePortal';
  import BaseModal from 'client/elements/BaseModal';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  import formMessages from 'client/mixins/formMessages';

  export default {
    name: 'register-modal',
    mixins: [formMessages],
    components: {
      'base-form-layout': BaseFormLayout,
      'base-modal': BaseModal,
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
    },
    data() {
      return {
        email: '',
        login: '',
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
      onRegister() {
        this.$store.dispatch({
          type: 'REGISTER',
          email: this.email,
          login: this.login,
          password: this.password,
          onError: this.showError,
        });
      },
      close() {
        this.$store.commit({
          type: 'CLOSE_REGISTER_MODAL',
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
    height x(350)
    width x(420)

  .input
    width 100%
    flex-grow 0
  
  .error
    errorText()

  .input + .input
    margin-top x(18)
</style>

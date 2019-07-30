<template>
  <base-modal
    id="register-modal"
    :modalClass="$style.modal"
    :isOpened="isOpened"
    :close="close"
  >
    <form 
      @submit.prevent="onRegister"
      :class="$style.form"
    >
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

      <div :class="$style.lastBlock">
        <base-button type="submit">
          Зарегистрироваться
        </base-button>
      </div>
    </form>
  </base-modal>
</template>

<script>
  import BaseModal from 'client/elements/BaseModal';
  import BasePortal from 'client/elements/BasePortal';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  export default {
    name: 'register-modal',
    components: {
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
        error: '',
        timerId: null,
        inputModes: [
          'white',
          'textLeft',
        ],
      }
    },
    beforeDestroy() {
      clearTimeout(this.timerId);
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
      showError(errorMessage) {
        this.error = errorMessage;
        this.timerId = setTimeout(() => {
          this.error = null;
        }, 6666);
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
    height x(350)
    width x(420)

  .form
    flexColumn()
    height 100%

  .input
    width 100%
    flex-grow 0
  
  .error
    errorText()

  .lastBlock
    flex-grow 1
    display flex
    align-items flex-end

  .input + .input
    margin-top x(18)
</style>

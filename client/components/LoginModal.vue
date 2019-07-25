<template>
  <base-modal
    id="login-modal"
    :modalClass="$style.modal"
    :isOpened="isOpened"
    :close="close"
  >
    <form 
      @submit.prevent="onAuth"
      :class="$style.form"
    >
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

      <div :class="$style.lastBlock">
        <base-button type="submit">
          Войти
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

  import { ADMIN_MODE } from 'helpers/constants';
  import api from 'api';

  export default {
    name: 'login-modal',
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
      auth: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data() {
      return {
        email: '',
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
      async onAuth() {
        let isError = false;
        const response = await api('login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            email: this.email,
            password: this.password,
          },
        }).catch(e => {
          console.error(e);
          isError = true
        });
        if (isError) return;

        if (response.status === 'ok') {
          this.$store.commit({
            type: 'UPDATE_USER',
            user: response.user,
          });
          this.$store.commit({
            type: 'UPDATE_IS_AUTHED', 
            isAuthed: true,
          });

          if (response.user.login === 'pick4er') {
            this.$store.commit({
              type: 'UPDATE_USER_MODE', 
              userMode: ADMIN_MODE,
            });
          }

          this.close();

          return this.auth();
        }

        this.showError(response.message);
      },
      close() {
        this.$store.commit({
          type: 'CLOSE_LOGIN_MODAL',
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
    width 100%
    max-width x(424)
    height 100%
    max-height x(288)

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

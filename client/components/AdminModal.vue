<template>
  <base-portal 
    id="admin-modal" 
    :shouldOpen="isOpened" 
    :portalClass="$style.background"
    @click="onModalClick"
    @keyup="onModalKeyup"
  >
    <form 
      @submit.prevent="onAuth"
      :class="$style.modal"
    >
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
  </base-portal>
</template>

<script>
  import BasePortal from 'client/elements/BasePortal';
  import BaseButton from 'client/elements/BaseButton';
  import BaseInput from 'client/elements/BaseInput';

  import api from 'api';

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
      auth: {
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
            login: this.login,
            password: this.password,
          },
        }).catch(e => {
          console.error(e);
          isError = true
        });
        if (isError) return;

        if (response.status === 'ok') {
          return this.auth();
        }

        this.showError(response.message);
      },
      onModalClick(event) {
        if (event.target.closest(`.${this.$style.modal}`)) return;
        return this.close();
      },
      onModalKeyup(event) {
        if (event.keyCode !== ESC_CODE) return;
        return this.close()
      },
      showError(errorMessage) {
        this.error = errorMessage;
        this.timerId = setTimeout(() => {
          this.error = null;
        }, 6666);
      }
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
  
  .error
    font-size x(12)
    color $error
    margin-top x(6)

  .lastBlock
    flex-grow 1
    display flex
    align-items flex-end

  .input + .input
    margin-top x(18)
</style>

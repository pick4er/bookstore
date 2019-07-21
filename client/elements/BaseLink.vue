<script>
  import api from 'api';

  export default {
    name: 'base-link',
    props: {
      target: {
        type: String,
        default: '_blank',
      },
      rel: {
        type: String,
        default: 'noopener noreferrer',
      },
      title: {
        type: String,
        default: '',
      },
      isRouter: {
        type: Boolean,
        default: false,
      },
      to: {
        type: String,
        default: '',
      },
      modes: {
        validator(values) {
          const modes = [
            'accent',
            'plain',
          ];
          return !values.find(
            value => !modes.includes(value),
          );
        },
        default() {
          return ['plain'];
        },
      },
    },
    computed: {
      linkClasses() {
        let modeMappings = [];
        this.modes.forEach(mode => {
          modeMappings = modeMappings.concat(this.$style[mode])
        })
        return [
          this.$style.link,
          modeMappings,
        ];
      },
      element() {
        return 'a';
      }
    },
    methods: {
      clickHandler(event) {
        if (!this.isRouter) {
          return this.$emit('click', event.target.value);
        }

        const { 
          resolved: { 
            meta: { 
              isAuth: shouldAuth = false,
            } = {},
          } = {},
        } = this.$router.resolve(this.to) || {};

        if (shouldAuth) {
          let isAuthed = true;
          this.isAuthenticated()
            .catch(() => {
              isAuthed = false;
              return this.$store.commit({
                type: 'OPEN_ADMIN_MODAL',
              });
            })
          if (!isAuthed) return;
        }

        this.$router.push(this.to);
      },
      async isAuthenticated() {
        const { 
          state: { isAuth = false } = {},
        } = this.$store;

        if (isAuth) return Promise.resolve(true);

        let isError = false;
        const response = await api('is_authenticated', {
          credentials: 'include',
        }).catch(e => {
          console.error(e);
          isError = true;
        });
        if (isError) return;

        if (response.status === 'ok') {
          this.$store.commit({
            type: 'UPDATE_AUTH',
            isAuth: true,
          })
          return Promise.resolve(true);
        }

        return Promise.reject(false);
      },
    },
    render(h) {
      return h(
        this.element, 
        {
          class: this.linkClasses,
          attrs: {
            target: this.target,
            rel: this.rel,
            to: this.to,
            ...this.$attrs,       
          },
          on: {
            click: this.clickHandler,
          },
        },
        this.$slots.default,
      );
    },
  };
</script>

<style lang="stylus" module>
  .link
    cursor pointer
    &.plain
      text-decoration none
      
    &.accent
      color $black
      font-family $robotoBold
      text-decoration underline
      font-size x(13)
</style>
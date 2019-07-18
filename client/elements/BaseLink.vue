<script>
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

        const { 
          isAuth: isAuthed = false,
        } = this.$store.state || {};

        if (shouldAuth && !isAuthed) {
          return this.$store.commit({
            type: 'OPEN_ADMIN_MODAL',
          });
        } else {
          return this.$router.push(this.to);
        }
      }
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
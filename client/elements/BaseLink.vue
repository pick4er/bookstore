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
      linkClass: {
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
            'adjacentLeft',
            'adjacentRight',
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
          this.linkClass,
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
          state: { 
            userMode = '',
          } = {},
        } = this.$store;

        const { 
          resolved: { 
            meta: { 
              authMode = '',
            } = {},
          } = {},
        } = this.$router.resolve(this.to) || {};

        if (Boolean(authMode) && authMode !== userMode) {
            return this.$store.commit({
              type: 'OPEN_LOGIN_MODAL',
            });
        } else {
          this.$router.push(this.to);
        }
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
      accentFont()
      
    &.adjacentLeft
      margin-left x(16)
      
    &.adjacentRight
      margin-right x(16)
</style>
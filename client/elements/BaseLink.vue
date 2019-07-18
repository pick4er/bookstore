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
    },
    render(createElement) {
      const element = this.isRouter ?
        'router-link' :
        'a';
      return createElement(
        element, 
        {
          class: this.linkClasses,
          attrs: {
            target: this.target,
            rel: this.rel,
            ...this.$attrs,       
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
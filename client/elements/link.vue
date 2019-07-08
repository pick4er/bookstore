<template>
  <a :target="target" :rel="rel" :class="linkClasses">
    <slot></slot>
  </a>
</template>

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
  };
</script>

<style lang="stylus" module>
  .link
    cursor pointer

    &.plain
      color $white
      text-decoration none
      
    &.accent
      color $black
      font-family $robotoBold
      text-decoration underline
      font-size x(13)
</style>

<template>
  <div :class="$style.footer">
    2019 /&nbsp;
    <base-link href="http://pick4er.com">
      @pick4er
    </base-link>
  </div>
</template>

<script>
  import BaseLink from 'client/elements/BaseLink';

  export default {
    name: 'footer-section',
    components: {
      'base-link': BaseLink,
    },
  }
</script>

<style lang="stylus" module>
  .footer
    flexCenter()  
    width 100%
    height x(36)
    font-size x(14)
    background-color $dark
    color $white
    
    a
      color $white
</style>

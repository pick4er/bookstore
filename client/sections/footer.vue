<template>
  <div :class="$style.footer">
    2019 /&nbsp;
    <custom-link 
      href="http://pick4er.com" 
      :class="$style.link"
    >
      @pick4er
    </custom-link>
  </div>
</template>

<script>
  import customLink from 'client/elements/customLink';

  export default {
    name: 'footer-section',
    components: {
      'custom-link': customLink,
    },
  }
</script>

<style lang="styl" module>
  .link
    color $white

  .footer
    flexCenter()  
    width 100%
    height x(36)
    font-size x(14)
    background-color $dark
    color $white
</style>

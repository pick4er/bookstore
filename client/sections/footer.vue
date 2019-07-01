<template>
  <div :class="$style.footer">
    2019 /&nbsp;
    <base-link 
      href="http://pick4er.com" 
      :class="$style.link"
    >
      @pick4er
    </base-link>
  </div>
</template>

<script>
  import link from 'client/elements/link';

  export default {
    name: 'footer-section',
    components: {
      'base-link': link,
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

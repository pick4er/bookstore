<template>
  <div :class="$style.base">
    <header :class="$style.header">
      <slot name="header"></slot>
    </header>
    
    <main :class="$style.main">
      <slot></slot>
    </main>
    
    <footer :class="$style.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>  
  export default {
    name: 'base-layout',
  }
</script>

<style lang="styl" module>
  limitWidth()
    width 100%
    max-width x(1000)
    margin-left auto
    margin-right auto

  .base
    display flex
    flex-flow column nowrap
    height 100%
    padding-top x(35)

  .header
    limitWidth()
    padding-bottom x(35)

  .main
    limitWidth()
    flex-grow 1

  .footer
    flex-shrink 0
</style>

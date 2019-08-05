<template>
  <div :class="$style.base">
    <nav :class="$style.nav">
      <slot name="nav" :class="$style.navLinks">
        <nav-section :class="$style.navLinks" />
      </slot>
    </nav>

    <header :class="$style.header">
      <slot name="header">
        <header-section />
      </slot>
    </header>
    
    <main :class="$style.main">
      <slot></slot>
    </main>

    <footer :class="$style.footer">
      <slot name="footer">
        <footer-section />
      </slot>
    </footer>
  </div>
</template>

<script>
  import NavSection from 'client/sections/NavSection';
  import HeaderSection from 'client/sections/HeaderSection';
  import FooterSection from 'client/sections/FooterSection';

  export default {
    name: 'base-layout',
    components: {
      'nav-section': NavSection,
      'header-section': HeaderSection,
      'footer-section': FooterSection,
    },
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    limitWidth()
      width 100%
      max-width x(600)
      margin-left auto
      margin-right auto
      padding-left x(10)
      padding-right x(10)

    .header
      padding-top x(20)
      padding-bottom x(20)

    .header
    .navLinks
    .main
      limitWidth()

  limitWidth()
    width 100%
    max-width x(1000)
    margin-left auto
    margin-right auto

  .base
    flexColumn()
    height 100%
    
  .nav
    height auto
    background-color $gray

    .navLinks
      limitWidth()

  .header
    limitWidth()
    padding-top x(30)
    padding-bottom x(35)

  .main
    limitWidth()
    flex-grow 1

  .footer
    margin-top x(35)
    flex-shrink 0

  .portal
    display block
    width x(100)
    height x(100)
    min-width x(100)
    min-height x(100)
    border x(1) solid $black

  .portalMessage
    font-size x(24)
</style>

<template>
  <div :class="$style.base">
    <nav :class="$style.nav">
      <slot name="nav" :class="$style.navLinks">
        <nav-section
          :class="$style.navLinks"
        ></nav-section>
      </slot>
    </nav>

    <header :class="$style.header">
      <slot name="header">
        <header-section></header-section>
      </slot>
    </header>
    
    <main :class="$style.main">
      <slot></slot>
    </main>
    
    <footer :class="$style.footer">
      <slot name="footer">
        <footer-section></footer-section>
      </slot>
    </footer>
  </div>
</template>

<script>
  import navSection from 'client/sections/nav';
  import headerSection from 'client/sections/header';
  import footerSection from 'client/sections/footer';

  export default {
    name: 'base-layout',
    components: {
      'nav-section': navSection,
      'header-section': headerSection,
      'footer-section': footerSection,      
    }
  }
</script>

<style lang="stylus" module>
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
</style>

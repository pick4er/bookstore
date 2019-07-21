
export default function isAuthorized(Component) {
  return {
    name: 'with-authorization',
    beforeMount() {
      const { 
        state: {
          isAuth = false,
          isAdminModalOpened = false,
        } = {},
      } = this.$store;

      !(isAuth || isAdminModalOpened) &&
      this.$store.commit({
        type: 'OPEN_ADMIN_MODAL',
      });
    },
    render(h) {
      const { 
        state: {
          isAuth = false,
        } = {},
      } = this.$store;

      if (!isAuth) {
        return h();
      }

      return h(
        Component,
        this.data,
        this.children,
      );
    }
  }
}


export default function isAuthorized(Component) {
  return {
    name: 'with-authorization',
    mounted() {
      this.$watch(
        function() {
          return this.$store.state.isAuthed;
        },
        function(nextIsAuthed, isAuthed) {
          if (nextIsAuthed === false) {
            this.$store.commit({
              type: 'OPEN_LOGIN_MODAL',
            });
          }
        },
      );
    },
    render(h) {
      const {
        state: { 
          userMode = '',
          isAuthed = false,
        } = {},
      } = this.$store;

      const { 
        resolved: { 
          meta: { 
            authMode = '',
            isAuth: shouldAuth = false,
          } = {},
        } = {},
      } = this.$router.resolve(this.$route.path) || {};

      /* for all authed users only */
      if (shouldAuth && !isAuthed) {
        return h();
      }

      /* for some user modes only */
      if (Boolean(authMode) && authMode !== userMode) {
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

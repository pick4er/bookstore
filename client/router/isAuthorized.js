import api from 'api';

export default function isAuthorized(Component) {
  return {
    name: 'with-authorization',
    async beforeMount() {
      await this.isAuthenticated()
        .catch(() => {
          this.$store.commit({
            type: 'OPEN_ADMIN_MODAL',
          });
        })
    },
    methods: {
      // same as in elements/BaseLink.vue
      async isAuthenticated() {
        const { 
          state: { isAuth = false } = {},
        } = this.$store;

        if (isAuth) return Promise.resolve(true);

        let isError = false;
        const response = await api('is_authenticated', {
          credentials: 'include',
        }).catch(e => {
          console.error(e);
          isError = true;
        });
        if (isError) return;

        if (response.status === 'ok') {
          this.$store.commit({
            type: 'UPDATE_AUTH',
            isAuth: true,
          })
          return Promise.resolve(true);
        }

        return Promise.reject(false);
      },
    },
    render(h) {
      const { 
        state: { isAuth = false } = {},
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

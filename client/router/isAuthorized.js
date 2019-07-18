
export default function isAuthorized(Component) {
  return {
    name: 'with-authorization',
    functional: true,
    render(h, ctx) {
      const { 
        isAuth = false,
      } = ctx.parent.$store.state || {};

      if (!isAuth) {
        return h();
      }

      return h(
        Component,
        ctx.data,
        ctx.children,
      );
    }
  }
}

import createApp from 'client/app';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  router.push(context.url);
  router.onReady(() => {
    context.rendered = () => {
      context.state = store.state;
    };

    const matchedComponents = router.getMatchedComponents();

    if (matchedComponents.length === 0) {
      return reject({ status: 404 });
    }

    resolve(app);
  }, reject);
});

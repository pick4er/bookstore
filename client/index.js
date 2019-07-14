import createApp from 'client/app.js';

import 'client/styles/app.styl';

const { app, router } = createApp();
router.onReady(() => {
  app.$mount('#app');
});

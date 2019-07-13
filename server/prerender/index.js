import Vue from 'vue';
import { createBundleRenderer } from 'vue-server-renderer';

import markup from '../templates';
import bundle from 'bundle/vue-ssr-server-bundle.json';

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
});

function prerender(ctx) {
  const context = {};

  renderer.renderToString(context, (err, html) => {
    if (err) {
      ctx.status = 500;
      ctx.body = 'Internal error';
      return;
    }

    ctx.status = 200;
    ctx.body = markup.render({
      html,
      styles: context.renderStyles(),
    });
  });
};

export default prerender;

import fs from 'fs';
import Vue from 'vue';
import { createBundleRenderer } from 'vue-server-renderer';

import markup from 'server/templates';
import ssrBundle from 'bundle/vue-ssr-server-bundle.json';
import clientManifest from 'build/vue-ssr-client-manifest.json';

const renderer = createBundleRenderer(ssrBundle, {
  inject: false,
  runInNewContext: false,
  clientManifest,
  template = (html, context) => (
    markup.render({
      html,
      styles: context.renderStyles(),
      scripts: context.renderScripts(),
      resourceHints: context.renderResourceHints(),
    );
  ),
});

async function prerender(ctx) {
  const context = {
    url: ctx.url,
  };

  const html = await renderer.renderToString(context)
    .catch(err => {
      console.log(err);

      if (err.status === 404) {
        ctx.status = 404;
        ctx.body = 'Not found';
      } else {
        ctx.status = 500;
        ctx.body = 'Internal error';
      }

      return;
    })

  ctx.status = 200;
  ctx.body = html;
};

export default prerender;

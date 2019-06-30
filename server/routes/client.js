import fs from 'fs';

export default function getClient(ctx) {
  ctx.set({ 'Content-Type': 'text/html' });
  ctx.body = fs.createReadStream('build/index.html');
};

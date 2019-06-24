import mime from 'mime/lite';
import fs from 'fs';

function getMime(filename) {
  return mime.getType(filename) || 'text/plain';
}

function getAssets(ctx) {
  const filename = ctx.filename.includes('client') ? ctx.filename : 'index.html';

  ctx.set({ 'Content-Type': getMime(filename) });
  ctx.body = fs.createReadStream(`build/${filename}`);
}

export default getAssets;

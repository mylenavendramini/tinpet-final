import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './routers/router';
import db from './models/db';

const app = new Koa();
const PORT = 3001;

(async () => {
  await db.sync();
})();

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () =>
  console.log(`App is now running from the cops ${PORT} meters ahead of them`)
);

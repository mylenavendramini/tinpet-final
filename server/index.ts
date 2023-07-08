import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './routers/router';

const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
};

const app = new Koa();
const PORT = 3001;

app
  .use(cors(corsConfig))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () =>
  console.log(`App is now running from the cops ${PORT} meters ahead of them`)
);

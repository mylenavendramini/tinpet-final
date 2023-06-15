const Koa = require('koa');
const cors = require('@koa/cors');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = 3001;

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);


console.log(`App is now running from the cops ${PORT} meters ahead of them`);
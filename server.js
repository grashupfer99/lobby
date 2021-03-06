const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const API = require("./routes/api");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(`Environment: ${process.env.NODE_ENV }`);

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(bodyParser());

  server.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
  });

  router.get("/login", async ctx => {
    await app.render(ctx.req, ctx.res, "/login", ctx.query);
    ctx.respond = false;
  });

  router.get("/dashboard", async ctx => {
    await app.render(ctx.req, ctx.res, "/dashboard/index", ctx.query);
    ctx.respond = false;
  });

  router.get("/dashboard/search", async ctx => {
    await app.render(ctx.req, ctx.res, "/dashboard/search", ctx.query);
    ctx.respond = false;
  });

  router.get("/dashboard/topic/create", async ctx => {
    await app.render(ctx.req, ctx.res, "/dashboard/topic/create", ctx.query);
    ctx.respond = false;
  });

  router.get("/dashboard/topic/*", async ctx => {
    await app.render(ctx.req, ctx.res, "/dashboard/topic/view", ctx.query);
    ctx.respond = false;
  });

  router.get("/dashboard/profile", async ctx => {
    await app.render(ctx.req, ctx.res, "/dashboard/profile", ctx.query);
    ctx.respond = false;
  });

  router.use("/api", API.routes(), API.allowedMethods());

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

module.exports = app;

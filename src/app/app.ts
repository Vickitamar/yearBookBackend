import * as Koa from "koa";
import * as HttpStatus from "http-status-codes";
import * as bodyParser from "koa-bodyparser";
import bookController from "../book/book.controller";

const app: Koa = new Koa();
const cors = require("@koa/cors");

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

// Middleware
app.use(bodyParser());
app.use(cors());

// Initial route
app.use(bookController.routes()); // adds the route middleware to the application
app.use(bookController.allowedMethods()); // will add another piece of middleware that will ensure correct responses are given for disallowed or non-implemented methods.

// Application error logging.
app.on("error", console.error);

export default app;

import * as Koa from "koa";
import * as Router from "koa-router";
import { getRepository, Repository } from "typeorm";
import bookEntity from "./book.entity";
import * as HttpStatus from "http-status-codes";
import { getCoverImage } from "../services";

const routerOpts: Router.IRouterOptions = {
  prefix: "/books"
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  // Get the book repository from TypeORM.
  const bookRepo: Repository<bookEntity> = getRepository(bookEntity);

  // Find the requested book.
  const books = await bookRepo.find();

  // Respond with our book data.
  ctx.body = books;
});

router.get("/:book_id", async (ctx: Koa.Context) => {
  // Get the book repository from TypeORM.
  const bookRepo: Repository<bookEntity> = getRepository(bookEntity);

  // Find the requested book.
  const book = await bookRepo.findOne(ctx.params.book_id);

  // If the book doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!book) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our book data.
  ctx.body = {
    data: { book }
  };
});

router.post("/", async (ctx: Koa.Context) => {
  // Get the book repository from TypeORM.
  const bookRepo: Repository<bookEntity> = getRepository(bookEntity);

  // Create our new book.
  const book: bookEntity = bookRepo.create();

  book.title = ctx.request.body.title;
  book.author = ctx.request.body.author;
  book.yearread = ctx.request.body.yearread;
  book.isbn10 = ctx.request.body.isbn10;
  book.isbn13 = ctx.request.body.isbn13;
  book.reread = ctx.request.body.reread;
  book.femaleauthor = ctx.request.body.femaleauthor;
  book.img = await getCoverImage(book.isbn10);
  // Persist it to the database.
  await bookRepo.save(book);

  // Set the status to 201.

  // Respond with our book data.ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { book }
  };
});

router.delete("/:book_id", async (ctx: Koa.Context) => {
  // Get the book repository from TypeORM.
  const bookRepo: Repository<bookEntity> = getRepository(bookEntity);

  // Find the requested book.
  const book = await bookRepo.findOne(ctx.params.book_id);

  // If the book doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!book) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Delete our book.
  await bookRepo.delete(book);

  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch("/:book_id", async (ctx: Koa.Context) => {
  // Get the book repository from TypeORM.
  const bookRepo: Repository<bookEntity> = getRepository(bookEntity);

  // Find the requested book.
  const book: bookEntity = await bookRepo.findOne(ctx.params.book_id);

  // If the book doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!book) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Merge the existing book with the new data.
  // This allows for really simple partial (PATCH).
  const updatedBook = await bookRepo.merge(book, ctx.request.body);

  // Save the new data.
  bookRepo.save(updatedBook);

  // Respond with our book data.// Response with the updated content.
  ctx.body = {
    data: { book: updatedBook }
  };
});

export default router;

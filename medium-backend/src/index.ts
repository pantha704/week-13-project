import { Hono } from "hono";
import { PrismaClient, Prisma } from "./generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

// const userSchema = z.object({
//   username: z.string().min(3),
//   password: z.string().min(6),
// });

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "*"],
    // allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    // allowMethods: ["POST", "GET", "OPTIONS"],
    // exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    // maxAge: 600,
    credentials: true,
  })
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;

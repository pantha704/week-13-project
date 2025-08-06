import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
// import { signInSchema } from "@pantha704/medium-schemas";
import { signInSchema } from "../zod";
// HONO

const userRouter = new Hono<{
  Bindings: {
    // Define any bindings you need here, e.g., database connections, etc.
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.json({ message: "User endpoint is working!" });
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input data" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);
  } catch (e) {
    // console.log(e);
    c.status(411);
    return c.text(e as string);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input data" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(404);
      return c.text("User not found");
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);
  } catch (e) {
    // console.log(e);
    c.status(411);
    return c.text(e as string);
  }
});

userRouter.get("/:id", (c) => {
  const userId = c.req.param("id");
  return c.json({ message: `User ID is ${userId}` });
});

export { userRouter };

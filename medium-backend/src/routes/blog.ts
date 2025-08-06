import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string; // This will hold the user ID after JWT verification
  };
}>();

blogRouter.use("*", async (c, next) => {
  const token = c.req.header("Authorization") || "";
  if (!token) {
    c.status(401);
    return c.text("Unauthorized: No token provided");
  }
  try {
    const user = await verify(
      token.replace("Bearer ", ""),
      c.env.JWT_SECRET
    ).catch((err) => {
      // console.error("JWT verification failed:", err);
      c.status(401);
      return c.text("Unauthorized: Invalid token");
    });
    c.set("userId", user.id);
    return next();
  } catch (error) {
    // console.error("Error during JWT verification:", error);
    c.status(401);
    return c.text("Unauthorized: Invalid token");
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        userId: Number(userId),
      },
    });

    return c.json(blog);
  } catch (error) {
    // console.error("Error creating blog post:", error);
    c.status(500);
    return c.text("Internal Server Error");
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json(blog);
  } catch (error) {
    // console.error("Error creating blog post:", error);
    c.status(500);
    return c.text("Internal Server Error");
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      User: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        content: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blog);
  } catch (error) {
    // console.error("Error fetching blog post:", error);
    c.status(500);
    return c.text("Internal Server Error");
  }
});

export { blogRouter };

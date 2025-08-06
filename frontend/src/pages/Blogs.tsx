import { BlogCard } from "@/pages/BlogCard";
import { AppBar } from "@/components/AppBar";
import { useBlogs } from "@/hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs({ id: "" });

  if (loading) return <div className="p-4">Loading...</div>;

  const blog = blogs[0];

  if (!blog) return <div className="p-4">Blog not found.</div>;
  console.log(blogs[blogs.length - 1].User.name);
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-2xl w-full">
          {blogs.map((blog) => {
            return (
              <BlogCard
                id={blog.id}
                authorName={blog.User.name}
                title={blog.title}
                content={blog.content}
                publiishedDate={blog.createdAt}
                // onClick={}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

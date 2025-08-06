import { Blog } from "@/components/Blog";
import { useBlogs } from "@/hooks";
import { useParams } from "react-router-dom";

export const BlogPage = () => {
  const { id } = useParams();
  const { loading, blogs } = useBlogs({ id });

  if (loading) return <div className="p-4">Loading...</div>;

  const blog = blogs[0];

  if (!blog) return <div className="p-4">Blog not found.</div>;

  return <Blog blog={blog} />;
};

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface Blog {
  id: number;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
  };
}

export const useBlogs = ({ id }: { id?: number | string } = {}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const endpoint = id
          ? `${BACKEND_URL}/api/v1/blog/${id}`
          : `${BACKEND_URL}/api/v1/blog/bulk`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        // If it's a single blog, wrap it in an array for consistency
        const blogData = id ? [response.data] : response.data;

        setBlogs(blogData);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return { loading, blogs };
};

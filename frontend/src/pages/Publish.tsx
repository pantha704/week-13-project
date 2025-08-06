import { useState } from "react";
import { AppBar } from "@/components/AppBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const Publish = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  return (
    <div>
      <AppBar />
      <div className="flex justify-center items-center">
        <div className="m-10 flex flex-col justify-center items-start">
          <form
            action={async () => {
              try {
                // CORRECTED: Proper axios structure - data is 2nd parameter, config is 3rd
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title: post.title,
                    content: post.content,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );

                const id = response.data.id;
                navigate("/blog/" + id);
              } catch (error) {
                console.error("Failed to publish post:", error);
                // You might want to show an error message to the user here
              }
            }}
          >
            {/* <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
          Your message
        </label> */}
            <input
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              id="message"
              className="block mt-5 px-5 py-4 w-[50vw] font-medium text-lg text-gray-900 bg-slate-50 rounded-xl border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              // placeholder="Write your thoughts here..."
            ></input>
            <textarea
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              id="message"
              className="block h-50 min-h-20 my-5 p-3 pl-5 w-[50vw] text-sm text-gray-900 rounded-xl border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <button
              className="my-2 px-4 py-2 bg-blue-500 rounded-lg text-white"
              type="submit"
            >
              Publish Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

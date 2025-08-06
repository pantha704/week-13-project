import { AppBar } from "@/components/AppBar";
import { Avatar } from "@/components/Avatar";

export const Blog = ({
  blog,
}: {
  blog: {
    id: number;
    content: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    User: {
      name: string;
    };
  };
}) => {
  return (
    <div>
      <AppBar />
      <div className="grid grid-cols-12 px-10 py-6 h-[100vh] m-6 ">
        {/* Main Content */}
        <div className="col-span-8 m-12 gap-3 flex flex-col ">
          <h1 className="text-5xl font-extrabold mb-4 w-[50vw]">
            {blog.title}
            {/* Most people live with a comforting illusion: that they are the sum
            of */}
          </h1>
          <p className="text-md font-medium text-gray-500 mb-4">
            By {blog.User.name} on {new Date(blog.createdAt).toDateString()}
          </p>
          <div className="flex mt-4">
            <p className="text-lg leading-6 tracking-wider text-gray-800 whitespace-pre-line">
              {blog.content}
              {/* Most people live with a comforting illusion: that they are the sum
              of their intentions. That wanting to be kind, disciplined,
              creative, or courageous is enough. But life doesn’t grade us on
              potential. It holds us accountable to what we actually do. We are
              the result of our actions, not our aspirations. No one is
              remembered for what they planned to do. Your calendar tells the
              truth your journal may not. In the end, it’s not the thoughts you
              cherish, but the habits you uphold, that define who you are. */}
            </p>
          </div>
        </div>

        {/* Sidebar or Extras */}
        <div className="col-span-4 m-12 ">
          <div className="flex flex-col p-4 border rounded-md gap-3 shadow-sm text-sm text-gray-600">
            <p className="ml-2 text-[16px]">Author</p>
            <div className="grid grid-cols-12 gap-4 items-center h-full w-full">
              <div className="col-span-2">
                <Avatar name={blog.User.name} className="" size="md" />
              </div>
              <div className="col-span-10 w-full">
                <p className="font-bold text-2xl pb-2">{blog.User.name}</p>
                <p className="w-full">
                  Some radom eye catchy phrase about user's qualities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

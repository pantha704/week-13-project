import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

export const AppBar = ({ name = "Panther" }: { name?: string }) => {
  return (
    <div className="flex justify-between items-center bg-slate-100 h-16 border-b px-10 mb-4 ">
      <Link to={"/blogs"}>Medium</Link>
      <div className="flex justify-center items-center">
        <Link to="/publish">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-3xl text-sm px-5 py-2.5 me-4 dark:bg-green-600 dark:hover:bg-green-700 active:bg-green-900"
          >
            Publish
          </button>
        </Link>
        <Avatar name={name} size="md" />
      </div>
    </div>
  );
};

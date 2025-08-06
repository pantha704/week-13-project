import { Circle } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number | string;
  authorName: string;
  title: string;
  content: string;
  publiishedDate: string;
  onClick?: Event;
}

export const BlogCard = ({
  id = "",
  authorName = "Anonymous",
  title,
  content,
  publiishedDate = "",
}: BlogCardProps) => {
  const now = new Date();

  return (
    <Link to={"/blog/" + id}>
      <div className="p-4 border-b-[1.75px] border-slate-200 mb-2">
        {/* Author Row */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <Avatar name={authorName} />
          <span>
            {authorName.slice(0, 1).toUpperCase()}
            {authorName.slice(1)}
          </span>
          <Circle size={4} className="bg-slate-500 rounded-full" />
          <span>{publiishedDate.split("T")[0] || now.toDateString()}</span>
        </div>

        {/* Title */}
        <div className="font-semibold text-2xl py-2">{title}</div>

        {/* Content Preview */}
        <div className="font-light text-md py-2">
          {content.slice(0, 100) + "..."}
        </div>

        {/* Read Time */}
        <div className="text-sm text-slate-400 w-full pt-4 font-light">
          {Math.floor(content.length / 100)} minute(s) read
        </div>
      </div>
    </Link>
  );
};

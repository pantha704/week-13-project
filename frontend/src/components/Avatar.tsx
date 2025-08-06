import clsx from "clsx";

type AvatarProps = {
  name: string;
  imgSrc?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "w-6 h-6 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

export const Avatar = ({
  name,
  imgSrc,
  size = "sm",
  className,
}: AvatarProps) => {
  const sizeClasses = sizeMap[size];
  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 m-1 text-gray-600 dark:text-gray-300 font-light text-sm",
        sizeClasses,
        className
      )}
      title={name}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={name} className="object-cover w-full h-full" />
      ) : (
        <span>{name.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
};

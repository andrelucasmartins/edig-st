import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md text-black transition-colors  dark:text-white">
      {/* Search */}
      {/* <div className="flex lg:ml-6">
        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
        </a>
      </div> */}
      <ShoppingBagIcon
        aria-hidden="true"
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          "h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
          className
        )}
      />
      <span className="sr-only">Search</span>

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-0 -mt-0 h-4 w-4 rounded-full bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

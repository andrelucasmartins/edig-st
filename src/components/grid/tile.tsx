import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div>
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <div
          className={clsx("shadow-md shadow-gray-300/40 rounded", {
            "border-2 border-purple-600": active,
          })}
        >
          <Image
            className={clsx("relative h-full w-full object-contain", {
              "transition duration-300 ease-in-out group-hover:scale-105 shadow-md ":
                isInteractive,
            })}
            {...props}
          />
        </div>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}

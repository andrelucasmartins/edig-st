/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";
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
} & ComponentProps<typeof Image>) {
  return (
    <div>
      {" "}
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <div
          className={clsx("rounded shadow-md shadow-gray-300/40", {
            "border-2 border-purple-600": active,
          })}
        >
          <Image
            className={clsx("relative h-full w-full object-contain", {
              "shadow-md transition duration-300 ease-in-out group-hover:scale-105 ":
                isInteractive,
            })}
            width={100}
            height={100}
            sizes="(100%, 100%)"
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

"use client";

import Link from "next/link";

import { Button } from "@nextui-org/react";

import { cn } from "@/lib/utils2";
import { ReactNode, useTransition } from "react";
import { pageNextCount, pagePrevCount } from "./actions";

interface ActionButtonProps {
  children: ReactNode;
  link: string;
  cursor: string;
  disabled: boolean;
}

export const ActionButtonNext = ({
  children,
  link,
  cursor,
  disabled,
  ...props
}: ActionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      {...props}
      as={Link}
      href={link}
      isDisabled={disabled}
      onClick={() =>
        startTransition(async () => void (await pageNextCount(cursor)))
      }
      color="primary"
      variant="solid"
      className={cn("p-2 rounded hover:opacity-80", disabled && "opacity-50")}
    >
      {children}
    </Button>
  );
};
export const ActionButtonPrev = ({
  children,
  cursor,
  link,
  disabled,
  ...props
}: ActionButtonProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      href={link}
      isDisabled={disabled}
      as={Link}
      color="primary"
      variant="solid"
      className={cn("p-2 rounded hover:opacity-80", disabled && "opacity-50")}
      onClick={() =>
        startTransition(async () => void (await pagePrevCount(cursor)))
      }
    >
      {children}
    </Button>
  );
};

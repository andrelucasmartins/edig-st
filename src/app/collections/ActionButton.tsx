"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { pageNextCount } from "./actions";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  link: string;
}

export const ActionButtonNext = ({
  children,
  link,
  ...props
}: ActionButtonProps) => {
  const [isPending, startTransition] = useTransition();
  // async function handleNext() {
  //   "use server";
  // await pageNextCount();
  // }

  return (
    <Button
      {...props}
      onClick={() => startTransition(() => pageNextCount(link))}
      disabled={isPending}
    >
      {children}
    </Button>
  );
};
export const ActionButtonPrev = ({
  children,
  ...props
}: Omit<ActionButtonProps, "link">) => {
  const router = useRouter();
  return (
    <Button {...props} onClick={() => router.back()}>
      {children}
    </Button>
  );
};

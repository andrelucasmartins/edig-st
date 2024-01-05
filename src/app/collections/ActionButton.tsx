"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils2"
import { ReactNode, useTransition } from "react"
import { pageNextCount, pagePrevCount } from "./actions"

interface ActionButtonProps {
  children: ReactNode
  link: string
  cursor: string
  disabled: boolean
}

export const ActionButtonNext = ({
  children,
  link,
  cursor,
  disabled,
  ...props
}: ActionButtonProps) => {
  const [, startTransition] = useTransition()

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams],
  // )

  return (
    <Button
      {...props}
      disabled={disabled}
      asChild
      size="icon"
      onClick={() =>
        startTransition(async () => void (await pageNextCount(cursor)))
      }
      color="primary"
      className={cn(
        disabled && "touch-none opacity-50 hover:opacity-50",
        "rounded p-2 hover:opacity-80",
      )}
    >
      <Link
        href={link}
        prefetch={false}
        aria-disabled={disabled}
        className={cn(disabled && "pointer-events-none")}
      >
        {children}
      </Link>
    </Button>
  )
}
export const ActionButtonPrev = ({
  children,
  link,
  cursor,
  disabled,
  ...props
}: ActionButtonProps) => {
  const [, startTransition] = useTransition()

  return (
    <Button
      {...props}
      disabled={disabled}
      color="primary"
      size="icon"
      asChild
      className={cn(
        "rounded p-2 hover:opacity-80",
        disabled && "opacity-50 hover:opacity-50",
      )}
      onClick={() =>
        startTransition(async () => void (await pagePrevCount(cursor)))
      }
    >
      <Link
        href={link}
        prefetch={false}
        className={cn(disabled && "pointer-events-none")}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    </Button>
  )
}

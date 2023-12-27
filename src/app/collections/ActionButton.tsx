"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils2"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useCallback, useTransition } from "react"
import { pagePrevCount } from "./actions"

interface ActionButtonProps {
  children: ReactNode
  link?: string
  cursor: string
  disabled: boolean
}

export const ActionButtonNext = ({
  children,
  cursor,
  disabled,
  ...props
}: ActionButtonProps) => {
  // const [, startTransition] = useTransition();
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Button
      {...props}
      disabled={disabled}
      asChild
      size="icon"
      // onClick={() =>
      //   startTransition(async () => void (await pageNextCount(cursor)))
      // }
      onClick={() => {
        console.log(cursor)
        router.push(pathname + "?" + createQueryString("page", cursor))
      }}
      color="primary"
      className={cn("rounded p-2 hover:opacity-80", disabled && "opacity-50")}
    >
      <Link href={pathname + "?" + createQueryString("page", cursor)}>
        {children}
      </Link>
    </Button>
  )
}
export const ActionButtonPrev = ({
  children,
  cursor,
  disabled,
  ...props
}: ActionButtonProps) => {
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Button
      {...props}
      disabled={disabled}
      color="primary"
      size="icon"
      className={cn("rounded p-2 hover:opacity-80", disabled && "opacity-50")}
      onClick={() =>
        startTransition(async () => void (await pagePrevCount(cursor)))
      }
    >
      <Link href={pathname + "?" + createQueryString("page", cursor)}>
        {children}
      </Link>
    </Button>
  )
}

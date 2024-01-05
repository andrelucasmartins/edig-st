"use client"

import { createUrl } from "@/lib/utils"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { HiOutlineMagnifyingGlass, HiOutlineXCircle } from "react-icons/hi2"

interface SearchProps {
  className?: string
}

export default function Search({ className }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set("q", search.value)
    } else {
      newParams.delete("q")
    }

    router.push(createUrl("/search", newParams))
  }

  return (
    <>
      <HiOutlineMagnifyingGlass
        onClick={() => setIsOpen(!isOpen)}
        aria-hidden="true"
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          "h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
          className,
        )}
      />
      <div className="sr-only">Search</div>
      <div className="flex  items-center justify-center rounded-md text-black transition-colors  dark:text-white">
        {isOpen && (
          <>
            <div className="absolute left-0 z-10 flex h-full min-w-full items-center justify-end bg-gray-100">
              <form
                onSubmit={onSubmit}
                className="relative mx-auto w-full max-w-2xl"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Pesquisar produtos"
                  autoComplete="off"
                  defaultValue={searchParams?.get("q") || ""}
                  className="w-full rounded-lg  border border-neutral-400/20 bg-white px-4 py-2 text-sm  text-black shadow-md placeholder:text-neutral-500 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
                />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                  <MagnifyingGlassIcon className="h-4" />
                </div>
              </form>
              <HiOutlineXCircle
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                  "-mt-4 mr-4 h-4 transition-all ease-in-out hover:scale-110 ",
                  "h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                  className,
                )}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

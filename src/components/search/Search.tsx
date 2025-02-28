"use client";
import clsx from "clsx";
import { Category, SearchQuery } from "@/types";
import Link from "next/link";
import { InputSearch } from "./InputSearch";
import { useState, useEffect } from "react";
import { PATHS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { toQueryString } from "@/helpers";
import { useRouter } from "next/navigation";

export function Search({
  className,
  categories,
}: {
  categories: Category[];
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    tukhoa: "",
    theloai: "",
  });

  useEffect(() => {
    setSearchQuery({
      tukhoa: searchParams.get("tukhoa") || "",
      theloai: searchParams.get("theloai") || "",
    });
  }, [searchParams]);

  return (
    <section
      className={clsx("rounded-lg bg-white p-4 pb-10 shadow-md", className)}
    >
      <h2 className={clsx("text-center font-semibold uppercase")}>Tìm kiếm</h2>

      <InputSearch
        className="mt-4"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => {
          router.push(
            `${PATHS.searchResults}?${toQueryString({
              ...searchQuery,
            })}`,
          );
        }}
        overlay={
          searchQuery.tukhoa
            ? `Tìm kiếm "${searchQuery.tukhoa}" ${
                searchQuery.theloai
                  ? `cho thể loại "${
                      categories.find(
                        (c) => c.id === Number(searchQuery.theloai),
                      )?.name
                    }"`
                  : ""
              }`
            : ""
        }
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = searchQuery.theloai === category.id.toString();
          return (
            <Link
              key={category.id}
              href={`${PATHS.searchResults}?${toQueryString({
                ...searchQuery,
                theloai: category.id.toString(),
              })}`}
              className={clsx(
                "rounded-md px-3 py-1 text-sm",
                isActive
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 hover:bg-gray-300",
              )}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

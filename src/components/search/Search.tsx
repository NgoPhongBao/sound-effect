"use client";
import clsx from "clsx";
import { Category, SearchQuery } from "@/types";
import Link from "next/link";
import { InputSearch } from "./InputSearch";
import { useState, useEffect } from "react";
import { PATHS } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { toQueryString } from "@/helpers";
export function Search({
  className,
  categories,
}: {
  categories: Category[];
  className?: string;
}) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    q: "",
    category: "",
  });

  const isSearchResultsPage = usePathname() === PATHS.searchResults;

  useEffect(() => {
    setSearchQuery({
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
    });
  }, [searchParams]);

  return (
    <section
      className={clsx("rounded-lg bg-white p-4 pb-10 shadow-md", className)}
    >
      <h2
        className={clsx(
          "font-semibold uppercase",
          isSearchResultsPage ? "text-left" : "text-center",
        )}
      >
        {isSearchResultsPage
          ? `Kết quả tìm kiếm cho "${searchQuery.q}"`
          : "Tìm kiếm"}
      </h2>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = searchQuery.category === category.id.toString();
          return (
            <Link
              key={category.id}
              href={`${PATHS.searchResults}?${toQueryString({
                ...searchQuery,
                category: category.id.toString(),
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
      <InputSearch
        className="mt-4"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => {}}
        overlay={
          searchQuery.q
            ? `Tìm kiếm "${searchQuery.q}" ${
                searchQuery.category
                  ? `cho thể loại "${
                      categories.find(
                        (c) => c.id === Number(searchQuery.category),
                      )?.name
                    }"`
                  : ""
              }`
            : ""
        }
      />
    </section>
  );
}

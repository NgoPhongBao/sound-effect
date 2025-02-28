"use client";
import clsx from "clsx";
import { Category, SearchQuery } from "@/types";
import Link from "next/link";
import { InputSearch } from "./InputSearch";
import { useState, useEffect, Suspense } from "react";
import { PATHS } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { toQueryString } from "@/helpers";
import { SoundItem } from "@/components/SoundItem";
import { sounds } from "@/constants";
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
      <div className="mt-4 flex flex-wrap gap-2">
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

      {isSearchResultsPage && (
        <div className="mt-8">
          <Suspense fallback={<div>Loading...</div>}>
            <h2 className={clsx("font-semibold uppercase")}>
              {`Kết quả tìm kiếm: "${searchParams.get("q")}"`}
            </h2>

            <div className="mt-4 flex flex-col justify-center gap-2">
              {sounds.map((sound) => (
                <SoundItem key={sound.id} sound={sound} />
              ))}
            </div>

            <p className="py-10 text-center text-gray-500">
              Không có kết quả tìm kiếm
            </p>
          </Suspense>
        </div>
      )}
    </section>
  );
}

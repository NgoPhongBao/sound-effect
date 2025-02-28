"use client";
import clsx from "clsx";
import { Category } from "@/types";
import Link from "next/link";
import { InputSearch } from "./InputSearch";
import { useState } from "react";
export function Search({
  className,
  categories,
}: {
  categories: Category[];
  className?: string;
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <section
      className={clsx("rounded-lg bg-white p-4 pb-10 shadow-md", className)}
    >
      <h2 className="text-center font-semibold uppercase">Tìm kiếm</h2>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/the-loai/${category.id}`}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <InputSearch
        className="mt-4"
        value={searchText}
        setValue={setSearchText}
        onSearch={() => {}}
        overlay={`Tìm kiếm ${searchText} ...`}
      />
    </section>
  );
}

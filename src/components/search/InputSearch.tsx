"use client";
import clsx from "clsx";
import { useState } from "react";
import { SearchQuery } from "@/types";
import { PATHS } from "@/constants";
import { toQueryString } from "@/helpers";
import Link from "next/link";

export function InputSearch({
  placeholder = "Tìm kiếm âm thanh...",
  onSearch,
  className,
  searchQuery,
  setSearchQuery,
}: {
  placeholder?: string;
  onSearch?: () => void;
  className?: string;
  searchQuery: SearchQuery;
  setSearchQuery: (value: SearchQuery) => void;
}) {
  const [focus, setFocus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("relative shadow-md", className)}
    >
      <input
        type="text"
        value={searchQuery.tukhoa || ""}
        onChange={(e) => {
          setSearchQuery({ ...searchQuery, tukhoa: e.target.value });
          setFocus(true);
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-gray-500 focus:outline-none"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch?.();
            setFocus(false);
          }
        }}
      />
      <Link
        href={`${PATHS.searchResults}?${toQueryString(searchQuery)}`}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        onClick={() => {
          onSearch?.();
          setFocus(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Link>
    </form>
  );
}

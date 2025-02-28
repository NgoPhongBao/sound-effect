"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import Link from "next/link";

export function InputSearch({
  placeholder = "Tìm kiếm...",
  onSearch,
  className,
  overlay,
  value,
  setValue,
}: {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  overlay?: ReactNode;
  value: string;
  setValue: (value: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("relative shadow-md", className)}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
      </button>
      {!!overlay && (
        <div className="absolute -bottom-1 left-0 w-full translate-y-full rounded-lg bg-white text-center shadow-lg">
          <div className="flex w-full items-center justify-between p-4">
            <div className="flex gap-2">
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
              {overlay}
            </div>
            <button className="rounded-md bg-gray-200 px-2 py-1 text-sm">
              ENTER
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

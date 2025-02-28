"use client";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAppContext } from "@/AppContext";
import { PATHS } from "@/constants";
import { toQueryString } from "@/helpers";

export default function Header() {
  const router = useRouter();
  const { user } = useAppContext();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = useCallback(
    (value: string) => {
      router.push(
        `${PATHS.searchResults}?${toQueryString({
          tukhoa: value,
        })}`,
      );
      setSearchValue(null);
    },
    [router],
  );

  // const debouncedSearch = useDebounce(search, 500);

  // useEffect(() => {
  //   if (debouncedSearch === null) return;
  //   handleSearch(debouncedSearch);
  // }, [debouncedSearch, handleSearch]);

  return (
    <>
      <header
        className={clsx(
          "flex items-center justify-between bg-gray-800 px-4 py-3 text-white",
        )}
      >
        <Link href="/" className="flex items-end">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-6 w-6 object-contain"
          />
          <span className="hidden translate-y-[5px] leading-none font-bold md:inline-block md:text-3xl">
            hoamthanh.com
          </span>
        </Link>

        <div className="relative mx-4 max-w-[400px] flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm âm thanh..."
            className="w-full rounded-lg bg-gray-500 px-3 py-2 placeholder:text-gray-300 focus:ring-1 focus:ring-white focus:outline-none"
            value={searchValue || ""}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchValue || "");
              }
            }}
          />
          <Link
            href={`${PATHS.searchResults}?${toQueryString({
              tukhoa: searchValue || "",
            })}`}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label="Search"
            onClick={() => handleSearch(searchValue || "")}
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
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:text-gray-300"
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </header>

      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 transition-opacity",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-[400px] bg-white transition-transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block rounded-lg p-2 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/the-loai"
                className="block rounded-lg p-2 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Thể loại
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href={PATHS.admin}
                  className="block rounded-lg p-2 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <form action="/auth/signout" method="post">
                  <button
                    className="inline-block rounded-lg bg-gray-500 px-3 py-2 text-white hover:bg-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng xuất
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="inline-block rounded-lg bg-gray-500 px-3 py-2 text-white hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

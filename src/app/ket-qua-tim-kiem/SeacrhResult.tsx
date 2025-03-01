"use client";
import { useSearchParams } from "next/navigation";
import { Search, SoundItem } from "@/components";
import { PATHS } from "@/constants";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { toQueryString } from "@/helpers";
import { Pagination } from "@/components";
import { useAppContext } from "@/AppContext";

export default function TimKiemPage() {
  const searchParams = useSearchParams();
  const tukhoa = searchParams.get("tukhoa") || "";
  const theloai = searchParams.get("theloai") || "";
  const router = useRouter();
  const { categories } = useAppContext();
  return (
    <>
      <Search className="mt-4" />
      <div className="mt-4">
        <Suspense fallback={<div>Đang tải...</div>}>
          <section className="mt-4 rounded-lg bg-white p-4 shadow-md">
            <p className="font-semibold uppercase">Kết quả tìm kiếm</p>
            <div className="mt-2">
              {!!tukhoa && (
                <div className="flex items-center gap-2">
                  Từ khoá: <p className="font-bold">{tukhoa}</p>
                  <button
                    onClick={() => {
                      router.push(
                        `${PATHS.searchResults}?${toQueryString({
                          theloai,
                        })}`,
                      );
                    }}
                    className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {!!theloai && (
                <div className="flex items-center gap-2">
                  Thể loại:{" "}
                  <p className="font-bold">
                    {
                      categories?.find(
                        (category) => category.id === Number(theloai),
                      )?.name
                    }
                  </p>
                  <button
                    onClick={() => {
                      router.push(
                        `${PATHS.searchResults}?${toQueryString({
                          tukhoa,
                        })}`,
                      );
                    }}
                    className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {/* {[].map((sound) => (
                <SoundItem key={sound.id} sound={sound} />
              ))} */}
            </div>
            <Pagination pageCount={10} />
          </section>
        </Suspense>
      </div>
    </>
  );
}

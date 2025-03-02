"use client";
import { useSearchParams } from "next/navigation";
import { SoundItem } from "@/components";
import { PAGE_SIZE } from "@/constants";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { toQueryString } from "@/helpers";
import { Pagination } from "@/components";
import { Sound } from "@/types";
interface SoundListWithPaginationProps {
  title: string;
  sounds: Sound[];
  count: number;
  link: string;
}

export function SoundListWithPagination({
  title,
  sounds,
  count,
  link,
}: SoundListWithPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trang = searchParams.get("trang")
    ? Number(searchParams.get("trang")) - 1
    : 0;

  const handlePageChange = (selectedItem: { selected: number }) => {
    router.push(
      `${link}?${toQueryString({
        trang: selectedItem.selected + 1,
      })}`,
    );
  };
  return (
    <>
      <section className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <p className="font-semibold uppercase">{title}</p>
        <div className="mt-4 space-y-2">
          {sounds.length > 0 ? (
            sounds.map((sound) => <SoundItem key={sound.id} sound={sound} />)
          ) : (
            <div className="mb-4 text-center text-gray-500">
              Không tìm thấy kết quả
            </div>
          )}
        </div>
        <Pagination
          pageCount={Math.ceil(count / PAGE_SIZE)}
          forcePage={trang}
          onPageChange={handlePageChange}
          hrefBuilder={(page) =>
            `${link}?${toQueryString({
              trang: page,
            })}`
          }
        />
      </section>
    </>
  );
}

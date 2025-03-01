"use client";
import { useSearchParams } from "next/navigation";
import { Search, SoundItem } from "@/components";
import { sounds, categories, PATHS } from "@/constants";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { toQueryString } from "@/helpers";
import { Pagination } from "@/components";
import { Sound } from "@/types";
interface SoundListWithPaginationProps {
  title: string;
  sounds: Sound[];
}

export function SoundListWithPagination({
  title,
  sounds,
}: SoundListWithPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <>
      <div className="mt-4">
        <Suspense fallback={<div>Đang tải...</div>}>
          <section className="mt-4 rounded-lg bg-white p-4 shadow-md">
            <p className="font-semibold uppercase">{title}</p>
            <div className="mt-4 space-y-2">
              {sounds.map((sound) => (
                <SoundItem key={sound.id} sound={sound} />
              ))}
            </div>
            <Pagination pageCount={10} />
          </section>
        </Suspense>
      </div>
    </>
  );
}

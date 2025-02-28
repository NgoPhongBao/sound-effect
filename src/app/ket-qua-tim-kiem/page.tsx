"use client";
import { useSearchParams } from "next/navigation";
import { SoundList, Search } from "@/components";
import { sounds } from "@/constants";
import { Suspense } from "react";
import { categories } from "@/constants";

export default function TimKiemPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Result />
      </Suspense>

      {/* Danh mục */}
      <Search className="mt-4" categories={categories} />

      {/* Âm thanh viral */}
      <SoundList title="Âm thanh viral" sounds={sounds} />

      {/* Âm thanh mới */}
      <SoundList title="Âm thanh mới" sounds={sounds} />
    </>
  );
}

const Result = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  return <SoundList title={`Kết quả tìm kiếm: "${q}"`} sounds={[]} />;
};

"use client";
import { useSearchParams } from "next/navigation";
import { SoundList, Search } from "@/components";
import { sounds } from "@/constants";
import { Suspense } from "react";
import { categories } from "@/constants";

export default function TimKiemPage() {
  return (
    <>
      {/* Kết quả tìm kiếm */}
      <Search className="mt-4" categories={categories} />
    </>
  );
}

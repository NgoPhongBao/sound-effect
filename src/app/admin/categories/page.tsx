"use client";

import { InputSearch, Pagination } from "@/components";
import { categories } from "@/constants";
import { useState } from "react";

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePageClick = (event: any) => {
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4 sm:gap-6">
        {/* <InputSearch placeholder="Tìm kiếm thể loại..." className="flex-auto" /> */}
        <button
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => setIsOpen(true)}
        >
          Thêm mới
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <span>{category.name}</span>
            <div className="flex gap-2">
              <button className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600">
                Edit
              </button>
              <button className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageCount={10}
        // onPageChange={onPageChange}
        // forcePage={cur}
        // hrefBuilder={parsePageURL}
      />
      <CreateCategoryForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function CreateCategoryForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/[30%]">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Thêm thể loại mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Tên thể loại
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nhập tên thể loại"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

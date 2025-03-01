"use client";

import { Pagination } from "@/components";
import { useState, useEffect } from "react";
import { createClientBrowserSide } from "@/supabase/client";
import { Category, CategoryUpdatePayload } from "@/types";
import clsx from "clsx";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [categoryEdit, setCategoryEdit] = useState<Category | null>(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (newPage?: number) => {
    const supabase = await createClientBrowserSide();
    const _page = typeof newPage === "number" ? newPage : page;
    setPage(_page);
    const { data: categories, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(_page * PAGE_SIZE, _page * PAGE_SIZE + PAGE_SIZE - 1)
      .order("priority", { ascending: false });
    setCategories(categories || ([] as Category[]));
    setCount(count || 0);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    fetchCategories(selectedItem.selected);
  };

  const handleSubmit = async (category: CategoryUpdatePayload) => {
    try {
      const supabase = await createClientBrowserSide();
      if (category.id) {
        const id = category.id;
        delete category.id;
        await supabase
          .from("categories")
          .update({
            ...category,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
      } else {
        await supabase.from("categories").insert({
          ...category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      fetchCategories(!category.id ? 0 : page);
      toast.success("Cập nhật thành công");
      setIsOpen(false);
      setCategoryEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-end">
        <button
          className="rounded-lg bg-green-500 px-2 py-1 text-white hover:bg-green-600"
          onClick={() => setIsOpen(true)}
        >
          Thêm mới
        </button>
      </div>
      <table className="mt-4 w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2 text-left font-semibold">Tên thể loại</th>
            <th className="px-4 py-2 text-left font-semibold">Ưu tiên</th>
            <th className="px-4 py-2 text-right font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">{category.priority}</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-2">
                  <button
                    className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                    onClick={() => {
                      setIsOpen(true);
                      setCategoryEdit(category);
                    }}
                  >
                    Sửa
                  </button>
                  <button className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageCount={Math.ceil(count / PAGE_SIZE)}
        onPageChange={handlePageChange}
        forcePage={page}
        // hrefBuilder={(page) => `${PATHS.adminCategories}?page=${page + 1}`}
      />
      <CreateCategoryForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setCategoryEdit(null);
        }}
        categoryEdit={categoryEdit || undefined}
        onSubmit={handleSubmit}
      />
    </>
  );
}

function CreateCategoryForm({
  isOpen,
  onClose,
  categoryEdit,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  categoryEdit?: Category;
  onSubmit: (category: CategoryUpdatePayload) => void;
}) {
  const [values, setValues] = useState<CategoryUpdatePayload>({
    name: categoryEdit?.name || "",
    priority: categoryEdit?.priority || 0,
  });

  useEffect(() => {
    if (categoryEdit) {
      setValues({
        ...categoryEdit,
      });
    }
  }, [categoryEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
    setValues({
      name: "",
      priority: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/[30%]">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {categoryEdit ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Tên thể loại<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nhập tên thể loại"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium"
            >
              Ưu tiên<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="priority"
              placeholder="Nhập ưu tiên"
              value={values.priority}
              onChange={(e) =>
                setValues({ ...values, priority: Number(e.target.value) })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              min={0}
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
              className={clsx(
                "rounded-lg px-4 py-2 text-sm text-white",
                categoryEdit
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600",
                !values.name || typeof values.priority !== "number"
                  ? "cursor-not-allowed opacity-50"
                  : "",
              )}
              disabled={!values.name || typeof values.priority !== "number"}
            >
              {categoryEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

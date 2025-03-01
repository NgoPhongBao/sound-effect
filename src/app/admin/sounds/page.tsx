"use client";

import { Pagination } from "@/components";
import { useState, useEffect } from "react";
import { createClientBrowserSide } from "@/supabase/client";
import { Sound, SoundUpdatePayload } from "@/types";
import clsx from "clsx";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

export default function SoundsPage() {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [soundEdit, setSoundEdit] = useState<Sound | null>(null);
  const [soundDelete, setSoundDelete] = useState<Sound | null>(null);

  useEffect(() => {
    fetchSounds();
  }, []);

  const fetchSounds = async (newPage?: number) => {
    const supabase = await createClientBrowserSide();
    const _page = typeof newPage === "number" ? newPage : page;
    setPage(_page);
    const { data: sounds, count } = await supabase
      .from("sounds")
      .select("*", { count: "exact" })
      .range(_page * PAGE_SIZE, _page * PAGE_SIZE + PAGE_SIZE - 1);
    setSounds(sounds || ([] as Sound[]));
    setCount(count || 0);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    fetchSounds(selectedItem.selected);
  };

  const handleSubmit = async (sound: SoundUpdatePayload) => {
    try {
      const supabase = await createClientBrowserSide();
      if (sound.id) {
        const id = sound.id;
        delete sound.id;
        await supabase
          .from("sounds")
          .update({
            ...sound,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
      } else {
        await supabase.from("sounds").insert({
          ...sound,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      fetchSounds(!sound.id ? 0 : page);
      toast.success("Cập nhật thành công");
      setIsOpen(false);
      setSoundEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const supabase = await createClientBrowserSide();
    await supabase.from("sounds").delete().eq("id", soundDelete?.id);
    fetchSounds(page);
    toast.success("Xóa thành công");
    setSoundDelete(null);
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
            <th className="px-4 py-2 text-left font-semibold">Tên âm thanh</th>
            <th className="px-4 py-2 text-left font-semibold"></th>
            <th className="px-4 py-2 text-right font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sounds.map((sound) => (
            <tr key={sound.id} className="border-b border-gray-200">
              <td className="px-4 py-2">
                <div className="flex flex-col gap-[2px]">
                  <a href={sound.url} target="_blank" className="text-sm">
                    {sound.title}
                  </a>
                  <p className="text-xs text-gray-500">
                    Thể loại: {sound.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    Thời lượng: {sound.duration}s
                  </p>
                  <p className="text-xs text-gray-500">
                    Lượt tải: {sound.downloads}
                  </p>
                  <p className="text-xs text-gray-500">
                    Lượt nghe: {sound.plays}
                  </p>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sound.is_viral}
                      onChange={() => {}}
                      id="is_viral"
                    />
                    <label htmlFor="is_viral" className="text-sm">
                      Viral
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sound.is_trending}
                      onChange={() => {}}
                      id="is_trending"
                    />
                    <label htmlFor="is_trending" className="text-sm">
                      Trending
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sound.is_new}
                      onChange={() => {}}
                      id="is_new"
                    />
                    <label htmlFor="is_new" className="text-sm">
                      Mới
                    </label>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-2">
                  <button
                    className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                    onClick={() => {
                      setIsOpen(true);
                      setSoundEdit(sound);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                    onClick={() => setSoundDelete(sound)}
                  >
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
        // hrefBuilder={(page) => `${PATHS.adminSounds}?page=${page + 1}`}
      />
      <CreateSoundForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSoundEdit(null);
        }}
        soundEdit={soundEdit || undefined}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmModal
        isOpen={!!soundDelete}
        onClose={() => setSoundDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

function CreateSoundForm({
  isOpen,
  onClose,
  soundEdit,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  soundEdit?: Sound;
  onSubmit: (sound: SoundUpdatePayload) => void;
}) {
  const [values, setValues] = useState<SoundUpdatePayload>({
    title: soundEdit?.title || "",
    duration: soundEdit?.duration || 0,
    plays: soundEdit?.plays || 0,
    downloads: soundEdit?.downloads || 0,
    category: soundEdit?.category || 0,
    url: soundEdit?.url || "",
    is_viral: soundEdit?.is_viral || false,
    is_trending: soundEdit?.is_trending || false,
    is_new: soundEdit?.is_new || false,
  });

  useEffect(() => {
    if (soundEdit) {
      setValues({
        ...soundEdit,
      });
    }
  }, [soundEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
    setValues({
      title: "",
      duration: 0,
      plays: 0,
      downloads: 0,
      category: 0,
      url: "",
      is_viral: false,
      is_trending: false,
      is_new: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/[30%]">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {soundEdit ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}
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
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
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
              value={values.duration}
              onChange={(e) =>
                setValues({ ...values, duration: Number(e.target.value) })
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
                soundEdit
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600",
                !values.title || typeof values.duration !== "number"
                  ? "cursor-not-allowed opacity-50"
                  : "",
              )}
              disabled={!values.title || typeof values.duration !== "number"}
            >
              {soundEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/[30%]">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="text-lg font-medium">Xác nhận xóa</h3>
        <p className="mt-2 text-gray-600">
          Bạn có chắc chắn muốn xóa thể loại này không?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

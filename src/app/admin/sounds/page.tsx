"use client";

import { Pagination, SoundItem } from "@/components";
import { useState, useEffect } from "react";
import { createClientBrowserSide } from "@/supabase/client";
import { Sound, SoundUpdatePayload } from "@/types";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useAppContext } from "@/AppContext";
import { formatTime, getFile } from "@/helpers";
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
      .range(_page * PAGE_SIZE, _page * PAGE_SIZE + PAGE_SIZE - 1)
      .order("created_at", { ascending: false });
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

  const updateCheckbox = async ({
    key,
    value,
    id,
  }: {
    key: string;
    value: boolean;
    id: number;
  }) => {
    const supabase = await createClientBrowserSide();
    await supabase
      .from("sounds")
      .update({
        [key]: value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    toast.success("Cập nhật thành công");
    fetchSounds(page);
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
            <th className="w-[200px] px-4 py-2 text-left font-semibold">
              Tên âm thanh
            </th>
            <th className="px-4 py-2 text-left font-semibold"></th>
            <th className="px-4 py-2 text-right font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sounds.map((sound) => {
            return (
              <tr key={sound.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <div className="w-[400px]">
                    <SoundItem sound={sound} />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sound.is_viral}
                        onChange={() => {
                          updateCheckbox({
                            key: "is_viral",
                            value: !sound.is_viral,
                            id: sound.id,
                          });
                        }}
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
                        onChange={() => {
                          updateCheckbox({
                            key: "is_trending",
                            value: !sound.is_trending,
                            id: sound.id,
                          });
                        }}
                        id="is_trending"
                      />
                      <label htmlFor="is_trending" className="text-sm">
                        Trending
                      </label>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sound.is_new}
                        onChange={() => {
                          updateCheckbox({
                            key: "is_new",
                            value: !sound.is_new,
                            id: sound.id,
                          });
                        }}
                        id="is_new"
                      />
                      <label htmlFor="is_new" className="text-sm">
                        Mới
                      </label>
                    </div> */}
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
            );
          })}
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
  const { categories } = useAppContext();

  const [file, setFile] = useState<File | null>(null);

  const [values, setValues] = useState<SoundUpdatePayload>({
    title: soundEdit?.title || "",
    duration: soundEdit?.duration || 0,
    plays: soundEdit?.plays || 0,
    downloads: soundEdit?.downloads || 0,
    category_id: soundEdit?.category_id || 0,
    path: soundEdit?.path || "",
    is_viral: soundEdit?.is_viral || false,
    is_trending: soundEdit?.is_trending || false,
    is_new: soundEdit?.is_new || false,
  });

  useEffect(() => {
    if (soundEdit) {
      setValues({
        ...soundEdit,
      });

      getFile(soundEdit.path).then((file) => {
        setFile(file as File);
      });
    }
  }, [soundEdit]);

  useEffect(() => {
    if (file) {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("loadedmetadata", () => {
        setValues({
          ...values,
          duration: Math.round(audio.duration),
          title: file.name,
        });
      });
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = await createClientBrowserSide();

    const filePath = `${file!.name.toLowerCase().replace(/\s+/g, "_")}`;

    await supabase.storage.from("sounds").upload(filePath, file!);

    onSubmit({
      ...values,
      path: filePath,
    });
    resetForm();
  };
  const resetForm = () => {
    setValues({
      title: "",
      duration: 0,
      plays: 0,
      downloads: 0,
      category_id: 0,
      path: "",
      is_viral: false,
      is_trending: false,
      is_new: false,
    });
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/[30%]">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-sm">
        <h2 className="mb-4 text-xl font-semibold">
          {soundEdit ? "Chỉnh sửa âm thanh" : "Thêm âm thanh mới"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="name" className="mb-2 block font-medium">
              Upload<span className="text-red-500">*</span>
            </label>
            <div>
              <label
                htmlFor="upload"
                className="flex w-[120px] cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>Upload file</span>
              </label>
              {file && (
                <>
                  <p className="mt-2 text-xs text-gray-500">
                    File: {file.name}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Thời lượng:{" "}
                    {values.duration ? formatTime(values.duration) : "00:00"}
                  </p>
                  <audio
                    src={URL.createObjectURL(file)}
                    controls
                    className="mt-2 h-[40px]"
                  />
                </>
              )}
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="audio/mpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block font-medium">
              Tên âm thanh<span className="text-red-500">*</span>
            </label>
            <textarea
              id="title"
              placeholder="Nhập tên âm thanh"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category_id" className="mb-2 block font-medium">
              Thể loại<span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              value={values.category_id}
              onChange={(e) =>
                setValues({ ...values, category_id: Number(e.target.value) })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value={0}>Chọn thể loại</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={clsx(
                "rounded-lg px-4 py-2 text-white",
                soundEdit
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600",
                !values.title || !file || !values.category_id
                  ? "cursor-not-allowed opacity-50"
                  : "",
              )}
              disabled={!values.title || !file || !values.category_id}
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
          Bạn có chắc chắn muốn xóa âm thanh này không?
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

import SeacrhResult from "./SeacrhResult";
import { createClientServerSide } from "@/supabase/server";
import { PAGE_SIZE, PATHS } from "@/constants";
import { SoundList } from "@/components";
export default async function TimKiemPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { theloai = "", tukhoa = "", trang = "" } = await searchParams;
  const page = trang ? Number(trang) - 1 : 0;
  const supabase = await createClientServerSide();

  const {
    data: sounds,
    count,
    error,
  } = theloai
    ? await supabase
        .from("sounds")
        .select("*", { count: "exact" })
        .eq("category_id", Number(theloai))
        .ilike("title", `%${tukhoa || ""}%`)
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
    : await supabase
        .from("sounds")
        .select("*", { count: "exact" })
        .ilike("title", `%${tukhoa || ""}%`)
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

  return (
    <>
      <SeacrhResult sounds={sounds || []} count={count || 0} />

      {sounds && sounds.length === 0 && (
        <>
          {/* Âm thanh viral */}
          <SoundList
            title="Âm thanh viral"
            sounds={sounds || []}
            link={PATHS.viral}
          />

          {/* Âm thanh mới */}
          <SoundList
            title="Âm thanh mới"
            sounds={sounds || []}
            link={PATHS.new}
          />
        </>
      )}
    </>
  );
}

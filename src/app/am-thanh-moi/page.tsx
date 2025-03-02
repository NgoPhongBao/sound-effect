import { SoundListWithPagination } from "@/components";
import { createClientServerSide } from "@/supabase/server";
import { PAGE_SIZE, PATHS } from "@/constants";
export default async function AmThanhMoiPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { trang = "" } = await searchParams;
  const page = trang ? Number(trang) - 1 : 0;
  const supabase = await createClientServerSide();

  const { data: sounds, count } = await supabase
    .from("sounds")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

  return (
    <>
      <SoundListWithPagination
        title="Âm thanh mới"
        sounds={sounds || []}
        count={count || 0}
        link={PATHS.new}
      />
    </>
  );
}

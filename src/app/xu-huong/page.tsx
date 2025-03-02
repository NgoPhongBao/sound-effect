import { SoundListWithPagination } from "@/components";
import { createClientServerSide } from "@/supabase/server";
import { PAGE_SIZE, PATHS } from "@/constants";

export default async function XuHuongPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { trang = "" } = await searchParams;
  const page = trang ? Number(trang) - 1 : 0;
  const supabase = await createClientServerSide();

  const { data: sounds, count } = await supabase
    .from("sounds")
    .select("*", { count: "exact" })
    .eq("is_trending", true)
    .order("downloads", { ascending: false })
    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

  return (
    <>
      <SoundListWithPagination
        title="Xu hướng"
        sounds={sounds || []}
        count={count || 0}
        link={PATHS.xuHuong}
      />
    </>
  );
}

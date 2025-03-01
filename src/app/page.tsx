import { SoundList, Search } from "@/components";
import { sounds } from "@/constants";
import { createClientBrowserSide } from "@/supabase/client";
import { PATHS } from "@/constants";

export default async function Home() {
  const supabase = await createClientBrowserSide();
  const { data: categories } = await supabase.from("categories").select();
  console.log(categories);

  return (
    <>
      {/* Tìm kiếm */}
      <Search categories={categories || []} />

      {/* Âm thanh viral */}
      <SoundList title="Âm thanh viral" sounds={sounds} link={PATHS.viral} />

      {/* Âm thanh mới */}
      <SoundList title="Âm thanh mới" sounds={sounds} link={PATHS.new} />
    </>
  );
}

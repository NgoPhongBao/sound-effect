import { SoundList, Search } from "@/components";
import { sounds } from "@/constants";
import { createClientBrowserSide } from "@/supabase/client";
export default async function Home() {
  const supabase = await createClientBrowserSide();
  const { data: categories } = await supabase.from("categories").select();

  return (
    <>
      {/* Tìm kiếm */}
      <Search categories={categories || []} />

      {/* Âm thanh viral */}
      <SoundList title="Âm thanh viral" sounds={sounds} />

      {/* Âm thanh mới */}
      <SoundList title="Âm thanh mới" sounds={sounds} />
    </>
  );
}

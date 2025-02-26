import { SoundList, Categories } from "@/components";
import { sounds } from "@/constants";
import { createClient } from "@/supabase/server";
export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select();

  return (
    <>
      {/* Danh mục */}
      <Categories categories={categories || []} />

      {/* Âm thanh viral */}
      <SoundList title="Âm thanh viral" sounds={sounds} />

      {/* Âm thanh mới */}
      <SoundList title="Âm thanh mới" sounds={sounds} />
    </>
  );
}

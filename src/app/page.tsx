import { SoundList, Search } from "@/components";
import { createClientServerSide } from "@/supabase/server";
import { PATHS } from "@/constants";

export default async function Home() {
  const supabase = await createClientServerSide();
  const { data: sounds } = await supabase.from("sounds").select();

  return (
    <>
      {/* Tìm kiếm */}
      <Search />

      {/* Âm thanh viral */}
      <SoundList title="Âm thanh viral" sounds={sounds || []} link={PATHS.viral} />

      {/* Âm thanh mới */}
      <SoundList title="Âm thanh mới" sounds={sounds || []} link={PATHS.new} />
    </>
  );
}

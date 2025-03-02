import { SoundList, Search } from "@/components";
import { createClientServerSide } from "@/supabase/server";
import { PATHS } from "@/constants";

export default async function Home() {
  const supabase = await createClientServerSide();

  const [{ data: newSounds }, { data: viralSounds }, { data: trendingSounds }] =
    await Promise.all([
      supabase
        .from("sounds")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 4),
      supabase
        .from("sounds")
        .select()
        .eq("is_viral", true)
        .order("downloads", { ascending: false })
        .range(0, 4),
      supabase
        .from("sounds")
        .select()
        .eq("is_trending", true)
        .order("downloads", { ascending: false })
        .range(0, 4),
    ]);

  return (
    <>
      {/* Tìm kiếm */}
      <Search />

      {/* Âm thanh viral */}
      <SoundList
        title="Âm thanh viral"
        sounds={viralSounds || []}
        link={PATHS.viral}
      />

      {/* Âm thanh mới */}
      <SoundList
        title="Âm thanh mới"
        sounds={newSounds || []}
        link={PATHS.new}
      />

      {/* Âm thanh xu hướng */}
      <SoundList
        title="Xu hướng"
        sounds={trendingSounds || []}
        link={PATHS.xuHuong}
      />
    </>
  );
}


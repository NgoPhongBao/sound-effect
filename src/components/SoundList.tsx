import { Sound } from "@/types";
import { SoundItem } from "./SoundItem";

interface SoundListProps {
  sounds: Sound[];
  title: string;
}

export function SoundList({ sounds, title }: SoundListProps) {
  return (
    <section className="mt-4 rounded-lg bg-white p-4 shadow-md">
      <h2 className="font-semibold uppercase">{title}</h2>
      <div className="mt-4 space-y-2">
        {sounds.map((sound) => (
          <SoundItem key={sound.id} sound={sound} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200">
          Xem thêm
        </button>
      </div>
    </section>
  );
}

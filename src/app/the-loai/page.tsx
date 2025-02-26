import { SoundList } from "@/components";
import { sounds, categories } from "@/constants";


export default function TheLoai() {
  return (
    <>
      {categories.map((category) => (
        <SoundList key={category.id} sounds={sounds} title={category.name} />
      ))}
    </>
  );
}

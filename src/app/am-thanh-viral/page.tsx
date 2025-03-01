import { SoundListWithPagination } from "@/components";
import { sounds } from "@/constants";

export default function TimKiemPage() {
  return (
    <>
      <SoundListWithPagination title="Âm thanh viral" sounds={sounds} />
    </>
  );
}

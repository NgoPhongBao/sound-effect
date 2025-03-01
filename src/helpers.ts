import { createClientBrowserSide } from "@/supabase/client";

export const toQueryString = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== "" && value != null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export function formatTime(seconds: number) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Return formatted time
  return `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()}:${
    remainingSeconds < 10
      ? "0" + remainingSeconds.toString()
      : remainingSeconds.toString()
  }`;
}


export const getFile = async (path: string) => {
  const supabase = await createClientBrowserSide();
  const { data, error } = await supabase.storage.from("sounds").download(path);
  return new File([data!], path, { type: "audio/mpeg" });
};

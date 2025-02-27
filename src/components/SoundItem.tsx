import { Sound } from "@/types";

export function SoundItem({ sound }: { sound: Sound }) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-gray-50">
      <div>
        <h3 className="font-medium">{sound.title}</h3>
        <p className="text-sm text-gray-500">
          {sound.duration} • {sound.downloads.toLocaleString()} downloads
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          aria-label="Play sound"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
            />
          </svg>
        </button>

        <button
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          aria-label="Download sound"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

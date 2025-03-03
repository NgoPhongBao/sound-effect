"use client";
import { Sound } from "@/types";
import { useState, useEffect, useId } from "react";
import { formatTime, getFile } from "@/helpers";
import { createClientBrowserSide } from "@/supabase/client";

const EVENT_PLAY_SOUND = "playSound";

export function SoundItem({ sound }: { sound: Sound }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioId = useId();

  useEffect(() => {
    getFile(sound.path).then((file) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.id = audioId;
      setAudio(audio);
    });
  }, [sound]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("play", () => {
        setIsPlaying(true);
      });
      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audio && !audio.paused) {
        audio.pause();
        setAudio(null);
      }
    };
  }, [audio]);

  useEffect(() => {
    document.addEventListener(EVENT_PLAY_SOUND, (event: any) => {
      if (audio && !audio.paused && event.detail.id !== audio.id) {
        audio.pause();
        setTimeout(() => {
          audio.currentTime = 0;
        }, 100);
      }
    });
  }, [audio]);

  const handleDownloadSound = async () => {
    const file = await getFile(sound.path);
    const downloadUrl = window.URL.createObjectURL(file!);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = sound.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    const supabase = createClientBrowserSide();
    await supabase.rpc("increment_downloads", {
      sound_id: sound.id,
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2 hover:bg-gray-50">
      {/* sound info */}
      <div>
        <h3 className="font-medium break-all">{sound.title}</h3>
        <p className="text-sm text-gray-500">
          {formatTime(sound.duration)} • {sound.downloads.toLocaleString()} lượt
          tải
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div
            className="h-[6px] w-[110px] rounded-full bg-gray-200"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const _currentTime = (x / rect.width) * sound.duration;
              setCurrentTime(_currentTime);
              if (audio) {
                audio.currentTime = _currentTime;
              }
            }}
          >
            <div
              className="h-full rounded-full bg-gray-800 transition-all duration-200"
              style={{
                width: `${(currentTime / sound.duration) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {`${formatTime(currentTime)}/${formatTime(sound.duration)}`}
          </span>
        </div>
      </div>

      {/* action buttons */}
      <div className="flex gap-2">
        {/* play */}
        {!isPlaying && (
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Play sound"
            onClick={() => {
              audio!.play();
              document.dispatchEvent(
                new CustomEvent(EVENT_PLAY_SOUND, {
                  detail: { id: audioId },
                }),
              );
            }}
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
        )}
        {/* pause */}
        {isPlaying && (
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Pause sound"
            onClick={() => {
              audio?.pause();
            }}
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
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          </button>
        )}

        {/* download */}
        <button
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          aria-label="Download sound"
          onClick={handleDownloadSound}
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

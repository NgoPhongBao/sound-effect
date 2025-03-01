"use client";
import { Sound } from "@/types";
import { useState, useEffect, useId } from "react";
import { useAudioStore } from "@/stores";
import { formatTime } from "@/helpers";

export function SoundItem({ sound }: { sound: Sound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio: audioStored, setAudio: setAudioStored } = useAudioStore();
  const audioId = useId();

  useEffect(() => {
    if (audioStored) {
      setCurrentTime(0);
      audioStored.play();
      audioStored.addEventListener("timeupdate", () => {
        setCurrentTime(audioStored.currentTime);
      });
      audioStored.addEventListener("play", () => {
        setIsPlaying(true);
      });
      audioStored.addEventListener("pause", () => {
        setIsPlaying(false);
      });
      audioStored.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audioStored && !audioStored.paused) {
        audioStored.pause();
        setAudioStored(null);
      }
    };
  }, [audioStored]);

  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-gray-50">
      {/* sound info */}
      <div>
        <h3 className="font-medium">{sound.title}</h3>
        <p className="text-sm text-gray-500">
          {formatTime(sound.duration)} • {sound.downloads.toLocaleString()} lượt
          tải
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1 w-[110px] rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-800 transition-all duration-200"
              style={{
                width:
                  audioStored?.id === audioId
                    ? `${(currentTime / sound.duration) * 100}%`
                    : "0%",
              }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {audioStored?.id === audioId
              ? `${formatTime(currentTime)}/${formatTime(sound.duration)}`
              : `00/${formatTime(sound.duration)}`}
          </span>
        </div>
      </div>

      {/* action buttons */}
      <div className="flex gap-2">
        {(audioStored?.id !== audioId ||
          (audioStored?.id === audioId && !isPlaying)) && (
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Play sound"
            onClick={() => {
              if (audioStored && audioStored?.id !== audioId) {
                audioStored?.pause();
              }
              if (audioStored?.id === audioId) {
                audioStored?.play();
                return;
              }
              setCurrentTime(0);
              setTimeout(() => {
                const audio = new Audio(sound.url);
                audio.id = audioId;
                setAudioStored(audio);
              }, 100);
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

        {audioStored?.id === audioId && isPlaying && (
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Pause sound"
            onClick={() => {
              if (audioStored?.id === audioId) {
                audioStored?.pause();
              }
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

        <button
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          aria-label="Download sound"
          onClick={() => {
            const downloadSound = async () => {
              try {
                const response = await fetch(sound.url);
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = sound.title;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
              } catch (error) {
                console.error("Error downloading sound:", error);
              }
            };
            downloadSound();
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

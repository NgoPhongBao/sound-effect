import { create } from "zustand";

interface AudioStore {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audio: null,
  setAudio: (audio) => set({ audio }),
}));

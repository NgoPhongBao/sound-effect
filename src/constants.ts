import { Category, Sound } from "@/types";

export const sounds: Sound[] = [
  {
    id: 1,
    title: "Oh no no no no",
    duration: "0:15",
    plays: 1500000,
    downloads: 250000,
  },
  {
    id: 2,
    title: "Into the night",
    duration: "0:30",
    plays: 890000,
    downloads: 120000,
  },
  {
    id: 3,
    title: "Emotional damage",
    duration: "0:05",
    plays: 2100000,
    downloads: 450000,
  },
  {
    id: 4,
    title: "Running in the 90s",
    duration: "0:20",
    plays: 750000,
    downloads: 95000,
  },
];

export const categories: Category[] = [
  { id: 1, name: "Nhạc nền" },
  { id: 2, name: "Nhạc game" },
  { id: 3, name: "Âm thanh thiên nhiên" },
  { id: 4, name: "Tiếng động vật" },
  { id: 5, name: "Hiệu ứng âm thanh" },
  { id: 6, name: "Tiếng cười" },
  { id: 7, name: "Âm thanh hoạt hình" },
  { id: 8, name: "Nhạc phim" },
  { id: 9, name: "Tiếng người" },
  { id: 10, name: "Âm thanh thể thao" },
];


export const PATHS = {
  home: "/",
  searchResults: "/ket-qua-tim-kiem",
  categories: "/the-loai",
  login: "/login",
  signup: "/signup",
  account: "/account",
  admin: "/admin",
  adminCategories: "/admin/categories",
  adminSounds: "/admin/sounds",
};

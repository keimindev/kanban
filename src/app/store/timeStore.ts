import { create } from "zustand";

export interface TimeEntry {
  id: number;
  title: string;
  time: string;
  notified: boolean;
}

interface TimeStore {
  entries: TimeEntry[];
  addEntry: (entry: TimeEntry) => void;
  markNotified: (id: number) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => {
      const exists = state.entries.find((e) => e.id === entry.id);
      if (exists) return state; // 중복 방지
      return {
        entries: [...state.entries, entry],
      };
    }),
  markNotified: (id) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, notified: true } : e
      ),
    })),
}));

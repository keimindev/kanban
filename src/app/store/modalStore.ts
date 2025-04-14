// modalStore.ts
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedId : string | null;
  open: (id?: string) => void;
  openNew: () => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedId: null,
  open: (id) => set({ isOpen: true, selectedId: id ?? null }),
  openNew: () => set({ isOpen: true, selectedId: null }),
  close: () => set({ isOpen: false, selectedId: null}),
}));

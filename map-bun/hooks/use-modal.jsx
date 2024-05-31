import { create } from 'zustand'

export const useChangeStatusModal = create((set) => ({
  isOpen: false,
  data: null,
  onOpen: () => set({ isOpen: true }),
  updateData: (data) => {
    set({ data })
  },
  onClose: () => set({ isOpen: false }),
}))

export const useChangeDeleteModal = create((set) => ({
  isOpen: false,
  data: null,
  onOpen: () => set({ isOpen: true }),
  updateData: (data) => {
    set({ data })
  },
  onClose: () => set({ isOpen: false }),
}))

export const useAddMapModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

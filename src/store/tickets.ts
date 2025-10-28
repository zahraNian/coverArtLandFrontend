"use client"

import { create } from "zustand"

type TicketMessage = {
  by: "user" | "support" | string
  at: string
  text: string
  read?: boolean
}

export type TicketItem = {
  id: string | number
  subject: string
  status: string
  createdAt?: string
  updatedAt?: string
  reference?: string
  messages?: TicketMessage[]
}

interface TicketsState {
  unreadCount: number
  setUnreadCount: (n: number) => void
  incrementUnread: (n?: number) => void
  markAllRead: () => void
}

export const useTicketsStore = create<TicketsState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (n) => set({ unreadCount: Math.max(0, n | 0) }),
  incrementUnread: (n = 1) => set((s) => ({ unreadCount: Math.max(0, s.unreadCount + n) })),
  markAllRead: () => set({ unreadCount: 0 }),
}))

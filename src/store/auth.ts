"use client"

import { create } from "zustand"
import { createApiClient, ApiError } from "@/lib/api"

interface User {
    id: string
    name: string
    email: string
    token: string
}

interface AuthState {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: User | null) => void
    initFromStorage: () => void
}

const api = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE || "/api",
})

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,

    setUser: (user) => {
        set({ user })
        if (typeof window !== "undefined") {
            if (user) localStorage.setItem("user", JSON.stringify(user))
            else localStorage.removeItem("user")
        }
    },

    initFromStorage: () => {
        if (typeof window === "undefined") return
        try {
            const stored = localStorage.getItem("user")
            if (stored) {
                const user: User = JSON.parse(stored)
                set({ user })
            }
        } catch {
            // ignore
        }
    },

    login: async (email, password) => {
        set({ loading: true })
        try {
            const data = await api.raw.post<{ user: User }>("/auth/login", {
                email,
                password,
            })

            const user = data.user
            localStorage.setItem("token", user.token)
            localStorage.setItem("user", JSON.stringify(user))
            set({ user, loading: false })
        } catch (err) {
            console.error("Login error:", err)
            set({ loading: false })

            if (err instanceof ApiError) {
                throw new Error(err.data?.message || "Login failed")
            }
            throw err
        }
    },

    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
        set({ user: null })
    },
}))
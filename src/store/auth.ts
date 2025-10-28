"use client"

import { create } from "zustand"
import { createApiClient, ApiError } from "@/lib/api"

interface User {
    id: string
    name: string
    email: string
    access_token: string
}

interface AuthState {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, password_confirm: string) => Promise<void>
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
            const { data } = await api.raw.post<{ data: { user: User, access_token: string }>("/auth/login", {
                email,
                password,
            })
            localStorage.setItem("token", data.access_token)
            localStorage.setItem("user", JSON.stringify(data.user))
            set({ user: data.user, loading: false })
        } catch (err) {
            console.error("Login error:", err)
            set({ loading: false })

            if (err instanceof ApiError) {
                throw new Error((err.data as any)?.message || err.message || "Login failed")
            }
            throw err
        }
    },

    register: async (email, password, password_confirm) => {
        set({ loading: true })
        try {
            await api.raw.post<{ user: User }>("/auth/register", {
                email,
                password,
                password_confirm,
            })
            set({ loading: false })
        } catch (err) {
            console.error("Register error:", err)
            set({ loading: false })

            if (err instanceof ApiError) {
                throw new Error((err.data as any)?.message || err.message || "Register failed")
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
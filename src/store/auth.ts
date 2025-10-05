import { create } from 'zustand'

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
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,

    setUser: (user) => set({ user }),

    login: async (email, password) => {
        set({ loading: true })
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) throw new Error('Login failed')

            const data = await res.json()

            set({ user: data.user, loading: false })

            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
            set({ loading: false })
            throw error
        }
    },

    logout: () => {
        localStorage.removeItem('user')
        set({ user: null })
    },
}))
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { AuthModal } from '@/components/auth/auth-modal'
import { useTicketsStore } from '@/store/tickets'

export function AuthButton() {
    const user = useAuthStore((s) => s.user)
    const initFromStorage = useAuthStore((s) => s.initFromStorage)
    const [open, setOpen] = useState(false)
    const unread = useTicketsStore((s) => s.unreadCount)

    // Ensure user state is restored after page refresh
    useEffect(() => {
        initFromStorage()
    }, [initFromStorage])

    if (user) {
        return (
            <Link href="/profile" className="p-1 relative">
                <Image
                    priority
                    src="/icons/user.svg"
                    height={100}
                    width={100}
                    alt="user"
                    className="max-w-[22px] max-h-[22px]"
                />
                {unread > 0 && (
                    <span className="border bg-red-600 text-white rounded-full w-fit-h-fit px-1 text-[10px] leading-none absolute -top-2 left-1/2 -translate-x-1/2">
                        {unread}
                    </span>
                )}
            </Link>
        )
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="p-1 relative">
                <Image
                    priority
                    src="/icons/user.svg"
                    height={100}
                    width={100}
                    alt="user"
                    className="max-w-[22px] max-h-[22px]"
                />
                {unread > 0 && (
                    <span className="border bg-red-600 text-white rounded-full w-fit-h-fit px-1 text-[10px] leading-none absolute -top-2 left-1/2 -translate-x-1/2">
                        {unread}
                    </span>
                )}
            </button>

            <AuthModal open={open} onOpenChange={setOpen} />
        </>
    )
}
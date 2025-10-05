'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { AuthModal } from '@/components/auth/auth-modal'

export function AuthButton() {
    const { user } = useAuthStore()
    const [open, setOpen] = useState(false)

    if (user) {
        return (
            <Link href="/profile" className="p-1">
                <Image
                    priority
                    src="/icons/user.svg"
                    height={100}
                    width={100}
                    alt="user"
                    className="max-w-[22px] max-h-[22px]"
                />
            </Link>
        )
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="p-1">
                <Image
                    priority
                    src="/icons/user.svg"
                    height={100}
                    width={100}
                    alt="user"
                    className="max-w-[22px] max-h-[22px]"
                />
            </button>

            <AuthModal open={open} onOpenChange={setOpen} />
        </>
    )
}
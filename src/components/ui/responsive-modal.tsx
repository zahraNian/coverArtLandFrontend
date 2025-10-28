'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerTrigger,
    DrawerClose,
} from '@/components/ui/drawer'
import { Cross2Icon } from '@radix-ui/react-icons'

interface ResponsiveModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children?: React.ReactNode
    footer?: React.ReactNode
    trigger?: React.ReactNode
}

export function ResponsiveModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    trigger,
}: ResponsiveModalProps) {
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 640) // sm breakpoint
        checkScreen()
        window.addEventListener('resize', checkScreen)
        return () => window.removeEventListener('resize', checkScreen)
    }, [])

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange} dismissible={false}>
                {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
                <DrawerContent>
                    <DrawerHeader>
                        {title && <DrawerTitle>{title}</DrawerTitle>}
                        {description && <DrawerDescription>{description}</DrawerDescription>}
                        <DrawerClose asChild>
                            <button
                                aria-label="Close"
                                className="absolute right-4 top-4 rounded p-1 hover:bg-black/5"
                            >
                                <Cross2Icon className="h-4 w-4" />
                            </button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="p-4">{children}</div>
                    {footer && <DrawerFooter>{footer}</DrawerFooter>}
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                    <DialogClose asChild>
                        <button
                            aria-label="Close"
                            className="absolute right-4 top-4 rounded p-1 hover:bg-black/5"
                        >
                            <Cross2Icon className="h-4 w-4" />
                        </button>
                    </DialogClose>
                </DialogHeader>
                <div className="py-2">{children}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}
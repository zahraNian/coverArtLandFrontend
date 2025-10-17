'use client'

import BreadcrumbProduct from "@/components/profile-page/BreadcrumbProduct";
import Tabs from "@/components/profile-page/Tabs";
import { useAuthStore } from '@/store/auth'

export default function ProductPage({
    params,
}: {
    params: { slug: string[] };
}) {
    const { user } = useAuthStore();
    return (
        <main>
            <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
                <BreadcrumbProduct title="profile" />
                <Tabs user={user} />
            </div>
        </main>
    );
}
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import RetryError from "@/components/common/RetryError";
import { createApiClient } from "@/lib/api";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function MyAccount({ user: initialUser }: { user: any }) {
  const [user, setUser] = useState<any>(initialUser || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    if (typeof window !== "undefined") {
      (window as any).__profile_fetching = true;
    }
    setLoading(true);
    setError(null);
    try {
      const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
      // Adjust endpoint to your API: e.g., "/users/me" or "/auth/me"
      const { data: me } = await api.withAuth.get<any>("/profile", { cache: "no-store" });
      setUser(me);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("profile_cache", JSON.stringify(me));
          (window as any).__profile_fetched = true;
        } catch { }
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load profile");
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        (window as any).__profile_fetching = false;
      }
    }
  }, []);

  const didFetch = useRef(false);
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    // Try cache first
    if (!user && typeof window !== "undefined") {
      try {
        if ((window as any).__profile_fetched) {
          const cached = sessionStorage.getItem("profile_cache");
          if (cached) {
            setUser(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
        const cached = sessionStorage.getItem("profile_cache");
        if (cached) {
          setUser(JSON.parse(cached));
          setLoading(false);
          return;
        }
      } catch { }
    }
    // If a fetch is already in flight (StrictMode remount), don't start another
    if ((window as any)?.__profile_fetching) return;
    if (!user) fetchProfile();
  }, [user, fetchProfile]);

  if (loading && !user) {
    return (
      <div className="p-4 text-sm text-gray-600 border rounded-xl bg-gray-50">Loading profile…</div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-4">
        <RetryError message={error} onRetry={fetchProfile} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-sm text-gray-500 border rounded-xl bg-gray-50">
        کاربری وارد نشده است
      </div>
    );
  }

  const joinDate = (user as any).joinedAt || (user as any).createdAt;
  const formattedDate = joinDate;

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <PersonIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-semibold text-gray-900 truncate">{user.displayName || "User"}</div>
            <div className="text-sm text-gray-600 truncate">{user.email}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="text-red-600"
          onClick={() => {
            try { logout(); } catch {}
            try {
              sessionStorage.removeItem("orders_cache");
              sessionStorage.removeItem("tickets_cache");
              sessionStorage.removeItem("profile_cache");
            } catch {}
            try {
              localStorage.removeItem("orders_cache");
              localStorage.removeItem("tickets_cache");
              localStorage.removeItem("profile_cache");
            } catch {}
            try {
              const cookies = document.cookie.split("; ");
              for (const c of cookies) {
                const eqPos = c.indexOf("=");
                const name = eqPos > -1 ? c.substring(0, eqPos) : c;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              }
            } catch {}
            // Navigate to home first, then refresh to ensure a clean state
            try { router.push("/"); } catch {}
            setTimeout(() => {
              window.location.reload();
            }, 50);
          }}
        >
          Logout
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border px-3 py-2 bg-gray-50">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Status</div>
          <div className="text-sm text-gray-800">Active</div>
        </div>
        <div className="rounded-lg border px-3 py-2 bg-gray-50">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Member since</div>
          <div className="text-sm text-gray-800">{formattedDate || "—"}</div>
        </div>
        <div className="rounded-lg border px-3 py-2 bg-gray-50">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Email</div>
          <div className="text-sm text-gray-800 truncate">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
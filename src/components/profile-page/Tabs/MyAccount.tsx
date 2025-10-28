"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import RetryError from "@/components/common/RetryError";
import { createApiClient } from "@/lib/api";

export default function MyAccount({ user: initialUser }: { user: any }) {
  const [user, setUser] = useState<any>(initialUser || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (typeof window !== "undefined") {
      (window as any).__profile_fetching = true;
    }
    setLoading(true);
    setError(null);
    try {
      const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
      // Adjust endpoint to your API: e.g., "/users/me" or "/auth/me"
      const me = await api.withAuth.get<any>("/profile", { cache: "no-store" });
      setUser(me);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("profile_cache", JSON.stringify(me));
          (window as any).__profile_fetched = true;
        } catch {}
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
      } catch {}
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
    <div className="p-4 border rounded-xl bg-white shadow-sm flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-lg">
        {user.name?.[0]?.toUpperCase() ?? "?"}
      </div>
      <div>
        <div className="text-base font-semibold text-gray-800">{user.name}</div>
        <div className="text-sm text-gray-500">Join Date: {formattedDate}</div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import InputGroup from "@/components/ui/input-group";

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function NavbarSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isShop = pathname?.startsWith("/shop");
  const initial = useMemo(() => searchParams?.get("q") ?? "", [searchParams]);
  const [term, setTerm] = useState<string>(initial);
  const debounced = useDebouncedValue(term, 450);

  // Keep local state in sync if URL q changes elsewhere
  useEffect(() => {
    setTerm(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  useEffect(() => {
    if (isShop === undefined) return;
    // When typing, route to /shop with q param; if empty, drop q
    const sp = new URLSearchParams(searchParams?.toString());
    if (debounced && debounced.trim().length > 0) {
      sp.set("q", debounced.trim());
    } else {
      sp.delete("q");
    }
    const qs = sp.toString();
    const href = qs ? `/shop?${qs}#search` : "/shop#search";
    if (debounced !== initial) {
      router.push(href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // Hide search controls on the shop page (requirement)
  if (isShop) return null;

  return (
    <>
      <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
        <InputGroup.Text>
          <Image
            priority
            src="/icons/search.svg"
            height={20}
            width={20}
            alt="search"
            className="min-w-5 min-h-5"
          />
        </InputGroup.Text>
        <InputGroup.Input
          type="search"
          name="search"
          placeholder="Search for designs..."
          className="bg-transparent placeholder:text-black/40"
          value={term}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
        />
      </InputGroup>

      {/* Mobile search icon also hides on /shop by returning null above */}
      <Link href="/shop#search" className="lg:hidden block md:hidden mr-[14px] p-1">
        <Image
          priority
          src="/icons/search-black.svg"
          height={100}
          width={100}
          alt="search"
          className="max-w-[22px] max-h-[22px]"
        />
      </Link>
    </>
  );
}

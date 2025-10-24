"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export type GenreMultiSelectProps = {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  onOpen?: () => void;
};

export default function GenreMultiSelect({ options, value, onChange, placeholder = "Select genre", className, loading, onOpen }: GenreMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectedCount = value.length;
  const display = selectedCount === 0 ? placeholder : `${selectedCount} selected`;

  function toggle(val: string) {
    const has = value.includes(val);
    const next = has ? value.filter((v) => v !== val) : [...value, val];
    onChange(next);
  }

  function clearAll(e?: React.MouseEvent) {
    e?.preventDefault();
    onChange([]);
  }

  return (
    <div className={"relative inline-block text-left " + (className ?? "")} ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((s) => {
            const next = !s;
            if (next) onOpen?.();
            return next;
          });
        }}
        className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm bg-white hover:bg-black/5"
      >
        <span className="line-clamp-1">{display}</span>
        {selectedCount > 0 && (
          <span
            role="status"
            aria-label={`${selectedCount} selected`}
            className="ml-1 rounded bg-black/10 px-1.5 py-0.5 text-xs"
          >
            {selectedCount}
          </span>
        )}
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="menu"
          aria-labelledby={id}
          className="absolute z-30 mt-1 w-56 origin-top-left rounded-md border border-black/10 bg-white shadow-md"
        >
          <div className="max-h-64 overflow-auto py-1">
            {loading && (
              <div className="px-3 py-2 text-sm text-black/60">Loading...</div>
            )}
            {options.map((opt) => {
              const checked = value.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-black/5"
                >
                  <span className="pr-2">{opt.label}</span>
                  {checked ? <CheckIcon className="h-4 w-4" /> : <span className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-black/10 px-2 py-1.5">
            <button onClick={() => setOpen(false)} className="text-xs text-black/70 hover:text-black">Done</button>
            <button onClick={clearAll} className="text-xs text-black/70 hover:text-black inline-flex items-center gap-1">
              <Cross2Icon className="h-3 w-3" /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

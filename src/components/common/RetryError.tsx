"use client";

import { ReloadIcon } from "@radix-ui/react-icons";

export default function RetryError({ message = "Something went wrong.", onRetry, className }: { message?: string; onRetry: () => void; className?: string }) {
  return (
    <div className={(className ?? "") + " flex items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-3 py-2"}>
      <p className="text-sm text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
      >
        <ReloadIcon className="h-3.5 w-3.5" /> Try again
      </button>
    </div>
  );
}

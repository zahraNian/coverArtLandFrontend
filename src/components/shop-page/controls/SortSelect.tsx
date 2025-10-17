"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortSelectProps = {
  options: { label: string; value: string }[];
  value: string | undefined;
  onChange: (val: string | undefined) => void;
  placeholder?: string;
  className?: string;
};

export default function SortSelect({ options, value, onChange, placeholder = "Sort by", className }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className={(className ?? "") + " w-48"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PriceRangeSelectProps = {
  options: { label: string; value: string }[];
  value: string | undefined;
  onChange: (val: string | undefined) => void;
  placeholder?: string;
  className?: string;
};

export default function PriceRangeSelect({ options, value, onChange, placeholder = "Price range", className }: PriceRangeSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className={"w-48 " + (className ?? "")}> 
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

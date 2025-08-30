"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-low", label: "قیمت: کم به زیاد" },
  { value: "price-high", label: "قیمت: زیاد به کم" },
  { value: "rating", label: "بالاترین امتیاز" },
  { value: "discount", label: "بیشترین تخفیف" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="مرتب‌سازی" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

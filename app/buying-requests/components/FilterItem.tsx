import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterItemProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  currentLanguage: Language;
}

const FilterItem = ({
  label,
  value,
  options,
  onChange,
  currentLanguage,
}: FilterItemProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`انتخاب ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterItem;

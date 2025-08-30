import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder: string;
  currentLanguage: Language;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder,
  currentLanguage,
}: SearchBarProps) => {
  return (
    <div className="relative mb-6">
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${
          currentLanguage.direction === "rtl" ? "right-3" : "left-3"
        }`}
      >
        <Search className="w-5 h-5" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full h-12 text-lg ${
          currentLanguage.direction === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"
        } border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
      />
    </div>
  );
};

export default SearchBar;

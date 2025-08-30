"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import RequestsList from "./components/RequestsList";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface FilterState {
  category: string;
  buyerType: string;
  location: string;
  volume: string;
  dateRange: string;
  status: string;
  urgency: string;
}

export default function BuyingRequestsPage() {
  const [currentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    buyerType: "",
    location: "",
    volume: "",
    dateRange: "",
    status: "",
    urgency: "",
  });

  const translations = {
    en: {
      title: "Buying Requests",
      subtitle: "Find and respond to buying opportunities",
      searchPlaceholder: "Search buying requests...",
      clearFilters: "Clear Filters",
      resultsFound: "results found",
    },
    fa: {
      title: "درخواست‌های خرید",
      subtitle: "فرصت‌های خرید را پیدا کرده و پاسخ دهید",
      searchPlaceholder: "جستجو در درخواست‌های خرید...",
      clearFilters: "پاک کردن فیلترها",
      resultsFound: "نتیجه یافت شد",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      buyerType: "",
      location: "",
      volume: "",
      dateRange: "",
      status: "",
      urgency: "",
    });
    setSearchQuery("");
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={t.searchPlaceholder}
            currentLanguage={currentLanguage}
          />

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Results */}
        <RequestsList
          searchQuery={searchQuery}
          filters={filters}
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import FilterItem from "./FilterItem";

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

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  currentLanguage: Language;
}

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  currentLanguage,
}: FilterPanelProps) => {
  const translations = {
    en: {
      category: "Category",
      buyerType: "Buyer Type",
      location: "Location",
      volume: "Purchase Volume",
      dateRange: "Date Range",
      status: "Status",
      urgency: "Urgency",
      clearFilters: "Clear Filters",
      allCategories: "All Categories",
      allBuyerTypes: "All Buyer Types",
      allLocations: "All Locations",
      allVolumes: "All Volumes",
      allDates: "All Dates",
      allStatuses: "All Statuses",
      allUrgencies: "All Urgencies",
    },
    fa: {
      category: "دسته‌بندی",
      buyerType: "نوع خریدار",
      location: "موقعیت",
      volume: "حجم خرید",
      dateRange: "بازه زمانی",
      status: "وضعیت",
      urgency: "فوریت",
      clearFilters: "پاک کردن فیلترها",
      allCategories: "همه دسته‌ها",
      allBuyerTypes: "همه خریداران",
      allLocations: "همه مکان‌ها",
      allVolumes: "همه حجم‌ها",
      allDates: "همه تاریخ‌ها",
      allStatuses: "همه وضعیت‌ها",
      allUrgencies: "همه سطوح فوریت",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const categoryOptions = [
    { value: "", label: t.allCategories },
    { value: "electronics", label: "الکترونیک" },
    { value: "textiles", label: "نساجی" },
    { value: "machinery", label: "ماشین‌آلات" },
    { value: "food", label: "مواد غذایی" },
    { value: "medical", label: "تجهیزات پزشکی" },
    { value: "automotive", label: "خودرو" },
    { value: "construction", label: "ساختمان" },
  ];

  const buyerTypeOptions = [
    { value: "", label: t.allBuyerTypes },
    { value: "retailer", label: "خرده‌فروش" },
    { value: "wholesaler", label: "عمده‌فروش" },
    { value: "manufacturer", label: "تولیدکننده" },
    { value: "distributor", label: "توزیع‌کننده" },
  ];

  const locationOptions = [
    { value: "", label: t.allLocations },
    { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" },
    { value: "mashhad", label: "مشهد" },
    { value: "shiraz", label: "شیراز" },
    { value: "tabriz", label: "تبریز" },
    { value: "ahvaz", label: "اهواز" },
  ];

  const volumeOptions = [
    { value: "", label: t.allVolumes },
    { value: "small", label: "کم (زیر ۱۰۰ واحد)" },
    { value: "medium", label: "متوسط (۱۰۰-۱۰۰۰ واحد)" },
    { value: "large", label: "زیاد (بالای ۱۰۰۰ واحد)" },
  ];

  const dateRangeOptions = [
    { value: "", label: t.allDates },
    { value: "today", label: "امروز" },
    { value: "week", label: "هفته گذشته" },
    { value: "month", label: "ماه گذشته" },
    { value: "3months", label: "۳ ماه گذشته" },
  ];

  const statusOptions = [
    { value: "", label: t.allStatuses },
    { value: "active", label: "فعال" },
    { value: "pending", label: "در انتظار" },
    { value: "closed", label: "بسته شده" },
  ];

  const urgencyOptions = [
    { value: "", label: t.allUrgencies },
    { value: "urgent", label: "فوری" },
    { value: "normal", label: "عادی" },
    { value: "low", label: "کم" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterItem
          label={t.category}
          value={filters.category}
          options={categoryOptions}
          onChange={(value) => onFilterChange("category", value)}
          currentLanguage={currentLanguage}
        />

        <FilterItem
          label={t.buyerType}
          value={filters.buyerType}
          options={buyerTypeOptions}
          onChange={(value) => onFilterChange("buyerType", value)}
          currentLanguage={currentLanguage}
        />

        <FilterItem
          label={t.location}
          value={filters.location}
          options={locationOptions}
          onChange={(value) => onFilterChange("location", value)}
          currentLanguage={currentLanguage}
        />

        <FilterItem
          label={t.volume}
          value={filters.volume}
          options={volumeOptions}
          onChange={(value) => onFilterChange("volume", value)}
          currentLanguage={currentLanguage}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FilterItem
          label={t.dateRange}
          value={filters.dateRange}
          options={dateRangeOptions}
          onChange={(value) => onFilterChange("dateRange", value)}
          currentLanguage={currentLanguage}
        />

        <FilterItem
          label={t.status}
          value={filters.status}
          options={statusOptions}
          onChange={(value) => onFilterChange("status", value)}
          currentLanguage={currentLanguage}
        />

        <FilterItem
          label={t.urgency}
          value={filters.urgency}
          options={urgencyOptions}
          onChange={(value) => onFilterChange("urgency", value)}
          currentLanguage={currentLanguage}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="text-gray-600 hover:text-gray-800"
        >
          {t.clearFilters}
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;

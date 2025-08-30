"use client";

import React, { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface ProductFilters {
  category: string;
  subcategory: string;
  sellerType: string;
  province: string;
  city: string;
  priceRange: { min: number; max: number };
}

interface ProductFilterBarProps {
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  isMobile: boolean;
}

const subcategories = {
  الکترونیک: ["موبایل", "لپ‌تاپ", "تبلت", "هدفون", "ساعت هوشمند", "دوربین"],
  پوشاک: ["مردانه", "زنانه", "بچگانه", "کفش", "کیف", "عینک"],
  "خانه و باغ": ["مبلمان", "آشپزخانه", "حمام", "تزئینات", "ابزار", "باغبانی"],
};

const sellerTypes = ["لید کننده", "عمده‌فروش", "شرکت پخش", "تولیدکننده"];

const provinces = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز", "کرج", "اهواز"];

const cities = {
  تهران: ["تهران", "کرج", "ورامین", "شهریار"],
  اصفهان: ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر"],
  شیراز: ["شیراز", "مرودشت", "کازرون", "لار"],
};

export default function ProductFilterBar({
  filters,
  onFilterChange,
  isMobile,
}: ProductFilterBarProps) {
  const [expandedSections, setExpandedSections] = useState({
    subcategory: true,
    sellerType: true,
    location: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearFilter = (filterKey: keyof ProductFilters) => {
    if (filterKey === "priceRange") {
      onFilterChange({ priceRange: { min: 0, max: 10000000 } });
    } else {
      onFilterChange({ [filterKey]: "" });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.subcategory) count++;
    if (filters.sellerType) count++;
    if (filters.province) count++;
    if (filters.city) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000000)
      count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">فیلترهای فعال</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onFilterChange({
                  subcategory: "",
                  sellerType: "",
                  province: "",
                  city: "",
                  priceRange: { min: 0, max: 10000000 },
                })
              }
              className="text-xs h-7 px-2"
            >
              پاک کردن همه
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.subcategory && (
              <Badge variant="secondary" className="gap-1">
                {filters.subcategory}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => clearFilter("subcategory")}
                />
              </Badge>
            )}
            {filters.sellerType && (
              <Badge variant="secondary" className="gap-1">
                {filters.sellerType}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => clearFilter("sellerType")}
                />
              </Badge>
            )}
            {filters.province && (
              <Badge variant="secondary" className="gap-1">
                {filters.province}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => clearFilter("province")}
                />
              </Badge>
            )}
            {filters.city && (
              <Badge variant="secondary" className="gap-1">
                {filters.city}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => clearFilter("city")}
                />
              </Badge>
            )}
          </div>
          <Separator />
        </div>
      )}

      {/* Subcategory Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("subcategory")}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          زیرگروه
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.subcategory ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.subcategory && (
          <div className="space-y-2">
            {subcategories[filters.category as keyof typeof subcategories]?.map(
              (sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="subcategory"
                    checked={filters.subcategory === sub}
                    onChange={() => onFilterChange({ subcategory: sub })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">{sub}</span>
                </label>
              ),
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Seller Type Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("sellerType")}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          نوع فروشنده
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.sellerType ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.sellerType && (
          <div className="space-y-2">
            {sellerTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sellerType"
                  checked={filters.sellerType === type}
                  onChange={() => onFilterChange({ sellerType: type })}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Location Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("location")}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          موقعیت مکانی
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.location ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.location && (
          <div className="space-y-4">
            {/* Province */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">استان</label>
              <div className="space-y-2">
                {provinces.map((province) => (
                  <label
                    key={province}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="province"
                      checked={filters.province === province}
                      onChange={() =>
                        onFilterChange({
                          province: province,
                          city: "", // Reset city when province changes
                        })
                      }
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{province}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* City */}
            {filters.province &&
              cities[filters.province as keyof typeof cities] && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    شهر
                  </label>
                  <div className="space-y-2">
                    {cities[filters.province as keyof typeof cities].map(
                      (city) => (
                        <label
                          key={city}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="city"
                            checked={filters.city === city}
                            onChange={() => onFilterChange({ city: city })}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm">{city}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          محدوده قیمت
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600">از (تومان)</label>
                <Input
                  type="number"
                  placeholder="حداقل"
                  value={filters.priceRange.min || ""}
                  onChange={(e) =>
                    onFilterChange({
                      priceRange: {
                        ...filters.priceRange,
                        min: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">تا (تومان)</label>
                <Input
                  type="number"
                  placeholder="حداکثر"
                  value={
                    filters.priceRange.max === 10000000
                      ? ""
                      : filters.priceRange.max
                  }
                  onChange={(e) =>
                    onFilterChange({
                      priceRange: {
                        ...filters.priceRange,
                        max: parseInt(e.target.value) || 10000000,
                      },
                    })
                  }
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[100000, 500000, 1000000, 5000000].map((price) => (
                <Button
                  key={price}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onFilterChange({
                      priceRange: { min: 0, max: price },
                    })
                  }
                  className="h-7 text-xs"
                >
                  تا {price.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <Filter className="w-4 h-4" />
            فیلترها
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>فیلتر محصولات</SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Card className="p-4 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4" />
        <h2 className="font-medium">فیلترها</h2>
        {getActiveFiltersCount() > 0 && (
          <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
        )}
      </div>
      <FilterContent />
    </Card>
  );
}

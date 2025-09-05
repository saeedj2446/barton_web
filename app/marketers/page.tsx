"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, MapPin, TrendingUp, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface Marketer {
  id: number;
  name: string;
  avatar: string;
  location: string;
  locationId: string;
  country: string;
  province: string;
  city: string;
  marketingScore: number;
  invites: number;
  followers: number;
  specialties: string[];
  verified: boolean;
  joinedDate: string;
  totalSales: number;
  responseTime: string;
}

interface MarketersFilters {
  country: string;
  province: string;
  city: string;
  searchQuery: string;
  sortBy: string;
}

export default function MarketersPage() {
  const [currentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });

  const [filters, setFilters] = useState<MarketersFilters>({
    country: "",
    province: "",
    city: "",
    searchQuery: "",
    sortBy: "score",
  });

  const translations = {
    title: "بازاریابان",
    subtitle: "بهترین بازاریابان را پیدا کنید و با آنها همکاری کنید",
    searchPlaceholder: "جستجو در بازاریابان...",
    allCountries: "همه کشورها",
    allProvinces: "همه استان‌ها",
    allCities: "همه شهرها",
    sortByScore: "بر اساس امتیاز",
    sortByInvites: "بر اساس دعوت‌ها",
    sortByFollowers: "بر اساس فالورها",
    sortByNewest: "جدیدترین",
    marketingScore: "امتیاز بازاریابی",
    invites: "دعوت‌ها",
    followers: "فالورها",
    viewProfile: "مشاهده پروفایل",
    contact: "تماس",
    verified: "تایید شده",
    responseTime: "زمان پاسخ",
    totalSales: "کل فروش",
    joinedDate: "تاریخ عضویت",
    resultsFound: "بازاریاب یافت شد",
    noResults: "بازاریابی یافت نشد",
    noResultsDesc: "فیلترهای خود را تغییر دهید",
  };

  // Mock marketers data
  const allMarketers: Marketer[] = [
    {
      id: 1,
      name: "احمد رضایی",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
      location: "شیراز، فارس، ایران",
      locationId: "shiraz",
      country: "ایران",
      province: "فارس",
      city: "شیراز",
      marketingScore: 2850,
      invites: 145,
      followers: 2705,
      specialties: ["الکترونیک", "موبایل", "لپ‌تاپ"],
      verified: true,
      joinedDate: "2023-01-15",
      totalSales: 45000000,
      responseTime: "کمتر از 1 ساعت",
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fateme",
      location: "شیراز، فارس، ایران",
      locationId: "shiraz",
      country: "ایران",
      province: "فارس",
      city: "شیراز",
      marketingScore: 2340,
      invites: 98,
      followers: 2242,
      specialties: ["پوشاک", "زیبایی", "آرایشی"],
      verified: true,
      joinedDate: "2023-03-20",
      totalSales: 32000000,
      responseTime: "2-3 ساعت",
    },
    {
      id: 3,
      name: "علی کریمی",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
      location: "شیراز، فارس، ایران",
      locationId: "shiraz",
      country: "ایران",
      province: "فارس",
      city: "شیراز",
      marketingScore: 1980,
      invites: 76,
      followers: 1904,
      specialties: ["خانه و آشپزخانه", "لوازم خانگی"],
      verified: false,
      joinedDate: "2023-05-10",
      totalSales: 28000000,
      responseTime: "1-2 ساعت",
    },
    {
      id: 4,
      name: "مریم احمدی",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maryam",
      location: "تهران، تهران، ایران",
      locationId: "tehran-city",
      country: "ایران",
      province: "تهران",
      city: "تهران",
      marketingScore: 3450,
      invites: 189,
      followers: 3261,
      specialties: ["لوازم خانگی", "الکترونیک", "کامپیوتر"],
      verified: true,
      joinedDate: "2022-11-05",
      totalSales: 67000000,
      responseTime: "کمتر از 30 دقیقه",
    },
    {
      id: 5,
      name: "حسن موسوی",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hassan",
      location: "اصفهان، اصفهان، ایران",
      locationId: "isfahan-city",
      country: "ایران",
      province: "اصفهان",
      city: "اصفهان",
      marketingScore: 2120,
      invites: 87,
      followers: 2033,
      specialties: ["صنایع دستی", "فرش", "سوغات"],
      verified: true,
      joinedDate: "2023-02-28",
      totalSales: 38000000,
      responseTime: "1-3 ساعت",
    },
    {
      id: 6,
      name: "Omar Al-Rashid",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
      location: "دبی، دبی، امارات",
      locationId: "dubai-city",
      country: "امارات",
      province: "دبی",
      city: "دبی",
      marketingScore: 2890,
      invites: 134,
      followers: 2756,
      specialties: ["لوکس", "جواهرات", "ساعت"],
      verified: true,
      joinedDate: "2023-02-12",
      totalSales: 89000000,
      responseTime: "کمتر از 2 ساعت",
    },
    {
      id: 7,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      location: "London, UK",
      locationId: "london",
      country: "انگلستان",
      province: "لندن",
      city: "لندن",
      marketingScore: 4200,
      invites: 245,
      followers: 3955,
      specialties: ["Fashion", "Electronics", "Luxury"],
      verified: true,
      joinedDate: "2022-08-18",
      totalSales: 125000000,
      responseTime: "کمتر از 1 ساعت",
    },
  ];

  // Get unique countries, provinces, cities for filters
  const countries = [...new Set(allMarketers.map((m) => m.country))];
  const provinces = filters.country
    ? [
        ...new Set(
          allMarketers
            .filter((m) => m.country === filters.country)
            .map((m) => m.province),
        ),
      ]
    : [];
  const cities = filters.province
    ? [
        ...new Set(
          allMarketers
            .filter((m) => m.province === filters.province)
            .map((m) => m.city),
        ),
      ]
    : [];

  // Filter and sort marketers
  const filteredMarketers = useMemo(() => {
    let filtered = allMarketers;

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (marketer) =>
          marketer.name.toLowerCase().includes(query) ||
          marketer.location.toLowerCase().includes(query) ||
          marketer.specialties.some((s) => s.toLowerCase().includes(query)),
      );
    }

    // Location filters
    if (filters.country) {
      filtered = filtered.filter((m) => m.country === filters.country);
    }
    if (filters.province) {
      filtered = filtered.filter((m) => m.province === filters.province);
    }
    if (filters.city) {
      filtered = filtered.filter((m) => m.city === filters.city);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "score":
          return b.marketingScore - a.marketingScore;
        case "invites":
          return b.invites - a.invites;
        case "followers":
          return b.followers - a.followers;
        case "newest":
          return (
            new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
          );
        default:
          return b.marketingScore - a.marketingScore;
      }
    });

    return filtered;
  }, [filters]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {translations.title}
            </h1>
            <p className="text-xl text-gray-600">{translations.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search
                className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
              />
              <Input
                placeholder={translations.searchPlaceholder}
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12`}
              />
            </div>

            {/* Country Filter */}
            <Select
              value={filters.country}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  country: value,
                  province: "",
                  city: "",
                }))
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={translations.allCountries} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{translations.allCountries}</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Province Filter */}
            <Select
              value={filters.province}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, province: value, city: "" }))
              }
              disabled={!filters.country}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={translations.allProvinces} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{translations.allProvinces}</SelectItem>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select
              value={filters.city}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, city: value }))
              }
              disabled={!filters.province}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={translations.allCities} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{translations.allCities}</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">
                  {translations.sortByScore}
                </SelectItem>
                <SelectItem value="invites">
                  {translations.sortByInvites}
                </SelectItem>
                <SelectItem value="followers">
                  {translations.sortByFollowers}
                </SelectItem>
                <SelectItem value="newest">
                  {translations.sortByNewest}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMarketers.length} {translations.resultsFound}
          </p>
        </div>

        {/* Marketers Grid */}
        {filteredMarketers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {translations.noResults}
            </h3>
            <p className="text-gray-500">{translations.noResultsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMarketers.map((marketer) => (
              <Card
                key={marketer.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-4">
                      <img
                        src={marketer.avatar}
                        alt={marketer.name}
                        className="w-20 h-20 rounded-full mx-auto bg-gray-100 border-4 border-orange-100"
                      />
                      {marketer.verified && (
                        <div className="absolute -top-1 -right-1 bg-orange-600 rounded-full p-1">
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {marketer.name}
                    </h3>
                    <div className="flex items-center justify-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{marketer.location}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {marketer.specialties
                        .slice(0, 2)
                        .map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-1 bg-orange-100 text-orange-700"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      {marketer.specialties.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600"
                        >
                          +{marketer.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {translations.marketingScore}
                      </span>
                      <span className="font-bold text-orange-600">
                        {formatNumber(marketer.marketingScore)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {translations.invites}
                      </span>
                      <span className="font-semibold text-blue-600">
                        {formatNumber(marketer.invites)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {translations.followers}
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatNumber(marketer.followers)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {translations.responseTime}
                      </span>
                      <span className="font-medium text-gray-800">
                        {marketer.responseTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      {translations.viewProfile}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      {translations.contact}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

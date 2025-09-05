"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Gem,
  ShoppingCart,
  Car,
  Shirt,
  Utensils,
  Smartphone,
  Home,
  Stethoscope,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface SpecializedService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  supplierCount: number;
  retailerCount: number;
  category: string;
  featured: boolean;
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const services: SpecializedService[] = [
    {
      id: "jewelry",
      name: "طلا و جواهرات",
      description: "اتصال تولیدکنندگان طلا و جواهرات به طلافروشی‌ها",
      icon: <Gem className="w-8 h-8" />,
      color: "text-yellow-600",
      supplierCount: 245,
      retailerCount: 1200,
      category: "لوکس",
      featured: true,
    },
    {
      id: "supermarket",
      name: "سوپرمارکت و پخش",
      description:
        "اتصال شرکت‌های پخش به سوپرمارکت‌ها و فروشگاه‌های مواد غذایی",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "text-green-600",
      supplierCount: 180,
      retailerCount: 850,
      category: "مواد غذایی",
      featured: true,
    },
    {
      id: "automotive",
      name: "قطعات خودرو",
      description: "اتصال تولیدکنندگان قطعات خودرو به فروشگاه‌های قطعه‌فروشی",
      icon: <Car className="w-8 h-8" />,
      color: "text-blue-600",
      supplierCount: 320,
      retailerCount: 950,
      category: "خودرو",
      featured: true,
    },
    {
      id: "cosmetics",
      name: "لوازم آرایشی",
      description: "اتصال برندهای آرایشی به آرایشگاه‌ها و فروشگاه‌های زیبایی",
      icon: <Shirt className="w-8 h-8" />,
      color: "text-pink-600",
      supplierCount: 150,
      retailerCount: 680,
      category: "زیبایی",
      featured: true,
    },
    {
      id: "restaurant",
      name: "رستوران و تجهیزات",
      description: "اتصال تامین‌کنندگان مواد غذایی و تجهیزات به رستوران‌ها",
      icon: <Utensils className="w-8 h-8" />,
      color: "text-orange-600",
      supplierCount: 200,
      retailerCount: 750,
      category: "مواد غذایی",
      featured: false,
    },
    {
      id: "electronics",
      name: "الکترونیک و موبایل",
      description:
        "اتصال وارد‌کنندگان الکترونیک به فروشگاه‌های موبایل و لپ‌تاپ",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-purple-600",
      supplierCount: 280,
      retailerCount: 1100,
      category: "الکترونیک",
      featured: false,
    },
    {
      id: "home-appliances",
      name: "لوازم خانگی",
      description: "اتصال تولیدکنندگان لوازم خانگی به نمایندگی‌ها و فروشگاه‌ها",
      icon: <Home className="w-8 h-8" />,
      color: "text-indigo-600",
      supplierCount: 190,
      retailerCount: 620,
      category: "خانه",
      featured: false,
    },
    {
      id: "medical",
      name: "تجهیزات پزشکی",
      description:
        "اتصال تامین‌کنندگان تجهیزات پزشکی به داروخانه‌ها و کلینیک‌ها",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "text-red-600",
      supplierCount: 120,
      retailerCount: 450,
      category: "پزشکی",
      featured: false,
    },
  ];

  const categories = [...new Set(services.map((s) => s.category))];

  const filteredServices = services
    .filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryFilter || service.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured ? 1 : -1;
        case "suppliers":
          return b.supplierCount - a.supplierCount;
        case "retailers":
          return b.retailerCount - a.retailerCount;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              سرویس‌های تخصصی لینکو
            </h1>
            <p className="text-xl text-gray-600">
              اتصال تامین‌کنندگان و خرده‌فروشان در صنایع تخصصی
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="جستجو در سرویس‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="همه دسته‌بندی‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه دسته‌بندی‌ها</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">پیشنهاد ویژه</SelectItem>
                <SelectItem value="suppliers">بیشترین تامین‌کننده</SelectItem>
                <SelectItem value="retailers">بیشترین خرده‌فروش</SelectItem>
                <SelectItem value="name">نام سرویس</SelectItem>
              </SelectContent>
            </Select>

            {/* Apply Button */}
            <Button className="h-12 bg-orange-600 hover:bg-orange-700">
              <Filter className="w-4 h-4 ml-2" />
              اعمال فیلتر
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices.length} سرویس یافت شد
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  {service.featured && (
                    <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      پیشنهاد ویژه
                    </div>
                  )}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300 ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">تامین‌کننده</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(service.supplierCount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">خرده‌فروش</span>
                    <span className="font-semibold text-green-600">
                      {formatNumber(service.retailerCount)}
                    </span>
                  </div>
                </div>

                <Link href={`/services/${service.id}`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group-hover:bg-orange-700 transition-colors">
                    مشاهده سرویس
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

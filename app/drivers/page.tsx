"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Truck,
  Package,
  Phone,
  Shield,
  Award,
  Clock,
  UserPlus,
  ChevronDown,
} from "lucide-react";
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

interface Driver {
  id: string;
  name: string;
  location: string;
  rating: number;
  experience: number;
  vehicleType: string;
  capacity: string;
  vehicleImage: string;
  verified: boolean;
  completedTrips: number;
  responseTime: string;
  specialties: string[];
  country: string;
  province: string;
  city: string;
}

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");

  const drivers: Driver[] = [
    {
      id: "1",
      name: "احمد محمدی",
      location: "شیراز، فارس، ایران",
      rating: 4.9,
      experience: 8,
      vehicleType: "کامیون ۱۰ تن",
      capacity: "۱۰ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      verified: true,
      completedTrips: 1250,
      responseTime: "۱۵ دقیقه",
      specialties: ["حمل مواد غذایی", "بار سنگین"],
      country: "ایران",
      province: "فارس",
      city: "شیراز",
    },
    {
      id: "2",
      name: "علی رضایی",
      location: "تهران، تهران، ایران",
      rating: 4.8,
      experience: 12,
      vehicleType: "وانت نیسان",
      capacity: "۲ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?w=400&q=80",
      verified: true,
      completedTrips: 890,
      responseTime: "۱۰ دقیقه",
      specialties: ["حمل شهری", "بار سبک"],
      country: "ایران",
      province: "تهران",
      city: "تهران",
    },
    {
      id: "3",
      name: "حسن احمدی",
      location: "اصفهان، اصفهان، ایران",
      rating: 4.7,
      experience: 6,
      vehicleType: "کامیونت ۵ تن",
      capacity: "۵ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80",
      verified: false,
      completedTrips: 456,
      responseTime: "۲۰ دقیقه",
      specialties: ["حمل بین‌شهری", "بار متوسط"],
      country: "ایران",
      province: "اصفهان",
      city: "اصفهان",
    },
    {
      id: "4",
      name: "مهدی کریمی",
      location: "مشهد، خراسان رضوی، ایران",
      rating: 4.9,
      experience: 15,
      vehicleType: "تریلی ۲۰ تن",
      capacity: "۲۰ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&q=80",
      verified: true,
      completedTrips: 2100,
      responseTime: "۳۰ دقیقه",
      specialties: ["حمل بین‌استانی", "بار فوق سنگین"],
      country: "ایران",
      province: "خراسان رضوی",
      city: "مشهد",
    },
    {
      id: "5",
      name: "محمد حسینی",
      location: "دبی، امارات متحده عربی",
      rating: 4.6,
      experience: 10,
      vehicleType: "کامیون ۱۵ تن",
      capacity: "۱۵ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
      verified: true,
      completedTrips: 780,
      responseTime: "۲۵ دقیقه",
      specialties: ["حمل بین‌المللی", "بار تجاری"],
      country: "امارات",
      province: "دبی",
      city: "دبی",
    },
    {
      id: "6",
      name: "احمد عثمان",
      location: "استانبول، ترکیه",
      rating: 4.5,
      experience: 7,
      vehicleType: "وانت بار",
      capacity: "۳ تن",
      vehicleImage:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80",
      verified: false,
      completedTrips: 320,
      responseTime: "۴۰ دقیقه",
      specialties: ["حمل شهری", "بار سبک"],
      country: "ترکیه",
      province: "استانبول",
      city: "استانبول",
    },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = !countryFilter || driver.country === countryFilter;
    const matchesProvince =
      !provinceFilter || driver.province === provinceFilter;
    const matchesCity = !cityFilter || driver.city === cityFilter;
    const matchesVehicleType =
      !vehicleTypeFilter || driver.vehicleType.includes(vehicleTypeFilter);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesProvince &&
      matchesCity &&
      matchesVehicleType
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  راننده‌ها و حمل بار
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  راننده‌های مطمئن و خدمات حمل بار برای کسب‌وکار شما
                </p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 ml-2" />
              ثبت‌نام راننده
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">
                  {formatNumber(drivers.length)}
                </div>
                <div className="text-blue-100">راننده فعال</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Package className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">۱۲۴۵</div>
                <div className="text-blue-100">بار حمل شده این ماه</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Star className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">۴.۸</div>
                <div className="text-blue-100">میانگین رضایت</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="جستجو راننده..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12"
              />
            </div>

            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="انتخاب کشور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="همه کشورها">همه کشورها</SelectItem>
                <SelectItem value="ایران">ایران</SelectItem>
                <SelectItem value="امارات">امارات متحده عربی</SelectItem>
                <SelectItem value="ترکیه">ترکیه</SelectItem>
              </SelectContent>
            </Select>

            <Select value={provinceFilter} onValueChange={setProvinceFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="انتخاب استان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="همه استان‌ها">همه استان‌ها</SelectItem>
                <SelectItem value="فارس">فارس</SelectItem>
                <SelectItem value="تهران">تهران</SelectItem>
                <SelectItem value="اصفهان">اصفهان</SelectItem>
                <SelectItem value="خراسان رضوی">خراسان رضوی</SelectItem>
                <SelectItem value="دبی">دبی</SelectItem>
                <SelectItem value="استانبول">استانبول</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="انتخاب شهر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="همه شهرها">همه شهرها</SelectItem>
                <SelectItem value="شیراز">شیراز</SelectItem>
                <SelectItem value="تهران">تهران</SelectItem>
                <SelectItem value="اصفهان">اصفهان</SelectItem>
                <SelectItem value="مشهد">مشهد</SelectItem>
                <SelectItem value="دبی">دبی</SelectItem>
                <SelectItem value="استانبول">استانبول</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={vehicleTypeFilter}
              onValueChange={setVehicleTypeFilter}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="نوع خودرو" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="همه انواع">همه انواع</SelectItem>
                <SelectItem value="وانت">وانت</SelectItem>
                <SelectItem value="کامیونت">کامیونت</SelectItem>
                <SelectItem value="کامیون">کامیون</SelectItem>
                <SelectItem value="تریلی">تریلی</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-12 bg-orange-600 hover:bg-orange-700">
              <Filter className="w-4 h-4 ml-2" />
              اعمال فیلتر
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {formatNumber(filteredDrivers.length)} راننده یافت شد
          </p>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrivers.map((driver) => (
            <Card
              key={driver.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Vehicle Image */}
                <div className="relative">
                  <img
                    src={driver.vehicleImage}
                    alt={driver.vehicleType}
                    className="w-full h-48 object-cover"
                  />
                  {driver.verified && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                      <Shield className="w-3 h-3 ml-1" />
                      تایید شده
                    </Badge>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center bg-black/50 rounded px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" />
                        <span>{driver.rating}</span>
                      </div>
                      <div className="flex items-center bg-black/50 rounded px-2 py-1">
                        <Award className="w-3 h-3 ml-1" />
                        <span>{driver.experience} سال</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Driver Info */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {driver.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 ml-1" />
                      {driver.location}
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">نوع خودرو:</span>
                      <span className="font-semibold text-blue-600">
                        {driver.vehicleType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-blue-600 ml-1" />
                        <span className="text-gray-600">ظرفیت:</span>
                      </div>
                      <span className="font-semibold text-blue-600">
                        {driver.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">سفرها:</span>
                      <span className="font-semibold text-green-600">
                        {formatNumber(driver.completedTrips)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">زمان پاسخ:</span>
                      <span className="font-semibold text-orange-600">
                        {driver.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {driver.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm">
                      <Phone className="w-3 h-3 ml-1" />
                      تماس
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm">
                      مشاهده پروفایل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

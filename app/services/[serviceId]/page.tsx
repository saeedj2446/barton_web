"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Users,
  Building,
  Package,
  TrendingUp,
  Gem,
  ShoppingCart,
  Car,
  Shirt,
  Utensils,
  Smartphone,
  Home,
  Stethoscope,
  UserPlus,
  Store,
  ChevronDown,
  Heart,
  Eye,
  MessageCircle,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface ServiceData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  supplierCount: number;
  retailerCount: number;
  categories: string[];
}

interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  products: number;
  verified: boolean;
  specialties: string[];
  image: string;
}

interface Retailer {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  orders: number;
  verified: boolean;
  image: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  supplier: string;
  supplierLocation: string;
  rating: number;
  reviews: number;
  minOrder: number;
  image: string;
  verified: boolean;
  featured: boolean;
}

export default function ServicePage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const [activeTab, setActiveTab] = useState<
    "suppliers" | "retailers" | "products"
  >("suppliers");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    id: "shiraz",
    name: "شیراز",
    type: "city" as const,
    parentId: "fars",
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const servicesData: Record<string, ServiceData> = {
    jewelry: {
      id: "jewelry",
      name: "پخش طلا و جواهرات",
      description: "اتصال تولیدکنندگان طلا و جواهرات به طلافروشی‌ها",
      icon: <Gem className="w-8 h-8" />,
      color: "text-yellow-600",
      supplierCount: 245,
      retailerCount: 1200,
      categories: ["طلا", "نقره", "جواهرات", "ساعت", "سنگ قیمتی"],
    },
    cosmetics: {
      id: "cosmetics",
      name: "پخش لوازم آرایشی",
      description:
        "اتصال برندهای آرایشی به آرایشگاه‌ها، خرده‌فروشان و سایر اصناف",
      icon: <Shirt className="w-8 h-8" />,
      color: "text-pink-600",
      supplierCount: 150,
      retailerCount: 680,
      categories: [
        "آرایش صورت",
        "مراقبت پوست",
        "عطر",
        "لوازم آرایشگاهی",
        "ناخن",
        "خرده‌فروشی",
        "آرایشگاه",
        "سالن زیبایی",
        "بنکداری",
        "سایر اصناف",
      ],
    },
    automotive: {
      id: "automotive",
      name: "پخش قطعات خودرو",
      description: "اتصال تولیدکنندگان قطعات خودرو به فروشگاه‌های قطعه‌فروشی",
      icon: <Car className="w-8 h-8" />,
      color: "text-blue-600",
      supplierCount: 320,
      retailerCount: 950,
      categories: ["قطعات موتور", "لاستیک", "روغن", "باتری", "لوازم یدکی"],
    },
  };

  const currentService = servicesData[serviceId] || servicesData.cosmetics;

  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "شرکت آرایشی پارس",
      location: "تهران، ایران",
      rating: 4.8,
      products: 150,
      verified: true,
      specialties: ["آرایش صورت", "مراقبت پوست"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier1",
    },
    {
      id: "2",
      name: "کمپانی زیبایی آسیا",
      location: "اصفهان، ایران",
      rating: 4.6,
      products: 89,
      verified: true,
      specialties: ["عطر", "لوازم آرایشگاهی"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier2",
    },
    {
      id: "3",
      name: "برند کیهان",
      location: "شیراز، ایران",
      rating: 4.5,
      products: 67,
      verified: false,
      specialties: ["ناخن", "آرایش صورت"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier3",
    },
  ];

  // Mock data for retailers
  const retailers: Retailer[] = [
    {
      id: "1",
      name: "آرایشگاه ملکه",
      location: "تهران، ونک",
      type: "آرایشگاه زنانه",
      rating: 4.9,
      orders: 245,
      verified: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=retailer1",
    },
    {
      id: "2",
      name: "فروشگاه زیبایی نور",
      location: "مشهد، احمدآباد",
      type: "فروشگاه لوازم آرایشی",
      rating: 4.7,
      orders: 189,
      verified: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=retailer2",
    },
    {
      id: "3",
      name: "سالن زیبایی پریا",
      location: "شیراز، ستارخان",
      type: "سالن زیبایی",
      rating: 4.6,
      orders: 156,
      verified: false,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=retailer3",
    },
  ];

  // Mock data for products
  const products: Product[] = [
    {
      id: "1",
      name: "رژ لب مات پایدار",
      description: "رژ لب با فرمول مات و پایداری ۱۲ ساعته",
      price: 85000,
      originalPrice: 120000,
      category: "آرایش صورت",
      supplier: "شرکت آرایشی پارس",
      supplierLocation: "تهران",
      rating: 4.8,
      reviews: 156,
      minOrder: 50,
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
      verified: true,
      featured: true,
    },
    {
      id: "2",
      name: "کرم مرطوب کننده صورت",
      description: "کرم مرطوب کننده مناسب انواع پوست",
      price: 65000,
      category: "مراقبت پوست",
      supplier: "کمپانی زیبایی آسیا",
      supplierLocation: "اصفهان",
      rating: 4.6,
      reviews: 89,
      minOrder: 30,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
      verified: true,
      featured: false,
    },
    {
      id: "3",
      name: "عطر زنانه لوکس",
      description: "عطر با رایحه گلی و ماندگاری بالا",
      price: 150000,
      originalPrice: 200000,
      category: "عطر",
      supplier: "برند کیهان",
      supplierLocation: "شیراز",
      rating: 4.5,
      reviews: 67,
      minOrder: 20,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
      verified: false,
      featured: true,
    },
    {
      id: "4",
      name: "لاک ناخن ژل",
      description: "لاک ناخن ژل با پایداری ۲ هفته‌ای",
      price: 45000,
      category: "ناخن",
      supplier: "شرکت آرایشی پارس",
      supplierLocation: "تهران",
      rating: 4.7,
      reviews: 234,
      minOrder: 100,
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
      verified: true,
      featured: false,
    },
  ];

  // Location data for modal
  const locationData = {
    countries: [
      { id: "iran", name: "ایران", type: "country" as const },
      { id: "uae", name: "امارات متحده عربی", type: "country" as const },
      { id: "turkey", name: "ترکیه", type: "country" as const },
    ],
    provinces: {
      iran: [
        {
          id: "fars",
          name: "فارس",
          type: "province" as const,
          parentId: "iran",
        },
        {
          id: "tehran",
          name: "تهران",
          type: "province" as const,
          parentId: "iran",
        },
        {
          id: "isfahan",
          name: "اصفهان",
          type: "province" as const,
          parentId: "iran",
        },
      ],
      uae: [
        {
          id: "dubai",
          name: "دبی",
          type: "province" as const,
          parentId: "uae",
        },
        {
          id: "abudhabi",
          name: "ابوظبی",
          type: "province" as const,
          parentId: "uae",
        },
      ],
      turkey: [
        {
          id: "istanbul",
          name: "استانبول",
          type: "province" as const,
          parentId: "turkey",
        },
      ],
    },
    cities: {
      fars: [
        {
          id: "shiraz",
          name: "شیراز",
          type: "city" as const,
          parentId: "fars",
        },
        {
          id: "marvdasht",
          name: "مرودشت",
          type: "city" as const,
          parentId: "fars",
        },
      ],
      tehran: [
        {
          id: "tehran-city",
          name: "تهران",
          type: "city" as const,
          parentId: "tehran",
        },
        { id: "karaj", name: "کرج", type: "city" as const, parentId: "tehran" },
      ],
      isfahan: [
        {
          id: "isfahan-city",
          name: "اصفهان",
          type: "city" as const,
          parentId: "isfahan",
        },
      ],
      dubai: [
        {
          id: "dubai-city",
          name: "دبی",
          type: "city" as const,
          parentId: "dubai",
        },
      ],
      abudhabi: [
        {
          id: "abudhabi-city",
          name: "ابوظبی",
          type: "city" as const,
          parentId: "abudhabi",
        },
      ],
      istanbul: [
        {
          id: "istanbul-city",
          name: "استانبول",
          type: "city" as const,
          parentId: "istanbul",
        },
      ],
    },
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full bg-gray-100 ${currentService.color}`}
                >
                  {currentService.icon}
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                    {currentService.name} {selectedLocation.name}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-600 mt-1">
                    {currentService.description}
                  </p>
                </div>
              </div>

              {/* Location Selector */}
              <Dialog
                open={isLocationModalOpen}
                onOpenChange={setIsLocationModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 border-orange-500 text-orange-600 hover:bg-orange-50 w-fit"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      تغییر موقعیت: {selectedLocation.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      انتخاب موقعیت جغرافیایی
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">کشور</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کشور" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationData.countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">استان</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب استان" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fars">فارس</SelectItem>
                          <SelectItem value="tehran">تهران</SelectItem>
                          <SelectItem value="isfahan">اصفهان</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">شهر</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب شهر" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shiraz">شیراز</SelectItem>
                          <SelectItem value="tehran-city">تهران</SelectItem>
                          <SelectItem value="isfahan-city">اصفهان</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base">
                <UserPlus className="w-4 h-4 ml-2" />
                عضویت به عنوان تامین‌کننده
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base">
                <Store className="w-4 h-4 ml-2" />
                عضویت به عنوان خرده‌فروش
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-orange-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Building className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">
                  {formatNumber(currentService.supplierCount)}
                </div>
                <div className="text-orange-100">تامین‌کننده فعال</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Store className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">
                  {formatNumber(currentService.retailerCount)}
                </div>
                <div className="text-orange-100">خرده‌فروش فعال</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <div>
                <div className="text-2xl font-bold">۲۴۵</div>
                <div className="text-orange-100">معامله این ماه</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6 h-auto">
            <TabsTrigger
              value="suppliers"
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
            >
              <Building className="w-4 h-4" />
              <span className="hidden md:inline">
                تامین‌کنندگان ({formatNumber(currentService.supplierCount)})
              </span>
              <span className="md:hidden">تامین‌کنندگان</span>
            </TabsTrigger>
            <TabsTrigger
              value="retailers"
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
            >
              <Store className="w-4 h-4" />
              <span className="hidden md:inline">
                خرده‌فروشان ({formatNumber(currentService.retailerCount)})
              </span>
              <span className="md:hidden">خرده‌فروشان</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm"
            >
              <Package className="w-4 h-4" />
              <span className="hidden md:inline">
                محصولات ({formatNumber(products.length)})
              </span>
              <span className="md:hidden">محصولات</span>
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-10 md:h-12"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-10 md:h-12">
                  <SelectValue placeholder="همه دسته‌بندی‌ها" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه دسته‌بندی‌ها</SelectItem>
                  {currentService.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="h-10 md:h-12 bg-orange-600 hover:bg-orange-700">
                <Filter className="w-4 h-4 ml-2" />
                اعمال فیلتر
              </Button>
            </div>
          </div>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {suppliers.map((supplier) => (
                <Card
                  key={supplier.id}
                  className="hover:shadow-lg transition-shadow bg-white"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={supplier.image}
                        alt={supplier.name}
                        className="w-16 h-16 rounded-full bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{supplier.name}</h3>
                          {supplier.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              تایید شده
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-4 h-4 ml-1" />
                          {supplier.location}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                            {supplier.rating}
                          </div>
                          <div className="flex items-center">
                            <Package className="w-4 h-4 text-blue-600 ml-1" />
                            {formatNumber(supplier.products)} محصول
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {supplier.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        مشاهده پروفایل
                      </Button>
                      <Button variant="outline" className="flex-1">
                        تماس
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Retailers Tab */}
          <TabsContent value="retailers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {retailers.map((retailer) => (
                <Card
                  key={retailer.id}
                  className="hover:shadow-lg transition-shadow bg-white"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={retailer.image}
                        alt={retailer.name}
                        className="w-16 h-16 rounded-full bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{retailer.name}</h3>
                          {retailer.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              تایید شده
                            </Badge>
                          )}
                        </div>
                        <div className="text-orange-600 text-sm font-medium mb-2">
                          {retailer.type}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-4 h-4 ml-1" />
                          {retailer.location}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                            {retailer.rating}
                          </div>
                          <div className="flex items-center">
                            <ShoppingCart className="w-4 h-4 text-green-600 ml-1" />
                            {formatNumber(retailer.orders)} سفارش
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        مشاهده پروفایل
                      </Button>
                      <Button variant="outline" className="flex-1">
                        تماس
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        ویژه
                      </Badge>
                    )}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/80 hover:bg-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageCircle className="w-4 h-4 ml-1" />
                        <span className="text-sm">{product.reviews}</span>
                      </div>
                      {product.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs mr-auto">
                          تایید شده
                        </Badge>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            {formatNumber(product.originalPrice)} تومان
                          </span>
                        )}
                        <span className="font-bold text-lg text-orange-600">
                          {formatNumber(product.price)} تومان
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        حداقل سفارش: {formatNumber(product.minOrder)} عدد
                      </div>
                    </div>

                    <div className="mb-3 pb-3 border-b">
                      <div className="text-sm text-gray-600 mb-1">
                        تامین‌کننده: {product.supplier}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 ml-1" />
                        {product.supplierLocation}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm">
                        درخواست قیمت
                      </Button>
                      <Button variant="outline" className="flex-1 text-sm">
                        مشاهده
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

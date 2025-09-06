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
  Plus,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
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
  businessTypes: string[];
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

interface BuyingRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  budget: number;
  deadline: string;
  location: string;
  postedDate: string;
  urgent: boolean;
  requesterName: string;
  requesterRating: number;
  responses: number;
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  company: string;
  category: string;
  link: string;
}

export default function ServicePage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const [activeTab, setActiveTab] = useState<
    "suppliers" | "retailers" | "products" | "buying-requests"
  >("suppliers");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("");
  const [supplierTypeFilter, setSupplierTypeFilter] = useState("");
  const [supplierLocationFilter, setSupplierLocationFilter] = useState("");
  const [retailerLocationFilter, setRetailerLocationFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    id: "shiraz",
    name: "شیراز",
    type: "city" as const,
    parentId: "fars",
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNewBuyingRequestModalOpen, setIsNewBuyingRequestModalOpen] =
    useState(false);
  const [newBuyingRequest, setNewBuyingRequest] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    budget: "",
    deadline: "",
  });

  // Mock data for buying requests
  const buyingRequests: BuyingRequest[] = [
    {
      id: "1",
      title: "نیاز به رژ لب مات با کیفیت",
      description:
        "به دنبال تامین‌کننده رژ لب مات با کیفیت بالا و قیمت مناسب هستیم",
      category: "آرایش صورت",
      quantity: 500,
      budget: 25000000,
      deadline: "۱۴۰۳/۰۲/۱۵",
      location: "تهران",
      postedDate: "۳ روز پیش",
      urgent: true,
      requesterName: "فروشگاه زیبایی نور",
      requesterRating: 4.8,
      responses: 12,
    },
    {
      id: "2",
      title: "خرید عمده کرم مرطوب کننده",
      description:
        "نیاز به کرم مرطوب کننده مناسب انواع پوست برای فروشگاه زنجیره‌ای",
      category: "مراقبت پوست",
      quantity: 1000,
      budget: 45000000,
      deadline: "۱۴۰۳/۰۲/۲۰",
      location: "اصفهان",
      postedDate: "۱ روز پیش",
      urgent: false,
      requesterName: "آرایشگاه ملکه",
      requesterRating: 4.9,
      responses: 8,
    },
    {
      id: "3",
      title: "تامین عطر زنانه برندهای معتبر",
      description: "به دنبال تامین‌کننده عطرهای زنانه با برندهای معتبر و اصل",
      category: "عطر",
      quantity: 200,
      budget: 80000000,
      deadline: "۱۴۰۳/۰۳/۰۱",
      location: "شیراز",
      postedDate: "۵ روز پیش",
      urgent: false,
      requesterName: "سالن زیبایی پریا",
      requesterRating: 4.6,
      responses: 15,
    },
  ];

  // Mock data for advertisements
  const advertisements: Advertisement[] = [
    {
      id: "1",
      title: "محصولات آرایشی پارس",
      description: "بهترین کیفیت، بهترین قیمت",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
      company: "شرکت آرایشی پارس",
      category: "آرایشی",
      link: "/suppliers/pars-cosmetics",
    },
    {
      id: "2",
      title: "طلای خالص ۱۸ عیار",
      description: "مستقیم از کارخانه به دست شما",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
      company: "طلای کیهان",
      category: "طلا",
      link: "/suppliers/keyhan-gold",
    },
    {
      id: "3",
      title: "نقره دست‌ساز اصفهان",
      description: "هنر اصیل ایرانی با کیفیت بین‌المللی",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
      company: "نقره‌کاری اصفهان",
      category: "نقره",
      link: "/suppliers/isfahan-silver",
    },
  ];

  const handleNewBuyingRequestSubmit = () => {
    // Handle form submission logic here
    console.log("New buying request:", newBuyingRequest);
    setIsNewBuyingRequestModalOpen(false);
    // Reset form
    setNewBuyingRequest({
      title: "",
      description: "",
      category: "",
      quantity: "",
      budget: "",
      deadline: "",
    });
  };

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
      businessTypes: [
        "طلافروشی",
        "جواهرفروشی",
        "بنکدار طلا",
        "خرده‌فروش ساعت",
        "سایر اصناف",
      ],
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
      ],
      businessTypes: [
        "خرده‌فروشی لوازم آرایشی",
        "آرایشگاه زنانه",
        "آرایشگاه مردانه",
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
      businessTypes: [
        "قطعه‌فروشی خودرو",
        "تعمیرگاه",
        "نمایندگی خودرو",
        "فروش لاستیک",
        "سایر اصناف",
      ],
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
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-lg border-b h-auto p-1">
              <TabsTrigger
                value="suppliers"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 md:p-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-md"
              >
                <Building className="w-4 h-4" />
                <span className="hidden md:inline">
                  تامین‌کنندگان ({formatNumber(currentService.supplierCount)})
                </span>
                <span className="md:hidden">تامین‌کنندگان</span>
              </TabsTrigger>
              <TabsTrigger
                value="retailers"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 md:p-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-md"
              >
                <Store className="w-4 h-4" />
                <span className="hidden md:inline">
                  خرده‌فروشان ({formatNumber(currentService.retailerCount)})
                </span>
                <span className="md:hidden">خرده‌فروشان</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 md:p-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-md"
              >
                <Package className="w-4 h-4" />
                <span className="hidden md:inline">
                  محصولات ({formatNumber(products.length)})
                </span>
                <span className="md:hidden">محصولات</span>
              </TabsTrigger>
              <TabsTrigger
                value="buying-requests"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 md:p-4 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:inline">
                  درخواست‌های خرید ({formatNumber(buyingRequests.length)})
                </span>
                <span className="md:hidden">درخواست‌ها</span>
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 h-10 md:h-12"
                  />
                </div>

                {/* Supplier Filters */}
                {activeTab === "suppliers" && (
                  <>
                    <Select
                      value={supplierLocationFilter}
                      onValueChange={setSupplierLocationFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="انتخاب موقعیت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه موقعیت‌ها</SelectItem>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="isfahan">اصفهان</SelectItem>
                        <SelectItem value="shiraz">شیراز</SelectItem>
                        <SelectItem value="mashhad">مشهد</SelectItem>
                        <SelectItem value="tabriz">تبریز</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={supplierTypeFilter}
                      onValueChange={setSupplierTypeFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="نوع تامین‌کننده" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه انواع</SelectItem>
                        <SelectItem value="manufacturer">تولیدکننده</SelectItem>
                        <SelectItem value="distributor">پخش‌کننده</SelectItem>
                        <SelectItem value="importer">واردکننده</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}

                {/* Retailer Filters */}
                {activeTab === "retailers" && (
                  <>
                    <Select
                      value={retailerLocationFilter}
                      onValueChange={setRetailerLocationFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="انتخاب موقعیت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه موقعیت‌ها</SelectItem>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="isfahan">اصفهان</SelectItem>
                        <SelectItem value="shiraz">شیراز</SelectItem>
                        <SelectItem value="mashhad">مشهد</SelectItem>
                        <SelectItem value="tabriz">تبریز</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={businessTypeFilter}
                      onValueChange={setBusinessTypeFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="نوع کسب‌وکار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه اصناف</SelectItem>
                        {currentService.businessTypes.map((businessType) => (
                          <SelectItem key={businessType} value={businessType}>
                            {businessType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}

                {/* Product Filters */}
                {activeTab === "products" && (
                  <>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="دسته‌بندی محصول" />
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
                    <Select
                      value={supplierLocationFilter}
                      onValueChange={setSupplierLocationFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="موقعیت تامین‌کننده" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه موقعیت‌ها</SelectItem>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="isfahan">اصفهان</SelectItem>
                        <SelectItem value="shiraz">شیراز</SelectItem>
                        <SelectItem value="mashhad">مشهد</SelectItem>
                        <SelectItem value="tabriz">تبریز</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}

                {/* Buying Requests Filters */}
                {activeTab === "buying-requests" && (
                  <>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="دسته‌بندی کالا" />
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
                    <Select>
                      <SelectTrigger className="h-10 md:h-12">
                        <SelectValue placeholder="مرتب‌سازی" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">جدیدترین</SelectItem>
                        <SelectItem value="urgent">فوری</SelectItem>
                        <SelectItem value="budget-high">بودجه بالا</SelectItem>
                        <SelectItem value="budget-low">بودجه پایین</SelectItem>
                        <SelectItem value="deadline">
                          نزدیک‌ترین مهلت
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}

                <Button className="h-10 md:h-12 bg-orange-600 hover:bg-orange-700">
                  <Filter className="w-4 h-4 ml-2" />
                  اعمال فیلتر
                </Button>
              </div>
            </div>

            {/* Suppliers Tab */}
            <TabsContent value="suppliers" className="p-4 md:p-6">
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
                            <h3 className="font-bold text-lg">
                              {supplier.name}
                            </h3>
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
            <TabsContent value="retailers" className="p-4 md:p-6">
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
                            <h3 className="font-bold text-lg">
                              {retailer.name}
                            </h3>
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
            <TabsContent value="products" className="p-4 md:p-6">
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

            {/* Buying Requests Tab */}
            <TabsContent value="buying-requests" className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">درخواست‌های خرید فعال</h3>
                <Dialog
                  open={isNewBuyingRequestModalOpen}
                  onOpenChange={setIsNewBuyingRequestModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="w-4 h-4 ml-2" />
                      درخواست جدید
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl" dir="rtl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-green-500" />
                        ثبت درخواست خرید جدید
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          عنوان درخواست
                        </label>
                        <Input
                          placeholder="عنوان درخواست خود را وارد کنید"
                          value={newBuyingRequest.title}
                          onChange={(e) =>
                            setNewBuyingRequest({
                              ...newBuyingRequest,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            دسته‌بندی
                          </label>
                          <Select
                            value={newBuyingRequest.category}
                            onValueChange={(value) =>
                              setNewBuyingRequest({
                                ...newBuyingRequest,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب دسته‌بندی" />
                            </SelectTrigger>
                            <SelectContent>
                              {currentService.categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            تعداد مورد نیاز
                          </label>
                          <Input
                            placeholder="تعداد"
                            value={newBuyingRequest.quantity}
                            onChange={(e) =>
                              setNewBuyingRequest({
                                ...newBuyingRequest,
                                quantity: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            بودجه (تومان)
                          </label>
                          <Input
                            placeholder="بودجه مورد نظر"
                            value={newBuyingRequest.budget}
                            onChange={(e) =>
                              setNewBuyingRequest({
                                ...newBuyingRequest,
                                budget: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            مهلت تحویل
                          </label>
                          <Input
                            type="date"
                            value={newBuyingRequest.deadline}
                            onChange={(e) =>
                              setNewBuyingRequest({
                                ...newBuyingRequest,
                                deadline: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          توضیحات تکمیلی
                        </label>
                        <Textarea
                          placeholder="توضیحات کاملی از نیاز خود ارائه دهید..."
                          rows={4}
                          value={newBuyingRequest.description}
                          onChange={(e) =>
                            setNewBuyingRequest({
                              ...newBuyingRequest,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={handleNewBuyingRequestSubmit}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          ثبت درخواست
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsNewBuyingRequestModalOpen(false)}
                          className="flex-1"
                        >
                          انصراف
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {buyingRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="hover:shadow-lg transition-shadow bg-white"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg line-clamp-1">
                              {request.title}
                            </h3>
                            {request.urgent && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                <AlertCircle className="w-3 h-3 ml-1" />
                                فوری
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs mb-3">
                            {request.category}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {request.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">تعداد:</span>
                          <span className="font-semibold">
                            {formatNumber(request.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">بودجه:</span>
                          <span className="font-semibold text-green-600">
                            {formatNumber(request.budget)} تومان
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-600">مهلت:</span>
                          <span className="font-semibold">
                            {request.deadline}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600">موقعیت:</span>
                          <span className="font-semibold">
                            {request.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                            <span>{request.requesterRating}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MessageCircle className="w-4 h-4 ml-1" />
                            <span>{request.responses} پاسخ</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 ml-1" />
                            <span>{request.postedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm">
                          ارسال پیشنهاد
                        </Button>
                        <Button variant="outline" className="flex-1 text-sm">
                          مشاهده جزئیات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Advertisement Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              تامین‌کنندگان معتبر {currentService.name.replace("پخش ", "")}
            </h3>
            <Badge className="bg-orange-100 text-orange-800">
              تبلیغات ویژه
            </Badge>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {advertisements
                .filter((ad) =>
                  currentService.id === "jewelry"
                    ? ["طلا", "نقره"].includes(ad.category)
                    : ad.category === "آرایشی",
                )
                .map((ad) => (
                  <CarouselItem
                    key={ad.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h4 className="font-bold text-lg mb-1">{ad.title}</h4>
                          <p className="text-sm opacity-90 line-clamp-2">
                            {ad.description}
                          </p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900">
                            {ad.company}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {ad.category}
                          </Badge>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          مشاهده محصولات
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

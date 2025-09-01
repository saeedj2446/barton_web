import React, { useState } from "react";
import {
  Search,
  Globe,
  ChevronDown,
  Menu,
  User,
  ShoppingCart,
  Bell,
  Package,
  Shield,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface Location {
  id: string;
  name: string;
  type: "city" | "province" | "country" | "continent" | "global";
  parentId?: string;
}

interface HeroSectionProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
  selectedLocation?: Location;
  onLocationChange?: (location: Location) => void;
}

const HeroSection = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
  onLanguageChange = () => {},
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
  onLocationChange = () => {},
}: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Location data for Iran and UAE
  const locationData = {
    countries: [
      { id: "iran", name: "ایران", type: "country" as const },
      { id: "uae", name: "امارات متحده عربی", type: "country" as const },
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
      dubai: [
        {
          id: "dubai-city",
          name: "دبی",
          type: "city" as const,
          parentId: "dubai",
        },
        {
          id: "sharjah",
          name: "شارجه",
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
        {
          id: "alain",
          name: "العین",
          type: "city" as const,
          parentId: "abudhabi",
        },
      ],
    },
  };

  const getAllLocations = () => {
    const locations = [
      { id: "global", name: "جهانی", type: "global" as const },
      ...locationData.countries,
    ];

    locationData.countries.forEach((country) => {
      const provinces = locationData.provinces[country.id] || [];
      locations.push(...provinces);

      provinces.forEach((province) => {
        const cities = locationData.cities[province.id] || [];
        locations.push(...cities);
      });
    });

    return locations;
  };

  const handleLocationSelect = (location: Location) => {
    onLocationChange(location);
  };

  const languages: Language[] = [
    { name: "English", code: "en", direction: "ltr" },
    { name: "فارسی", code: "fa", direction: "rtl" },
    { name: "العربية", code: "ar", direction: "rtl" },
  ];

  const translations = {
    en: {
      connect: "Leading wholesale marketplace",
      tagline: "Learn about Barton",
      discover:
        "Discover thousands of verified suppliers and buyers in your industry",
      searchPlaceholder: "What are you looking for...",
      search: "Search",
      postSelling: "Post Selling Ad",
      postBuying: "Post Buying Request",
      categories: "All categories",
      suppliers: "Featured selections",
      buyers: "Order protection",
      about: "Buyer Central",
      signIn: "Sign In",
      joinFree: "Join free",
      help: "Help Center",
      appDownload: "App & mobile",
      becomeSupplier: "Become a supplier",
      frequentlySearched: "Frequently searched:",
      searchSuggestions: [
        "Browse 50 per item",
        "Mobiles",
        "watches",
        "electric bike",
      ],
      feature1: {
        title: "Access dozens of purchase requests",
        items: [
          "Quick search for nearby requests",
          "Compare similar offers easily",
          "Filter by location and needs",
        ],
      },
      feature2: {
        title: "Local to international wholesalers",
        items: [
          "Trade within city, province, or country",
          "Connect with local and global suppliers",
          "Manage orders globally",
        ],
      },
      feature3: {
        title: "Secure and verified transactions",
        items: [
          "Supplier verification",
          "Payment protection until delivery",
          "Feedback system for trust",
        ],
      },
      feature4: {
        title: "One-stop trading platform",
        items: [
          "Search and order directly",
          "Track orders and deliveries",
          "Manage payments and invoices",
        ],
      },
    },
    fa: {
      connect: "بارتون، پلتفرم خرید و فروش عمده",
      discover: "بازار خرید و فروش محلی تا بین المللی",
      tagline: "درباره بارتون بیاموزید",
      searchPlaceholder: "دنبال چه چیزی هستید...",
      search: "جستجو",
      postSelling: "ثبت آگهی فروش",
      postBuying: "ثبت درخواست خرید",
      categories: "همه دسته‌بندی‌ها",
      suppliers: "فروشندگان",
      buyers: "خریداران",
      about: "درباره ما",
      signIn: "ورود",
      joinFree: "ثبت نام",
      help: "مرکز راهنمایی",
      appDownload: "اپ و موبایل",
      becomeSupplier: "تامین‌کننده شوید",
      frequentlySearched: "جستجوهای پرتکرار:",
      searchSuggestions: ["مرور 50 آیتم", "موبایل", "ساعت", "دوچرخه برقی"],
      feature1: {
        title: "دسترسی به هزاران درخواست خرید",
        items: [
          "یافتن سریع درخواست‌ها در صنف شما",
          "مقایسه آسان پیشنهادهای مشابه",
          "فیلتر بر اساس نیاز کسب‌وکار",
        ],
      },
      feature2: {
        title: "قابل تطبیق با کسب‌وکار و مکان شما",
        items: [
          "از عمده فروشان محلی تا شرکتهای صادراتی",
          "منطبق با نیاز خرده فروشان ، خدماتی ها و ..",
          "خرید محلی، شهری، استانی، ملی یا بین‌المللی",
        ],
      },
      feature3: {
        title: "امنیت پرداخت تا تحویل",
        items: [
          "تایید اصالت تامین کنندگان معتبر",
          "امنیت کامل پرداخت‌ها تا تحویل جنس",
          "اعتماد بیشتر با سیستم بازخورد مشتری",
        ],
      },
      feature4: {
        title: "ارتباط عمده فروشان با خرده فروشان",
        items: [
          "دسترسی به خرده‌فروش در شهر و صنف خودتان",
          "ارتباط مستقیم خرده فروشان با تامین‌کنندگان محلی",
          "پیگیری آسان سفارشات و موجودی عمده فروشان",
        ],
      },
    },
    ar: {
      connect: "السوق الرائد للبيع والشراء بالجملة",
      tagline: "تعرف على بارتون",
      discover: "منصة البيع والشراء المحلية والدولية",
      searchPlaceholder: "ما الذي تبحث عنه...",
      search: "بحث",
      postSelling: "نشر إعلان بيع",
      postBuying: "نشر طلب شراء",
      categories: "جميع الفئات",
      suppliers: "اختيارات مميزة",
      buyers: "حماية المشتري",
      about: "مركز المشتري",
      signIn: "تسجيل الدخول",
      joinFree: "انضم مجاناً",
      help: "مركز المساعدة",
      appDownload: "التطبيق والجوال",
      becomeSupplier: "كن مورداً",
      frequentlySearched: "البحث المتكرر:",
      searchSuggestions: [
        "تصفح 50 عنصر",
        "الهواتف",
        "الساعات",
        "الدراجة الكهربائية",
      ],
      feature1: {
        title: "الوصول إلى عشرات طلبات الشراء",
        items: [
          "بحث سريع عن الطلبات القريبة",
          "مقارنة العروض المماثلة بسهولة",
          "تصفية حسب الموقع والاحتياجات",
        ],
      },
      feature2: {
        title: "للبائعين المحليين والدوليين",
        items: [
          "تجارة داخل المدينة أو المحافظة أو الدولة",
          "الاتصال بالموردين المحليين والعالميين",
          "إدارة الطلبات عالميًا",
        ],
      },
      feature3: {
        title: "معاملات آمنة وموثوقة",
        items: [
          "التحقق من الموردين",
          "حماية الدفع حتى التسليم",
          "نظام التقييم والثقة",
        ],
      },
      feature4: {
        title: "منصة تجارة متكاملة",
        items: [
          "البحث والطلب مباشرة",
          "متابعة الطلبات والتسليم",
          "إدارة المدفوعات والفواتير",
        ],
      },
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
  };

  return (
    <div
      className={`w-full ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Top Navigation Bar */}
      <div className="bg-gray-600 text-white text-sm">
        <div className="container mx-auto px-1 py-3">
          <div
            className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"}`}
            >
              <a href="#" className="hover:text-orange-400 transition">
                پیامها
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.suppliers}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.buyers}
              </a>
            </div>
            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center transition hover:text-orange-400
                 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-40
                 rounded-md px-3 py-1"
                  >
                    <Globe
                      className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "ml-1" : "mr-1"}`}
                    />
                    {currentLanguage.name}
                    <ChevronDown
                      className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "mr-1" : "ml-1"}`}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 md:px-4 py-2 md:py-4">
          <div
            className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
          >
            {/* Right Side Actions - Hidden on mobile */}
            <header className="w-full bg-white">
              <div className="w-full bg-white flex  justify-between px-2 ">
                {/* لوگو و اسم برند */}
                <Link href="/" className="flex items-center gap-2">
                  <Package className="w-8 h-8 text-orange-500" />
                  <div className="flex flex-col">
                    <h1 className="text-lg md:text-xl font-bold text-orange-500">
                      Barton
                    </h1>
                    {/* <span className="text-xs md:text-sm text-orange-400">{t.tagline}</span>*/}
                  </div>
                </Link>

                {/* دکمه‌ها و آیکون‌ها */}
                <div
                  className={`hidden md:flex items-center ${
                    currentLanguage.direction === "rtl"
                      ? "space-x-reverse space-x-4"
                      : "space-x-4"
                  }`}
                >
                  {/*<Link href="/user-panel">
                      <Button
                          variant="ghost"
                          className="text-gray-700 hover:text-orange-500"
                      >
                        <User className="w-5 h-5"/>
                      </Button>
                    </Link>*/}
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-orange-500"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      {t.signIn}
                    </Button>
                  </Link>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    {t.joinFree}
                  </Button>
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-2 pb-2">
          {/*<form onSubmit={handleSearch}>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${currentLanguage.direction === "rtl" ? "pr-4 pl-12" : "pl-4 pr-12"} h-10 text-sm border-2 border-orange-500 focus:border-orange-600 rounded-l-md`}
                  />
                  <Search
                      className={`absolute ${currentLanguage.direction === "rtl" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
                  />
                </div>
                <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 h-10 rounded-r-md rounded-l-none text-sm"
                >
                  {t.search}
                </Button>
              </div>
            </form>*/}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0  bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 container mx-auto px-2 md:px-4 py-8 md:py-16 flex flex-col items-center">
          {/* CTA Buttons + متن بالایی */}
          <div className="text-center px-4 md:px-0 w-full max-w-5xl mx-auto">
            {/* عنوان */}
            <h1 className="text-[16px] md:text-[23px] font-bold mb-3 md:mb-4 leading-tight">
              {t.connect}
            </h1>

            {/* توضیح */}
            <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6">
              {t.discover}
            </p>

            {/* نوار جستجو */}
            <div className="flex justify-center max-w-2xl mx-auto my-10 w-full">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex flex-col md:flex-row gap-2 md:gap-1">
                  {/* Location selector and search box */}
                  <div className="relative flex-1 flex gap-2">
                    {/* Location Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-4 h-12 bg-white border border-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {selectedLocation.name}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {getAllLocations().map((location) => (
                          <DropdownMenuItem
                            key={location.id}
                            onClick={() => handleLocationSelect(location)}
                            className={
                              selectedLocation.id === location.id
                                ? "bg-orange-50"
                                : ""
                            }
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{location.name}</span>
                              {location.type !== "global" && (
                                <span className="text-xs text-gray-400">
                                  ({location.type})
                                </span>
                              )}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Search Box */}
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`${
                          currentLanguage.direction === "rtl"
                            ? "pr-4 pl-12"
                            : "pl-4 pr-12"
                        } h-12 text-base text-orange-500 bg-white border-1 border-orange-500 focus:border-orange-600 rounded-md w-full`}
                      />

                      <Search
                        className={`absolute ${
                          currentLanguage.direction === "rtl"
                            ? "left-3"
                            : "right-3"
                        } top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                      />
                    </div>
                  </div>

                  {/* دکمه جستجو */}
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-md w-full md:w-auto"
                  >
                    {t.search}
                  </Button>
                </div>
              </form>
            </div>

            {/* دکمه‌های عملیات */}
            <div
              className={`flex flex-col md:flex-row gap-3 md:gap-4 justify-center w-full max-w-md mx-auto ${
                currentLanguage.direction === "rtl" ? "md:flex-row-reverse" : ""
              }`}
            >
              <Button className="flex-1 bg-green-500 hover:bg-orange-600 text-white py-3 md:py-6 text-sm md:text-base">
                {t.postBuying}
              </Button>
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 md:py-6 text-sm md:text-base">
                {t.postSelling}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/*<div className="bg-orange-600 text-white py-8 md:py-12">
          <div className="container mx-auto px-2 md:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">

               عنوان ۱
              <div className="p-1">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 md:w-8 md:h-8 mb-2"/>
                </div>
                <h3 className="text-base md:text-sm font-semibold mb-1">
                  {t.feature1.title}
                </h3>
                <ul className="text-orange-100 text-xs md:text-sm list-disc list-inside ">
                  {t.feature1.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

               عنوان ۲
              <div className="p-1">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 mb-2"/>
                </div>
                <h3 className="text-base md:text-sm font-semibold mb-1">
                  {t.feature2.title}
                </h3>
                <ul className="text-orange-100 text-xs md:text-sm list-disc list-inside">
                  {t.feature2.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

               عنوان ۳
              <div className="p-1">
                <div className="flex items-center justify-center mb-2">
                  <Search className="w-6 h-6 md:w-8 md:h-8 mb-2"/>
                </div>
                <h3 className="text-base md:text-sm font-semibold mb-1">
                  {t.feature3.title}
                </h3>
                <ul className="text-orange-100 text-xs md:text-sm list-disc list-inside">
                {t.feature3.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

               عنوان ۴
              <div className="p-1">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-6 h-6 md:w-8 md:h-8 mb-2"/>
                </div>
                <h3 className="text-base md:text-sm font-semibold mb-1">
                  {t.feature4.title}
                </h3>
                <ul className="text-orange-100 text-xs md:text-sm list-disc list-inside">
                  {t.feature4.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>*/}

      {/* Mobile Navigation Footer */}
      <div className="md:hidden mobile-nav-footer">
        <div className="grid grid-cols-5 h-16">
          <a href="/" className="mobile-nav-item active">
            <Package className="w-5 h-5 mb-1" />
            <span>خانه</span>
          </a>
          <a href="/products" className="mobile-nav-item">
            <Search className="w-5 h-5 mb-1" />
            <span>محصولات</span>
          </a>
          <a href="/buying-requests" className="mobile-nav-item">
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span>درخواست‌ها</span>
          </a>
          <a href="/user-panel" className="mobile-nav-item">
            <User className="w-5 h-5 mb-1" />
            <span>پروفایل</span>
          </a>
          <a href="#" className="mobile-nav-item">
            <Menu className="w-5 h-5 mb-1" />
            <span>منو</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

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

interface HeroSectionProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

const HeroSection = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
  onLanguageChange = () => {},
}: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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
    },
    fa: {
      connect: "بازار پیشرو خرید و فروش عمده",
      tagline: "درباره بارتون بیاموزید",
      discover: "پلتفرم خرید و فروش محلی تا بین المللی",
      searchPlaceholder: "دنبال چه چیزی هستید...",
      search: "جستجو",
      postSelling: "ثبت آگهی فروش",
      postBuying: "ثبت درخواست خرید",
      categories: "همه دسته‌بندی‌ها",
      suppliers: "انتخاب‌های ویژه",
      buyers: "حمایت از خرید",
      about: "مرکز خریدار",
      signIn: "ورود",
      joinFree: "عضویت رایگان",
      help: "مرکز راهنمایی",
      appDownload: "اپ و موبایل",
      becomeSupplier: "تامین‌کننده شوید",
      frequentlySearched: "جستجوهای پرتکرار:",
      searchSuggestions: ["مرور 50 آیتم", "موبایل", "ساعت", "دوچرخه برقی"],
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
      <div className="bg-gray-800 text-white text-sm">
        <div className="container mx-auto px-4 py-2">
          <div
            className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"}`}
            >
              <a href="#" className="hover:text-orange-400 transition">
                {t.categories}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.suppliers}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.buyers}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.about}
              </a>
            </div>
            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              <a href="#" className="hover:text-orange-400 transition">
                {t.help}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.appDownload}
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                {t.becomeSupplier}
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center hover:text-orange-400 transition">
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
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-orange-500">
                بارتون
              </h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${currentLanguage.direction === "rtl" ? "pr-4 pl-12" : "pl-4 pr-12"} h-12 text-base border-2 border-orange-500 focus:border-orange-600 rounded-l-md`}
                    />
                    <Search
                      className={`absolute ${currentLanguage.direction === "rtl" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-r-md rounded-l-none"
                  >
                    {t.search}
                  </Button>
                </div>
              </form>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-orange-500"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Right Side Actions - Hidden on mobile */}
            <div
              className={`hidden md:flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              <Link href="/user-panel">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-orange-500"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
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
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-2 pb-2">
          <form onSubmit={handleSearch}>
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
          </form>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 container mx-auto px-2 md:px-4 py-8 md:py-16">
          <div className="max-w-2xl">
            <div className="mb-3 md:mb-4">
              <span className="inline-flex items-center text-orange-400 text-xs md:text-sm font-medium">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                {t.tagline}
              </span>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
              {t.connect}
            </h1>
            <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6">
              {t.discover}
            </p>

            {/* Search Suggestions - Hidden on mobile */}
            <div className="hidden md:block mb-8">
              <p className="text-gray-300 mb-3">{t.frequentlySearched}</p>
              <div
                className={`flex flex-wrap gap-2 ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
              >
                {t.searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col md:flex-row gap-3 md:gap-4 ${currentLanguage.direction === "rtl" ? "md:flex-row-reverse" : ""}`}
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base">
                {t.postSelling}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                {t.postBuying}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-2 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Package className="w-6 h-6 md:w-8 md:h-8 mb-2" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Millions of business offerings
              </h3>
              <p className="text-orange-100 text-xs md:text-sm">
                Explore products and suppliers for your business from millions
                of offerings worldwide.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 md:w-8 md:h-8 mb-2" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Assured quality and transactions
              </h3>
              <p className="text-orange-100 text-xs md:text-sm">
                Ensure product quality from verified suppliers, with your orders
                protected from payment to delivery.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Search className="w-6 h-6 md:w-8 md:h-8 mb-2" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1">
                One-stop trading solution
              </h3>
              <p className="text-orange-100 text-xs md:text-sm">
                Order seamlessly from product/supplier search to order
                management and payment to delivery.
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center mb-2">
                <User className="w-6 h-6 md:w-8 md:h-8 mb-2" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Tailored trading experience
              </h3>
              <p className="text-orange-100 text-xs md:text-sm">
                Get curated benefits, such as exclusive discounts, enhanced
                protection, and extra support.
              </p>
            </div>
          </div>
        </div>
      </div>

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

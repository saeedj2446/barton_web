"use client";

import React, { useState } from "react";
import {
  Home,
  Grid3X3,
  User,
  ShoppingCart,
  Search,
  Package,
  TrendingUp,
  Shield,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Users,
  Building,
  Globe,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const languages: Language[] = [
    { name: "فارسی", code: "fa", direction: "rtl" },
    { name: "English", code: "en", direction: "ltr" },
    { name: "العربية", code: "ar", direction: "rtl" },
  ];

  const translations = {
    fa: {
      // Header
      categories: "دسته ها",
      suppliers: "تامین‌کنندگان",
      buyers: "خریداران",
      about: "درباره ما",
      signIn: "ورود",
      register: "ثبت‌نام",
      myPanel: "پنل من",

      // Hero Section
      heroTitle: "بارتون",
      heroSubtitle: "شبکه عمده‌فروشی جهانی و محلی",
      heroDescription:
        "بهترین پلتفرم برای ارتباط با تامین‌کنندگان و خریداران معتبر در سراسر جهان",
      searchPlaceholder: "جستجوی محصولات، تامین‌کنندگان یا دسته‌بندی‌ها...",
      search: "جستجو",

      // Categories
      categoriesTitle: "دسته‌بندی‌های محبوب",
      electronics: "الکترونیک",
      textiles: "نساجی",
      homeGarden: "خانه و باغ",
      beauty: "زیبایی و سلامت",
      automotive: "خودرو",
      food: "مواد غذایی",

      // Recent Requests
      recentRequestsTitle: "درخواست‌های خرید اخیر",
      recentSellersTitle: "فروشندگان برتر",
      viewAll: "مشاهده همه",
      submitOffer: "ارسال پیشنهاد",
      viewProfile: "مشاهده پروفایل",
      contact: "تماس",

      // Benefits
      benefitsTitle: "چرا بارتون؟",
      verifiedSuppliers: "تامین‌کنندگان تایید شده",
      secureTransactions: "تراکنش‌های امن",
      globalNetwork: "شبکه جهانی",
      support247: "پشتیبانی ۲۴/۷",

      // CTA
      ctaTitle: "آماده شروع هستید؟",
      ctaDescription: "همین امروز به شبکه جهانی بارتون بپیوندید",
      postSelling: "ثبت آگهی فروش",
      postBuying: "ثبت درخواست خرید",

      // Footer
      quickLinks: "لینک‌های سریع",
      forBusinesses: "برای کسب‌وکارها",
      connectWithUs: "ارتباط با ما",
      newsletter: "خبرنامه",
      subscribe: "عضویت",
      emailPlaceholder: "ایمیل شما",

      // Bottom Navigation
      home: "خانه",
      buyingRequests: "درخواست‌ها",
      userPanel: "پنل",

      // Stats
      suppliersCount: "۱۰,۰۰۰+",
      buyersCount: "۲۵,۰۰۰+",
      transactionsCount: "۵۰۰ میلیون دلار+",
      countriesCount: "۱۵۰+",

      // Time
      daysAgo: "روز پیش",
      urgent: "فوری",
    },
    en: {
      // Header
      categories: "Categories",
      suppliers: "Suppliers",
      buyers: "Buyers",
      about: "About",
      signIn: "Sign In",
      register: "Register",
      myPanel: "My Panel",

      // Hero Section
      heroTitle: "Barton",
      heroSubtitle: "The Global & Local Wholesale Network",
      heroDescription:
        "The best platform to connect with verified suppliers and buyers worldwide",
      searchPlaceholder: "Search products, suppliers, or categories...",
      search: "Search",

      // Categories
      categoriesTitle: "Popular Categories",
      electronics: "Electronics",
      textiles: "Textiles",
      homeGarden: "Home & Garden",
      beauty: "Beauty & Health",
      automotive: "Automotive",
      food: "Food & Beverage",

      // Recent Requests
      recentRequestsTitle: "Recent Buying Requests",
      recentSellersTitle: "Top Sellers",
      viewAll: "View All",
      submitOffer: "Submit Offer",
      viewProfile: "View Profile",
      contact: "Contact",

      // Benefits
      benefitsTitle: "Why Barton?",
      verifiedSuppliers: "Verified Suppliers",
      secureTransactions: "Secure Transactions",
      globalNetwork: "Global Network",
      support247: "24/7 Support",

      // CTA
      ctaTitle: "Ready to Get Started?",
      ctaDescription: "Join Barton's global network today",
      postSelling: "Post Selling Ad",
      postBuying: "Post Buying Request",

      // Footer
      quickLinks: "Quick Links",
      forBusinesses: "For Businesses",
      connectWithUs: "Connect With Us",
      newsletter: "Newsletter",
      subscribe: "Subscribe",
      emailPlaceholder: "Your email",

      // Bottom Navigation
      home: "Home",
      buyingRequests: "Buying Requests",
      userPanel: "User Panel",

      // Stats
      suppliersCount: "10,000+",
      buyersCount: "25,000+",
      transactionsCount: "$500M+",
      countriesCount: "150+",

      // Time
      daysAgo: "days ago",
      urgent: "Urgent",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.fa;
  const isRTL = currentLanguage.direction === "rtl";

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Mock data
  const categories = [
    {
      id: "1",
      name: t.electronics,
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
      count: 1240,
    },
    {
      id: "2",
      name: t.textiles,
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
      count: 890,
    },
    {
      id: "3",
      name: t.homeGarden,
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80",
      count: 750,
    },
    {
      id: "4",
      name: t.beauty,
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
      count: 680,
    },
    {
      id: "5",
      name: t.automotive,
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
      count: 520,
    },
    {
      id: "6",
      name: t.food,
      image:
        "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=400&q=80",
      count: 430,
    },
  ];

  const recentRequests = [
    {
      id: 1,
      title:
        currentLanguage.code === "fa"
          ? "پنل‌های نمایشگر LED با کیفیت بالا"
          : "High-Quality LED Display Panels",
      budget:
        currentLanguage.code === "fa"
          ? "۵۰,۰۰۰ - ۷۵,۰۰۰ دلار"
          : "$50,000 - $75,000",
      location: currentLanguage.code === "fa" ? "تهران" : "Tehran",
      postedDays: 2,
      urgent: true,
    },
    {
      id: 2,
      title:
        currentLanguage.code === "fa"
          ? "رول‌های پارچه پنبه ارگانیک"
          : "Organic Cotton Fabric Rolls",
      budget:
        currentLanguage.code === "fa"
          ? "۱۵,۰۰۰ - ۲۰,۰۰۰ دلار"
          : "$15,000 - $20,000",
      location: currentLanguage.code === "fa" ? "اصفهان" : "Isfahan",
      postedDays: 1,
      urgent: false,
    },
    {
      id: 3,
      title:
        currentLanguage.code === "fa"
          ? "دانه‌های قهوه درجه یک"
          : "Premium Coffee Beans",
      budget:
        currentLanguage.code === "fa"
          ? "۸,۰۰۰ - ۱۲,۰۰۰ دلار"
          : "$8,000 - $12,000",
      location: currentLanguage.code === "fa" ? "شیراز" : "Shiraz",
      postedDays: 1,
      urgent: true,
    },
  ];

  const topSellers = [
    {
      id: 1,
      name:
        currentLanguage.code === "fa"
          ? "شرکت تجارت الکترونیک پارس"
          : "Pars Electronics Trading",
      location: currentLanguage.code === "fa" ? "تهران، ایران" : "Tehran, Iran",
      rating: 4.9,
      orders: 2500,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller1",
    },
    {
      id: 2,
      name:
        currentLanguage.code === "fa"
          ? "کارخانه نساجی کویر"
          : "Kavir Textile Factory",
      location:
        currentLanguage.code === "fa" ? "اصفهان، ایران" : "Isfahan, Iran",
      rating: 4.8,
      orders: 1800,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller2",
    },
    {
      id: 3,
      name:
        currentLanguage.code === "fa"
          ? "صنایع غذایی زرین"
          : "Zarin Food Industries",
      location: currentLanguage.code === "fa" ? "شیراز، ایران" : "Shiraz, Iran",
      rating: 4.7,
      orders: 1200,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller3",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex items-center ${isRTL ? "space-x-reverse space-x-8" : "space-x-8"}`}
            >
              <Link href="/" className="text-2xl font-bold text-orange-600">
                {t.heroTitle}
              </Link>
              <nav
                className={`hidden md:flex ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"}`}
              >
                <Link
                  href="#categories"
                  className="text-gray-700 hover:text-orange-600 transition"
                >
                  {t.categories}
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition"
                >
                  {t.suppliers}
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition"
                >
                  {t.buyers}
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition"
                >
                  {t.about}
                </Link>
              </nav>
            </div>
            <div
              className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-orange-600"
                  >
                    <Globe className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {currentLanguage.name}
                    <ChevronDown
                      className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/user-panel">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-orange-600"
                >
                  {t.myPanel}
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  {t.signIn}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.heroSubtitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? "pr-10" : "pl-10"} py-3 text-lg bg-white text-gray-900 border-0 focus:ring-2 focus:ring-orange-300`}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                {t.search}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t.categoriesTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
              >
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium text-gray-800 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count.toLocaleString()}{" "}
                    {currentLanguage.code === "fa" ? "محصول" : "products"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Requests Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between mb-12 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {t.recentRequestsTitle}
            </h2>
            <Link href="/buying-requests">
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              >
                {t.viewAll}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.map((request) => (
              <Card
                key={request.id}
                className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
              >
                <CardContent className="p-6">
                  <div
                    className={`flex items-start justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <h3 className="font-bold text-lg text-gray-900 flex-1 line-clamp-2">
                      {request.title}
                    </h3>
                    {request.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {t.urgent}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div
                      className={`flex items-center text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <DollarSign
                        className={`w-4 h-4 text-green-600 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      <span>{request.budget}</span>
                    </div>
                    <div
                      className={`flex items-center text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <MapPin
                        className={`w-4 h-4 text-red-600 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      <span>{request.location}</span>
                    </div>
                    <div
                      className={`flex items-center text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Clock
                        className={`w-4 h-4 text-gray-500 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      <span>
                        {request.postedDays} {t.daysAgo}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    {t.submitOffer}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between mb-12 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {t.recentSellersTitle}
            </h2>
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              {t.viewAll}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSellers.map((seller) => (
              <Card
                key={seller.id}
                className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-16 h-16 rounded-full mx-auto bg-gray-100"
                    />
                    <div className="absolute -top-1 -right-1 bg-orange-600 rounded-full p-1">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {seller.name}
                  </h3>
                  <div
                    className={`flex items-center justify-center text-gray-600 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <MapPin className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    <span className="text-sm">{seller.location}</span>
                  </div>
                  <div
                    className={`flex items-center justify-center mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span
                      className={`font-semibold ${isRTL ? "mr-1" : "ml-1"}`}
                    >
                      {seller.rating}
                    </span>
                    <span
                      className={`text-sm text-gray-600 ${isRTL ? "mr-2" : "ml-2"}`}
                    >
                      ({seller.orders.toLocaleString()}{" "}
                      {currentLanguage.code === "fa" ? "سفارش" : "orders"})
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      {t.viewProfile}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      {t.contact}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t.verifiedSuppliers}
              </h3>
              <p className="text-gray-600">{t.suppliersCount}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t.secureTransactions}
              </h3>
              <p className="text-gray-600">{t.buyersCount}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t.globalNetwork}
              </h3>
              <p className="text-gray-600">{t.countriesCount}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t.support247}
              </h3>
              <p className="text-gray-600">{t.transactionsCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 text-orange-100">{t.ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              {t.postSelling}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3"
            >
              {t.postBuying}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Desktop */}
      <footer className="bg-gray-900 text-white py-12 hidden md:block">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isRTL ? "text-right" : "text-left"}`}
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">
                {t.heroTitle}
              </h3>
              <p className="text-gray-300">
                {currentLanguage.code === "fa"
                  ? "پلتفرم پیشرو برای ارتباط کسب‌وکارها با تامین‌کنندگان و خریداران در سراسر جهان"
                  : "Leading platform connecting businesses with suppliers and buyers worldwide"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.categories}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.suppliers}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.buyers}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.forBusinesses}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.postSelling}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.postBuying}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user-panel"
                    className="text-gray-300 hover:text-white transition"
                  >
                    {t.myPanel}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.newsletter}</h4>
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""}`}>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className={`px-3 py-2 bg-gray-800 text-white ${isRTL ? "rounded-r-md" : "rounded-l-md"} focus:outline-none focus:ring-1 focus:ring-orange-500 flex-1`}
                />
                <button
                  className={`bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 ${isRTL ? "rounded-l-md" : "rounded-r-md"} transition`}
                >
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} {t.heroTitle}.
              {currentLanguage.code === "fa"
                ? " تمامی حقوق محفوظ است."
                : " All rights reserved."}
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-4 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-orange-600"
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{t.home}</span>
          </Link>
          <Link
            href="#categories"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-orange-600"
          >
            <Grid3X3 className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{t.categories}</span>
          </Link>
          <Link
            href="/buying-requests"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-orange-600"
          >
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{t.buyingRequests}</span>
          </Link>
          <Link
            href="/user-panel"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-orange-600"
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{t.userPanel}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile padding for bottom nav */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}

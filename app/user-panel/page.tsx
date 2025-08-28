"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Building2,
  ChevronDown,
  Plus,
  ShoppingCart,
  Package,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  Globe,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface Profile {
  id: string;
  name: string;
  type: "personal" | "business";
  avatar: string;
  stats: {
    purchases: number;
    sales: number;
    ads: number;
    products: number;
    orders: number;
  };
}

export default function UserPanel() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: Language[] = [
    { name: "English", code: "en", direction: "ltr" },
    { name: "فارسی", code: "fa", direction: "rtl" },
    { name: "العربية", code: "ar", direction: "rtl" },
  ];

  const translations = {
    en: {
      userPanel: "User Panel",
      myProfiles: "My Profiles",
      createProfile: "Create New Profile",
      personalProfile: "Personal Profile",
      businessProfile: "Business Profile",
      dashboard: "Dashboard",
      purchases: "Purchases",
      sales: "Sales",
      ads: "Ads",
      products: "Products",
      orders: "Orders",
      quickActions: "Quick Actions",
      createSellAd: "Create Sell Ad",
      createBuyRequest: "Create Buy Request",
      manageProducts: "Manage Products",
      viewOrders: "View Orders",
      settings: "Settings",
      notifications: "Notifications",
      selectProfile: "Select a profile to view dashboard",
      noProfilesYet: "No profiles created yet",
      createFirstProfile: "Create your first profile to get started",
      totalValue: "Total Value",
      thisMonth: "This Month",
      active: "Active",
      pending: "Pending",
    },
    fa: {
      userPanel: "پنل کاربری",
      myProfiles: "پروفایل‌های من",
      createProfile: "ایجاد پروفایل جدید",
      personalProfile: "پروفایل شخصی",
      businessProfile: "پروفایل کسب‌وکار",
      dashboard: "داشبورد",
      purchases: "خریدها",
      sales: "فروش‌ها",
      ads: "آگهی‌ها",
      products: "کالاها",
      orders: "سفارش‌ها",
      quickActions: "اقدامات سریع",
      createSellAd: "ثبت آگهی فروش",
      createBuyRequest: "ثبت درخواست خرید",
      manageProducts: "مدیریت کالاها",
      viewOrders: "مشاهده سفارش‌ها",
      settings: "تنظیمات",
      notifications: "اعلان‌ها",
      selectProfile: "یک پروفایل انتخاب کنید تا داشبورد را مشاهده کنید",
      noProfilesYet: "هنوز پروفایلی ایجاد نشده",
      createFirstProfile: "اولین پروفایل خود را برای شروع ایجاد کنید",
      totalValue: "ارزش کل",
      thisMonth: "این ماه",
      active: "فعال",
      pending: "در انتظار",
    },
    ar: {
      userPanel: "لوحة المستخدم",
      myProfiles: "ملفاتي الشخصية",
      createProfile: "إنشاء ملف شخصي جديد",
      personalProfile: "الملف الشخصي",
      businessProfile: "ملف الأعمال",
      dashboard: "لوحة التحكم",
      purchases: "المشتريات",
      sales: "المبيعات",
      ads: "الإعلانات",
      products: "المنتجات",
      orders: "الطلبات",
      quickActions: "الإجراءات السريعة",
      createSellAd: "إنشاء إعلان بيع",
      createBuyRequest: "إنشاء طلب شراء",
      manageProducts: "إدارة المنتجات",
      viewOrders: "عرض الطلبات",
      settings: "الإعدادات",
      notifications: "الإشعارات",
      selectProfile: "اختر ملفًا شخصيًا لعرض لوحة التحكم",
      noProfilesYet: "لم يتم إنشاء ملفات شخصية بعد",
      createFirstProfile: "أنشئ ملفك الشخصي الأول للبدء",
      totalValue: "القيمة الإجمالية",
      thisMonth: "هذا الشهر",
      active: "نشط",
      pending: "معلق",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  // Sample profiles data
  const profiles: Profile[] = [
    {
      id: "1",
      name: "احمد محمدی",
      type: "personal",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
      stats: {
        purchases: 12,
        sales: 5,
        ads: 3,
        products: 8,
        orders: 15,
      },
    },
    {
      id: "2",
      name: "فروشگاه پارس",
      type: "business",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pars",
      stats: {
        purchases: 45,
        sales: 120,
        ads: 25,
        products: 150,
        orders: 200,
      },
    },
  ];

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  const StatCard = ({ icon, title, value, subtitle }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
      <CardContent className="p-6">
        <div
          className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ icon, title, description, onClick }: any) => (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md">
      <CardContent className="p-6 text-center">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Barton
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">
                {t.userPanel}
              </h1>
            </div>

            <div
              className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
            >
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="w-4 h-4" />
                    <span
                      className={`${currentLanguage.direction === "rtl" ? "mr-2" : "ml-2"}`}
                    >
                      {currentLanguage.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
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

              {/* Notifications */}
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle
                  className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <User
                    className={`w-5 h-5 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                  />
                  {t.myProfiles}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profiles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">{t.noProfilesYet}</p>
                    <p className="text-sm text-gray-400 mb-4">
                      {t.createFirstProfile}
                    </p>
                  </div>
                ) : (
                  profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedProfile?.id === profile.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => setSelectedProfile(profile)}
                    >
                      <div
                        className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                      >
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div
                          className={`${currentLanguage.direction === "rtl" ? "mr-3" : "ml-3"}`}
                        >
                          <h3 className="font-semibold text-gray-900">
                            {profile.name}
                          </h3>
                          <div
                            className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                          >
                            {profile.type === "business" ? (
                              <Building2 className="w-4 h-4 text-blue-600" />
                            ) : (
                              <User className="w-4 h-4 text-green-600" />
                            )}
                            <span
                              className={`text-sm text-gray-600 ${currentLanguage.direction === "rtl" ? "mr-1" : "ml-1"}`}
                            >
                              {profile.type === "business"
                                ? t.businessProfile
                                : t.personalProfile}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.createProfile}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedProfile ? (
              <div className="space-y-8">
                {/* Profile Dashboard Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProfile.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedProfile.type === "business"
                      ? t.businessProfile
                      : t.personalProfile}{" "}
                    {t.dashboard}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
                    title={t.purchases}
                    value={selectedProfile.stats.purchases}
                    subtitle={`${t.thisMonth}: 3`}
                  />
                  <StatCard
                    icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                    title={t.sales}
                    value={selectedProfile.stats.sales}
                    subtitle={`${t.totalValue}: $12,500`}
                  />
                  <StatCard
                    icon={<FileText className="w-6 h-6 text-purple-600" />}
                    title={t.ads}
                    value={selectedProfile.stats.ads}
                    subtitle={`${t.active}: ${selectedProfile.stats.ads - 1}`}
                  />
                  <StatCard
                    icon={<Package className="w-6 h-6 text-orange-600" />}
                    title={t.products}
                    value={selectedProfile.stats.products}
                    subtitle={`${t.active}: ${selectedProfile.stats.products - 2}`}
                  />
                  <StatCard
                    icon={<FileText className="w-6 h-6 text-red-600" />}
                    title={t.orders}
                    value={selectedProfile.stats.orders}
                    subtitle={`${t.pending}: 3`}
                  />
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t.quickActions}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <QuickActionCard
                      icon={<Plus className="w-6 h-6 text-green-600" />}
                      title={t.createSellAd}
                      description="ثبت آگهی فروش محصولات"
                    />
                    <QuickActionCard
                      icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
                      title={t.createBuyRequest}
                      description="ثبت درخواست خرید کالا"
                    />
                    <QuickActionCard
                      icon={<Package className="w-6 h-6 text-purple-600" />}
                      title={t.manageProducts}
                      description="مدیریت کالاها و موجودی"
                    />
                    <QuickActionCard
                      icon={<FileText className="w-6 h-6 text-orange-600" />}
                      title={t.viewOrders}
                      description="مشاهده و پیگیری سفارش‌ها"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t.selectProfile}
                  </h3>
                  <p className="text-gray-600">
                    {profiles.length === 0
                      ? t.createFirstProfile
                      : "انتخاب کنید تا داشبورد آن پروفایل را مشاهده کنید"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileDashboard from "./components/ProfileDashboard";
import UserPanelHeader from "./components/UserPanelHeader";
import CreateProfilePage from "./components/CreateProfilePage";

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
  const [showCreateProfile, setShowCreateProfile] = useState(false);

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

  const handleCreateProfile = () => {
    setShowCreateProfile(true);
  };

  const handleCloseCreateProfile = () => {
    setShowCreateProfile(false);
  };

  const handleSaveProfile = (profileData: any) => {
    console.log("Profile saved:", profileData);
    // Here you would typically save to your backend
    setShowCreateProfile(false);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <UserPanelHeader
        currentLanguage={currentLanguage}
        languages={languages}
        onLanguageChange={handleLanguageChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        translations={t}
        userName="سعید یوسفی"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar
              profiles={profiles}
              selectedProfile={selectedProfile}
              onProfileSelect={setSelectedProfile}
              onCreateProfile={handleCreateProfile}
              currentLanguage={currentLanguage}
              translations={t}
            />
          </div>

          <div className="lg:col-span-3">
            <ProfileDashboard
              selectedProfile={selectedProfile}
              currentLanguage={currentLanguage}
              translations={t}
            />
          </div>
        </div>
      </div>

      {showCreateProfile && (
        <CreateProfilePage
          onClose={handleCloseCreateProfile}
          onSave={handleSaveProfile}
          currentLanguage={currentLanguage}
          translations={t}
        />
      )}
    </div>
  );
}

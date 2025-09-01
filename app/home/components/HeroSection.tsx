import React, { useState } from "react";
import { Search, Globe, ChevronDown } from "lucide-react";
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
      connect: "Connect with Global",

      discover:
        "Discover thousands of verified suppliers and buyers in your industry",
      searchPlaceholder: "Search products, suppliers, or categories...",
      search: "Search",
      postSelling: "Post Selling Ad",
      postBuying: "Post Buying Request",
      categories: "Categories",
      suppliers: "Suppliers",
      buyers: "Buyers",
      about: "About",
      signIn: "Sign In",
    },
    fa: {
      connect: "بازار عمده فروشی جهانی و محلی",
      discover: "با بارتون به اصناف و مشتریان هدف وصل شوید.",
      searchPlaceholder: "جستجوی محصولات، تامین کنندگان یا دسته بندی ها...",
      search: "جستجو",
      postSelling: "ثبت آگهی فروش",
      postBuying: "ثبت درخواست خرید",
      categories: "دسته بندی ها",
      suppliers: "تامین کنندگان",
      buyers: "خریداران",
      about: "درباره ما",
      signIn: "ورود",
    },
    ar: {
      connect: "تواصل مع شركاء",
      discover: "اكتشف آلاف الموردين والمشترين المعتمدين في صناعتك",
      searchPlaceholder: "البحث عن المنتجات أو الموردين أو الفئات...",
      search: "بحث",
      postSelling: "نشر إعلان بيع",
      postBuying: "نشر طلب شراء",
      categories: "الفئات",
      suppliers: "الموردون",
      buyers: "المشترون",
      about: "حول",
      signIn: "تسجيل الدخول",
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
      className={`relative w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Background overlay with pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
      {/* Header Navigation */}
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div
          className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-8" : "space-x-8"}`}
          >
            <h1 className="text-2xl font-bold">Barton</h1>
            <nav
              className={`hidden md:flex ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"}`}
            >
              <a href="#" className="hover:text-blue-200 transition">
                {t.categories}
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                {t.suppliers}
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                {t.buyers}
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                {t.about}
              </a>
            </nav>
          </div>
          <div
            className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-700"
                >
                  <Globe
                    className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                  />
                  {currentLanguage.name}
                  <ChevronDown
                    className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "mr-2" : "ml-2"}`}
                  />
                </Button>
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
            <Link href="/user-panel">
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                {currentLanguage.code === "fa"
                  ? "پنل من"
                  : currentLanguage.code === "ar"
                    ? "لوحتي"
                    : "My Panel"}
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                {t.signIn}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-3xl font-bold mb-6">{t.connect}</h3>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">{t.discover}</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search
                  className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} py-3 text-lg bg-white text-gray-900 border-0 focus:ring-2 focus:ring-yellow-400`}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3"
              >
                {t.search}
              </Button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg"
            >
              {t.postSelling}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold px-8 py-3 text-lg"
            >
              {t.postBuying}
            </Button>
          </div>
        </div>
      </div>
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden"></div>
    </div>
  );
};

export default HeroSection;

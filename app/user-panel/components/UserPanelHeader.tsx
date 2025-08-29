"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Bell,
  Settings,
  Globe,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface UserPanelHeaderProps {
  currentLanguage: Language;
  languages: Language[];
  onLanguageChange: (language: Language) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  translations: any;
  userName?: string;
}

export default function UserPanelHeader({
  currentLanguage,
  languages,
  onLanguageChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  translations: t,
  userName = "سعید یوسفی",
}: UserPanelHeaderProps) {
  return (
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
              {currentLanguage.code === "fa"
                ? `پنل ${userName}`
                : currentLanguage.code === "ar"
                  ? `لوحة ${userName}`
                  : `${userName} Panel`}
            </h1>
          </div>

          <div
            className={`flex items-center ${currentLanguage.direction === "rtl" ? "space-x-reverse space-x-4" : "space-x-4"}`}
          >
            {/* Back to Home Button */}
            <Link href="/">
              <Button variant="outline" size="sm">
                {currentLanguage.direction === "rtl" ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                <span
                  className={`${currentLanguage.direction === "rtl" ? "mr-2" : "ml-2"}`}
                >
                  {currentLanguage.code === "fa"
                    ? "بازگشت به صفحه اصلی"
                    : currentLanguage.code === "ar"
                      ? "العودة إلى الصفحة الرئيسية"
                      : "Back to Home"}
                </span>
              </Button>
            </Link>

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
                    onClick={() => onLanguageChange(lang)}
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
  );
}

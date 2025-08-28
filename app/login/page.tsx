"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Phone, Lock, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

export default function LoginPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const languages: Language[] = [
    { name: "فارسی", code: "fa", direction: "rtl" },
    { name: "English", code: "en", direction: "ltr" },
    { name: "العربية", code: "ar", direction: "rtl" },
  ];

  const translations = {
    fa: {
      welcome: "خوش آمدید",
      signIn: "ورود به حساب کاربری",
      mobile: "شماره موبایل",
      password: "رمز عبور",
      showPassword: "نمایش رمز عبور",
      hidePassword: "مخفی کردن رمز عبور",
      login: "ورود",
      orContinueWith: "یا ادامه با",
      googleLogin: "ورود با Google",
      noAccount: "حساب کاربری ندارید؟",
      register: "ثبت نام کنید",
      forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
      mobilePlaceholder: "09123456789",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      backToHome: "بازگشت به صفحه اصلی",
    },
    en: {
      welcome: "Welcome Back",
      signIn: "Sign in to your account",
      mobile: "Mobile Number",
      password: "Password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      login: "Sign In",
      orContinueWith: "Or continue with",
      googleLogin: "Continue with Google",
      noAccount: "Don't have an account?",
      register: "Sign up",
      forgotPassword: "Forgot your password?",
      mobilePlaceholder: "+1234567890",
      passwordPlaceholder: "Enter your password",
      backToHome: "Back to Home",
    },
    ar: {
      welcome: "مرحباً بعودتك",
      signIn: "تسجيل الدخول إلى حسابك",
      mobile: "رقم الهاتف المحمول",
      password: "كلمة المرور",
      showPassword: "إظهار كلمة المرور",
      hidePassword: "إخفاء كلمة المرور",
      login: "تسجيل الدخول",
      orContinueWith: "أو المتابعة مع",
      googleLogin: "المتابعة مع Google",
      noAccount: "ليس لديك حساب؟",
      register: "إنشاء حساب",
      forgotPassword: "نسيت كلمة المرور؟",
      mobilePlaceholder: "+1234567890",
      passwordPlaceholder: "أدخل كلمة المرور",
      backToHome: "العودة إلى الصفحة الرئيسية",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.fa;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", { mobile, password });
    }, 2000);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-8 ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <Link href="/" className="text-white hover:text-blue-200 transition">
            {t.backToHome}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-blue-700">
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
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Barton</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t.welcome}
            </h2>
            <p className="text-gray-600">{t.signIn}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-gray-700 font-medium">
                {t.mobile}
              </Label>
              <div className="relative">
                <Phone
                  className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                />
                <Input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={t.mobilePlaceholder}
                  className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                {t.password}
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className={`${currentLanguage.direction === "rtl" ? "pr-10 pl-10" : "pl-10 pr-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${currentLanguage.direction === "rtl" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                  title={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div
              className={`${currentLanguage.direction === "rtl" ? "text-left" : "text-right"}`}
            >
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {t.forgotPassword}
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? "..." : t.login}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">
              {t.orContinueWith}
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-lg rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className={`w-5 h-5 ${currentLanguage.direction === "rtl" ? "ml-3" : "mr-3"}`}
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.googleLogin}
          </Button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">{t.noAccount} </span>
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

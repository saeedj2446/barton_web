"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  User,
  Lock,
  Calendar,
  Upload,
  Eye,
  EyeOff,
  Globe,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    name: "فارسی",
    code: "fa",
    direction: "rtl",
  });
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: "",
  });

  const languages: Language[] = [
    { name: "فارسی", code: "fa", direction: "rtl" },
    { name: "English", code: "en", direction: "ltr" },
    { name: "العربية", code: "ar", direction: "rtl" },
  ];

  const translations = {
    fa: {
      createAccount: "ایجاد حساب کاربری",
      step: "مرحله",
      of: "از",
      mobile: "شماره موبایل",
      email: "ایمیل",
      firstName: "نام",
      lastName: "نام خانوادگی",
      password: "رمز عبور",
      confirmPassword: "تکرار رمز عبور",
      gender: "جنسیت",
      male: "مرد",
      female: "زن",
      birthDate: "تاریخ تولد",
      profilePicture: "عکس پروفایل",
      uploadPhoto: "آپلود عکس",
      next: "بعدی",
      previous: "قبلی",
      register: "ثبت نام",
      orContinueWith: "یا ادامه با",
      googleRegister: "ثبت نام با Google",
      haveAccount: "حساب کاربری دارید؟",
      signIn: "وارد شوید",
      backToHome: "بازگشت به صفحه اصلی",
      mobilePlaceholder: "09123456789",
      emailPlaceholder: "example@email.com",
      firstNamePlaceholder: "نام خود را وارد کنید",
      lastNamePlaceholder: "نام خانوادگی خود را وارد کنید",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      confirmPasswordPlaceholder: "رمز عبور را مجدداً وارد کنید",
      showPassword: "نمایش رمز عبور",
      hidePassword: "مخفی کردن رمز عبور",
      step1Title: "اطلاعات تماس",
      step2Title: "اطلاعات شخصی",
      step3Title: "تکمیل پروفایل",
    },
    en: {
      createAccount: "Create Your Account",
      step: "Step",
      of: "of",
      mobile: "Mobile Number",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      password: "Password",
      confirmPassword: "Confirm Password",
      gender: "Gender",
      male: "Male",
      female: "Female",
      birthDate: "Birth Date",
      profilePicture: "Profile Picture",
      uploadPhoto: "Upload Photo",
      next: "Next",
      previous: "Previous",
      register: "Register",
      orContinueWith: "Or continue with",
      googleRegister: "Sign up with Google",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      backToHome: "Back to Home",
      mobilePlaceholder: "+1234567890",
      emailPlaceholder: "example@email.com",
      firstNamePlaceholder: "Enter your first name",
      lastNamePlaceholder: "Enter your last name",
      passwordPlaceholder: "Enter your password",
      confirmPasswordPlaceholder: "Confirm your password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      step1Title: "Contact Information",
      step2Title: "Personal Information",
      step3Title: "Complete Profile",
    },
    ar: {
      createAccount: "إنشاء حسابك",
      step: "الخطوة",
      of: "من",
      mobile: "رقم الهاتف المحمول",
      email: "البريد الإلكتروني",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      birthDate: "تاريخ الميلاد",
      profilePicture: "صورة الملف الشخصي",
      uploadPhoto: "رفع صورة",
      next: "التالي",
      previous: "السابق",
      register: "تسجيل",
      orContinueWith: "أو المتابعة مع",
      googleRegister: "التسجيل مع Google",
      haveAccount: "لديك حساب بالفعل؟",
      signIn: "تسجيل الدخول",
      backToHome: "العودة إلى الصفحة الرئيسية",
      mobilePlaceholder: "+1234567890",
      emailPlaceholder: "example@email.com",
      firstNamePlaceholder: "أدخل اسمك الأول",
      lastNamePlaceholder: "أدخل اسم العائلة",
      passwordPlaceholder: "أدخل كلمة المرور",
      confirmPasswordPlaceholder: "أكد كلمة المرور",
      showPassword: "إظهار كلمة المرور",
      hidePassword: "إخفاء كلمة المرور",
      step1Title: "معلومات الاتصال",
      step2Title: "المعلومات الشخصية",
      step3Title: "إكمال الملف الشخصي",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.fa;

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration data:", formData);
    }, 2000);
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t.step1Title;
      case 2:
        return t.step2Title;
      case 3:
        return t.step3Title;
      default:
        return t.step1Title;
    }
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

        {/* Register Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Barton</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t.createAccount}
            </h2>
            <p className="text-gray-600">{getStepTitle()}</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {t.step} {currentStep} {t.of} 3
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <>
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
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      placeholder={t.mobilePlaceholder}
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>

                {/* Google Register */}
                <div className="my-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">
                      {t.orContinueWith}
                    </span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleGoogleRegister}
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
                    {t.googleRegister}
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder={t.emailPlaceholder}
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>

                {/* First Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-700 font-medium"
                  >
                    {t.firstName}
                  </Label>
                  <div className="relative">
                    <User
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder={t.firstNamePlaceholder}
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-700 font-medium"
                  >
                    {t.lastName}
                  </Label>
                  <div className="relative">
                    <User
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder={t.lastNamePlaceholder}
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder={t.confirmPasswordPlaceholder}
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Profile Details */}
            {currentStep === 3 && (
              <>
                {/* Gender */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">
                    {t.gender}
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">{t.male}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{t.female}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="birthDate"
                    className="text-gray-700 font-medium"
                  >
                    {t.birthDate}
                  </Label>
                  <div className="relative">
                    <Calendar
                      className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
                    />
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500`}
                      required
                    />
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">
                    {t.profilePicture}
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="profileImage"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Upload
                          className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                        />
                        {t.uploadPhoto}
                      </Label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div
              className={`flex ${currentStep === 1 ? "justify-end" : "justify-between"} pt-4`}
            >
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                >
                  {currentLanguage.direction === "rtl" ? (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  ) : (
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  )}
                  {t.previous}
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t.next}
                  {currentLanguage.direction === "rtl" ? (
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "..." : t.register}
                </Button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">{t.haveAccount} </span>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {t.signIn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

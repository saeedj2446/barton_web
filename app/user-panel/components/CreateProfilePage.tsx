"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  User,
  Building2,
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CreateProfilePageProps {
  onClose: () => void;
  onSave: (profileData: any) => void;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
  translations: any;
}

interface PersonalProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  age: string;
  gender: string;
  education: string;
  province: string;
  city: string;
  address: string;
  avatar?: string;
}

interface BusinessProfileData {
  departmentName: string;
  employeesNumber: string;
  subtitle: string;
  address: string;
  postalCode: string;
  description: string;
  contact: string;
  keywords: string;
  logo?: string;
}

export default function CreateProfilePage({
  onClose,
  onSave,
  currentLanguage,
  translations: t,
}: CreateProfilePageProps) {
  const [step, setStep] = useState(1);
  const [profileType, setProfileType] = useState<"personal" | "business" | "">(
    "",
  );
  const [personalData, setPersonalData] = useState<PersonalProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobile: "",
    age: "",
    gender: "",
    education: "",
    province: "",
    city: "",
    address: "",
  });
  const [businessData, setBusinessData] = useState<BusinessProfileData>({
    departmentName: "",
    employeesNumber: "",
    subtitle: "",
    address: "",
    postalCode: "",
    description: "",
    contact: "",
    keywords: "",
  });

  const translations = {
    fa: {
      createProfile: "ایجاد پروفایل جدید",
      selectProfileType: "نوع پروفایل را انتخاب کنید",
      personalProfile: "پروفایل شخصی",
      businessProfile: "پروفایل کسب‌وکار",
      personalInfo: "اطلاعات شخصی",
      businessInfo: "اطلاعات کسب‌وکار",
      firstName: "نام",
      lastName: "نام خانوادگی",
      email: "ایمیل",
      phone: "تلفن",
      mobile: "موبایل",
      age: "سن",
      gender: "جنسیت",
      education: "تحصیلات",
      province: "استان",
      city: "شهر",
      address: "آدرس",
      departmentName: "نام بخش/شرکت",
      employeesNumber: "تعداد کارمندان",
      subtitle: "عنوان فرعی",
      postalCode: "کد پستی",
      description: "توضیحات",
      contact: "اطلاعات تماس",
      keywords: "کلمات کلیدی",
      next: "بعدی",
      previous: "قبلی",
      save: "ذخیره",
      saveAndContinue: "ذخیره و ادامه",
      close: "بستن",
      male: "مرد",
      female: "زن",
      step: "مرحله",
    },
    en: {
      createProfile: "Create New Profile",
      selectProfileType: "Select Profile Type",
      personalProfile: "Personal Profile",
      businessProfile: "Business Profile",
      personalInfo: "Personal Information",
      businessInfo: "Business Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      mobile: "Mobile",
      age: "Age",
      gender: "Gender",
      education: "Education",
      province: "Province",
      city: "City",
      address: "Address",
      departmentName: "Department/Company Name",
      employeesNumber: "Number of Employees",
      subtitle: "Subtitle",
      postalCode: "Postal Code",
      description: "Description",
      contact: "Contact Information",
      keywords: "Keywords",
      next: "Next",
      previous: "Previous",
      save: "Save",
      saveAndContinue: "Save & Continue",
      close: "Close",
      male: "Male",
      female: "Female",
      step: "Step",
    },
  };

  const tr =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const handleSave = () => {
    const profileData = {
      type: profileType,
      data: profileType === "personal" ? personalData : businessData,
      step: step,
    };
    onSave(profileData);
  };

  const handleNext = () => {
    if (step === 1 && profileType) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => {
    const totalSteps = profileType === "personal" ? 3 : 3;
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  i + 1 < step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {tr.selectProfileType}
        </h3>
      </div>
      <RadioGroup
        value={profileType}
        onValueChange={(value) =>
          setProfileType(value as "personal" | "business")
        }
        className="space-y-4"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
          <RadioGroupItem value="personal" id="personal" />
          <Label
            htmlFor="personal"
            className="flex items-center cursor-pointer flex-1"
          >
            <User className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <div className="font-medium">{tr.personalProfile}</div>
              <div className="text-sm text-gray-500">برای استفاده شخصی</div>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
          <RadioGroupItem value="business" id="business" />
          <Label
            htmlFor="business"
            className="flex items-center cursor-pointer flex-1"
          >
            <Building2 className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <div className="font-medium">{tr.businessProfile}</div>
              <div className="text-sm text-gray-500">برای کسب‌وکار</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderPersonalStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {tr.personalInfo} - {tr.step} 1
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{tr.firstName}</Label>
          <Input
            id="firstName"
            value={personalData.firstName}
            onChange={(e) =>
              setPersonalData({ ...personalData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="lastName">{tr.lastName}</Label>
          <Input
            id="lastName"
            value={personalData.lastName}
            onChange={(e) =>
              setPersonalData({ ...personalData, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="email">{tr.email}</Label>
          <Input
            id="email"
            type="email"
            value={personalData.email}
            onChange={(e) =>
              setPersonalData({ ...personalData, email: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="mobile">{tr.mobile}</Label>
          <Input
            id="mobile"
            value={personalData.mobile}
            onChange={(e) =>
              setPersonalData({ ...personalData, mobile: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="age">{tr.age}</Label>
          <Input
            id="age"
            type="number"
            value={personalData.age}
            onChange={(e) =>
              setPersonalData({ ...personalData, age: e.target.value })
            }
          />
        </div>
        <div>
          <Label>{tr.gender}</Label>
          <RadioGroup
            value={personalData.gender}
            onValueChange={(value) =>
              setPersonalData({ ...personalData, gender: value })
            }
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{tr.male}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{tr.female}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  const renderPersonalStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {tr.personalInfo} - {tr.step} 2
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="education">{tr.education}</Label>
          <Input
            id="education"
            value={personalData.education}
            onChange={(e) =>
              setPersonalData({ ...personalData, education: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="phone">{tr.phone}</Label>
          <Input
            id="phone"
            value={personalData.phone}
            onChange={(e) =>
              setPersonalData({ ...personalData, phone: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="province">{tr.province}</Label>
          <Input
            id="province"
            value={personalData.province}
            onChange={(e) =>
              setPersonalData({ ...personalData, province: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="city">{tr.city}</Label>
          <Input
            id="city"
            value={personalData.city}
            onChange={(e) =>
              setPersonalData({ ...personalData, city: e.target.value })
            }
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">{tr.address}</Label>
          <Input
            id="address"
            value={personalData.address}
            onChange={(e) =>
              setPersonalData({ ...personalData, address: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {tr.businessInfo} - {tr.step} 1
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="departmentName">{tr.departmentName}</Label>
          <Input
            id="departmentName"
            value={businessData.departmentName}
            onChange={(e) =>
              setBusinessData({
                ...businessData,
                departmentName: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="employeesNumber">{tr.employeesNumber}</Label>
          <Input
            id="employeesNumber"
            type="number"
            value={businessData.employeesNumber}
            onChange={(e) =>
              setBusinessData({
                ...businessData,
                employeesNumber: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="subtitle">{tr.subtitle}</Label>
          <Input
            id="subtitle"
            value={businessData.subtitle}
            onChange={(e) =>
              setBusinessData({ ...businessData, subtitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="contact">{tr.contact}</Label>
          <Input
            id="contact"
            value={businessData.contact}
            onChange={(e) =>
              setBusinessData({ ...businessData, contact: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {tr.businessInfo} - {tr.step} 2
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">{tr.postalCode}</Label>
          <Input
            id="postalCode"
            value={businessData.postalCode}
            onChange={(e) =>
              setBusinessData({ ...businessData, postalCode: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="keywords">{tr.keywords}</Label>
          <Input
            id="keywords"
            value={businessData.keywords}
            onChange={(e) =>
              setBusinessData({ ...businessData, keywords: e.target.value })
            }
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="businessAddress">{tr.address}</Label>
          <Input
            id="businessAddress"
            value={businessData.address}
            onChange={(e) =>
              setBusinessData({ ...businessData, address: e.target.value })
            }
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">{tr.description}</Label>
          <Input
            id="description"
            value={businessData.description}
            onChange={(e) =>
              setBusinessData({ ...businessData, description: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (step === 1) return renderStep1();
    if (profileType === "personal") {
      if (step === 2) return renderPersonalStep2();
      if (step === 3) return renderPersonalStep3();
    } else if (profileType === "business") {
      if (step === 2) return renderBusinessStep2();
      if (step === 3) return renderBusinessStep3();
    }
    return null;
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${currentLanguage.direction}`}
      dir={currentLanguage.direction}
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {tr.createProfile}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepIndicator()}
          {renderCurrentStep()}

          <div className="flex justify-between pt-6 border-t">
            <div className="flex space-x-2">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  {currentLanguage.direction === "rtl" ? (
                    <ChevronRight className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 mr-2" />
                  )}
                  {tr.previous}
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {tr.save}
              </Button>

              {step < 3 && profileType && (
                <Button onClick={handleNext}>
                  {tr.next}
                  {currentLanguage.direction === "rtl" ? (
                    <ChevronLeft className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              )}

              {step === 3 && (
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {tr.saveAndContinue}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

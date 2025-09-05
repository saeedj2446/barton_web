import React from "react";
import { Star, MapPin, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface Marketer {
  id: number;
  name: string;
  avatar: string;
  location: string;
  locationId: string;
  marketingScore: number;
  invites: number;
  followers: number;
  specialties: string[];
  verified: boolean;
  joinedDate: string;
  totalSales: number;
}

interface MarketersProps {
  currentLanguage?: Language;
  selectedLocation?: Location;
  onLocationChange?: (location: Location) => void;
}

const Marketers = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
  onLocationChange = () => {},
}: MarketersProps) => {
  const translations = {
    en: {
      title: "Top Marketers",
      subtitle: "Connect with our most successful marketing partners",
      viewProfile: "View Profile",
      contact: "Contact",
      invites: "Invites",
      followers: "Followers",
      marketingScore: "Marketing Score",
      viewAll: "View All Marketers",
    },
    fa: {
      title: "بازاریابان برتر",
      subtitle: "با کمک موفق‌ترین شرکای بازاریابی ما فروش خود را افزایش دهید",
      viewProfile: "مشاهده پروفایل",
      contact: "تماس",
      invites: "دعوت‌ها",
      followers: "فالورها",
      marketingScore: "امتیاز بازاریابی",
      viewAll: "همه بازاریابان",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  // Location-based marketers data
  const allMarketers = {
    shiraz: [
      {
        id: 1,
        name: "احمد رضایی",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
        location: "شیراز، ایران",
        locationId: "shiraz",
        marketingScore: 2850,
        invites: 145,
        followers: 2705,
        specialties: ["الکترونیک", "موبایل"],
        verified: true,
        joinedDate: "2023-01-15",
        totalSales: 45000000,
      },
      {
        id: 2,
        name: "فاطمه محمدی",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fateme",
        location: "شیراز، ایران",
        locationId: "shiraz",
        marketingScore: 2340,
        invites: 98,
        followers: 2242,
        specialties: ["پوشاک", "زیبایی"],
        verified: true,
        joinedDate: "2023-03-20",
        totalSales: 32000000,
      },
      {
        id: 3,
        name: "علی کریمی",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
        location: "شیراز، ایران",
        locationId: "shiraz",
        marketingScore: 1980,
        invites: 76,
        followers: 1904,
        specialties: ["خانه و آشپزخانه"],
        verified: false,
        joinedDate: "2023-05-10",
        totalSales: 28000000,
      },
    ],
    "tehran-city": [
      {
        id: 4,
        name: "مریم احمدی",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maryam",
        location: "تهران، ایران",
        locationId: "tehran-city",
        marketingScore: 3450,
        invites: 189,
        followers: 3261,
        specialties: ["لوازم خانگی", "الکترونیک"],
        verified: true,
        joinedDate: "2022-11-05",
        totalSales: 67000000,
      },
    ],
    "dubai-city": [
      {
        id: 5,
        name: "Omar Al-Rashid",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
        location: "دبی، امارات",
        locationId: "dubai-city",
        marketingScore: 2890,
        invites: 134,
        followers: 2756,
        specialties: ["لوکس", "جواهرات"],
        verified: true,
        joinedDate: "2023-02-12",
        totalSales: 89000000,
      },
    ],
    global: [
      {
        id: 6,
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        location: "London, UK",
        locationId: "global",
        marketingScore: 4200,
        invites: 245,
        followers: 3955,
        specialties: ["Fashion", "Electronics"],
        verified: true,
        joinedDate: "2022-08-18",
        totalSales: 125000000,
      },
    ],
  };

  const getMarketersForLocation = () => {
    const locationMarketers =
      allMarketers[selectedLocation.id as keyof typeof allMarketers] || [];

    // If no marketers for specific location, show global marketers
    if (locationMarketers.length === 0) {
      return allMarketers.global || [];
    }

    return locationMarketers;
  };

  const marketers = getMarketersForLocation();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  return (
    <div
      className={`py-16 bg-white ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentLanguage.code === "fa"
              ? `بازاریابان برتر ${selectedLocation.name}`
              : `${t.title} in ${selectedLocation.name}`}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="w-60 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center border border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={() => (window.location.href = "/marketers")}
            >
              {t.viewAll}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scroll / Desktop Grid */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <div className="flex space-x-6 md:space-x-4 overflow-x-auto md:overflow-x-visible -mx-4 px-4 scrollbar-hide">
            {marketers.map((marketer) => (
              <Card
                key={marketer.id}
                className="flex-shrink-0 w-64 md:w-full group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-4">
                      <img
                        src={marketer.avatar}
                        alt={marketer.name}
                        className="w-20 h-20 rounded-full mx-auto bg-gray-100 border-4 border-orange-100"
                      />
                      {marketer.verified && (
                        <div className="absolute -top-1 -right-1 bg-orange-600 rounded-full p-1">
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {marketer.name}
                    </h3>
                    <div
                      className={`flex items-center justify-center text-gray-600 mb-3 ${
                        currentLanguage.direction === "rtl"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 ${
                          currentLanguage.direction === "rtl" ? "ml-1" : "mr-1"
                        }`}
                      />
                      <span className="text-sm">{marketer.location}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {marketer.specialties
                        .slice(0, 2)
                        .map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-1 bg-orange-100 text-orange-700"
                          >
                            {specialty}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div
                      className={`flex justify-between items-center ${
                        currentLanguage.direction === "rtl"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >
                      <span className="text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {t.marketingScore}
                      </span>
                      <span className="font-bold text-orange-600">
                        {formatNumber(marketer.marketingScore)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center ${
                        currentLanguage.direction === "rtl"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >
                      <span className="text-gray-600">{t.invites}</span>
                      <span className="font-semibold text-blue-600">
                        {formatNumber(marketer.invites)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center ${
                        currentLanguage.direction === "rtl"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >
                      <span className="text-gray-600 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {t.followers}
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatNumber(marketer.followers)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      {t.viewProfile}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      {t.contact}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketers;

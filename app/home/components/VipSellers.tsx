import React from "react";
import { Star, MapPin, Award } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface VipSellersProps {
  currentLanguage?: Language;
}

const VipSellers = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
}: VipSellersProps) => {
  const translations = {
    en: {
      title: "VIP Sellers",
      subtitle: "Connect with our top-rated premium suppliers",
      viewProfile: "View Profile",
      contact: "Contact",
      yearsExperience: "Years Experience",
      rating: "Rating",
      orders: "Orders Completed",
    },
    fa: {
      title: "فروشندگان VIP",
      subtitle: "با تامین کنندگان برتر و ممتاز ما ارتباط برقرار کنید",
      viewProfile: "مشاهده پروفایل",
      contact: "تماس",
      yearsExperience: "سال تجربه",
      rating: "امتیاز",
      orders: "سفارشات تکمیل شده",
    },
    ar: {
      title: "البائعون المميزون",
      subtitle: "تواصل مع أفضل الموردين المميزين لدينا",
      viewProfile: "عرض الملف الشخصي",
      contact: "اتصال",
      yearsExperience: "سنوات الخبرة",
      rating: "التقييم",
      orders: "الطلبات المكتملة",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const vipSellers = [
    {
      id: 1,
      name: "Global Tech Solutions",
      location: "Shanghai, China",
      rating: 4.9,
      experience: 12,
      orders: 2500,
      speciality: "Electronics & Components",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller1",
      verified: true,
    },
    {
      id: 2,
      name: "Premium Textiles Co.",
      location: "Istanbul, Turkey",
      rating: 4.8,
      experience: 8,
      orders: 1800,
      speciality: "Textiles & Fabrics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller2",
      verified: true,
    },
    {
      id: 3,
      name: "Industrial Machinery Ltd",
      location: "Mumbai, India",
      rating: 4.9,
      experience: 15,
      orders: 3200,
      speciality: "Machinery & Equipment",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller3",
      verified: true,
    },
    {
      id: 4,
      name: "Organic Foods Export",
      location: "São Paulo, Brazil",
      rating: 4.7,
      experience: 6,
      orders: 1200,
      speciality: "Food & Beverages",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller4",
      verified: true,
    },
  ];

  return (
    <div
      className={`py-16 bg-gray-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipSellers.map((seller) => (
            <Card
              key={seller.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-20 h-20 rounded-full mx-auto bg-gray-100"
                    />
                    {seller.verified && (
                      <div className="absolute -top-1 -right-1 bg-orange-600 rounded-full p-1">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {seller.name}
                  </h3>
                  <div
                    className={`flex items-center justify-center text-gray-600 mb-2 ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <MapPin
                      className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "ml-1" : "mr-1"}`}
                    />
                    <span className="text-sm">{seller.location}</span>
                  </div>
                  <p className="text-sm text-orange-600 font-medium mb-4">
                    {seller.speciality}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div
                    className={`flex justify-between items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-sm text-gray-600">{t.rating}</span>
                    <div
                      className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span
                        className={`font-semibold ${currentLanguage.direction === "rtl" ? "mr-1" : "ml-1"}`}
                      >
                        {seller.rating}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex justify-between items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-sm text-gray-600">
                      {t.yearsExperience}
                    </span>
                    <span className="font-semibold">{seller.experience}</span>
                  </div>
                  <div
                    className={`flex justify-between items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <span className="text-sm text-gray-600">{t.orders}</span>
                    <span className="font-semibold">
                      {seller.orders.toLocaleString()}
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
  );
};

export default VipSellers;

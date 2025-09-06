import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Truck,
  Star,
  MapPin,
  Package,
  Clock,
  Phone,
  ArrowRight,
  Shield,
  Award,
} from "lucide-react";
import Link from "next/link";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface Driver {
  id: string;
  name: string;
  location: string;
  rating: number;
  experience: number;
  vehicleType: string;
  capacity: string;
  image: string;
  vehicleImage: string;
  verified: boolean;
  completedTrips: number;
  responseTime: string;
  specialties: string[];
}

interface TransportationSectionProps {
  currentLanguage?: Language;
  selectedLocation?: {
    id: string;
    name: string;
    type: "city" | "province" | "country" | "continent" | "global";
    parentId?: string;
  };
}

const TransportationSection = ({
  currentLanguage = { name: "فارسی", code: "fa", direction: "rtl" },
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
}: TransportationSectionProps) => {
  const translations = {
    en: {
      title: "Transportation & Freight",
      subtitle: "Reliable drivers and freight services for your business",
      viewAllDrivers: "View All Drivers",
      registerAsDriver: "Register as Driver",
      contact: "Contact",
      viewProfile: "View Profile",
      experience: "Experience",
      trips: "Trips",
      responseTime: "Response Time",
    },
    fa: {
      title: `راننده‌ها و حمل بار ${selectedLocation.name}`,
      subtitle: "راننده‌های مطمئن و خدمات حمل بار برای کسب‌وکار شما",
      viewAllDrivers: "مشاهده همه راننده‌ها",
      registerAsDriver: "ثبت‌نام راننده",
      contact: "تماس",
      viewProfile: "مشاهده پروفایل",
      experience: "تجربه",
      trips: "سفر",
      responseTime: "زمان پاسخ",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const drivers: Driver[] = [
    {
      id: "1",
      name: "احمد محمدی",
      location: "شیراز، فارس",
      rating: 4.9,
      experience: 8,
      vehicleType: "کامیون ۱۰ تن",
      capacity: "۱۰ تن",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver1",
      vehicleImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      verified: true,
      completedTrips: 1250,
      responseTime: "۱۵ دقیقه",
      specialties: ["حمل مواد غذایی", "بار سنگین"],
    },
    {
      id: "2",
      name: "علی رضایی",
      location: "تهران، تهران",
      rating: 4.8,
      experience: 12,
      vehicleType: "وانت نیسان",
      capacity: "۲ تن",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver2",
      vehicleImage:
        "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?w=400&q=80",
      verified: true,
      completedTrips: 890,
      responseTime: "۱۰ دقیقه",
      specialties: ["حمل شهری", "بار سبک"],
    },
    {
      id: "3",
      name: "حسن احمدی",
      location: "اصفهان، اصفهان",
      rating: 4.7,
      experience: 6,
      vehicleType: "کامیونت ۵ تن",
      capacity: "۵ تن",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver3",
      vehicleImage:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80",
      verified: false,
      completedTrips: 456,
      responseTime: "۲۰ دقیقه",
      specialties: ["حمل بین‌شهری", "بار متوسط"],
    },
    {
      id: "4",
      name: "مهدی کریمی",
      location: "مشهد، خراسان رضوی",
      rating: 4.9,
      experience: 15,
      vehicleType: "تریلی ۲۰ تن",
      capacity: "۲۰ تن",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver4",
      vehicleImage:
        "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&q=80",
      verified: true,
      completedTrips: 2100,
      responseTime: "۳۰ دقیقه",
      specialties: ["حمل بین‌استانی", "بار فوق سنگین"],
    },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  return (
    <section
      className={`py-16 bg-gradient-to-b from-gray-50 to-white ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <Card
              key={driver.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Driver Image */}
                <div className="relative">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-full h-32 object-cover bg-gray-100"
                  />
                  {driver.verified && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                      <Shield className="w-3 h-3 ml-1" />
                      تایید شده
                    </Badge>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center bg-black/50 rounded px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" />
                        <span>{driver.rating}</span>
                      </div>
                      <div className="flex items-center bg-black/50 rounded px-2 py-1">
                        <Award className="w-3 h-3 ml-1" />
                        <span>{driver.experience} سال</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Driver Info */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {driver.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 ml-1" />
                      {driver.location}
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="mb-4">
                    <div className="relative mb-3">
                      <img
                        src={driver.vehicleImage}
                        alt={driver.vehicleType}
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md" />
                      <div className="absolute bottom-1 left-2 right-2 text-white text-xs">
                        <div className="font-semibold">
                          {driver.vehicleType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-blue-600 ml-1" />
                        <span className="text-gray-600">ظرفیت:</span>
                      </div>
                      <span className="font-semibold text-blue-600">
                        {driver.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t.trips}</span>
                      <span className="font-semibold text-green-600">
                        {formatNumber(driver.completedTrips)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t.responseTime}</span>
                      <span className="font-semibold text-orange-600">
                        {driver.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {driver.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm">
                      <Phone className="w-3 h-3 ml-1" />
                      {t.contact}
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm">
                      {t.viewProfile}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/drivers">
              <Button
                variant="outline"
                className="px-8 py-3 border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                {t.viewAllDrivers}
                <ArrowRight
                  className={`w-4 h-4 ${
                    currentLanguage.direction === "rtl"
                      ? "mr-2 rotate-180"
                      : "ml-2"
                  }`}
                />
              </Button>
            </Link>
            <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
              <Truck className="w-4 h-4 ml-2" />
              {t.registerAsDriver}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportationSection;

import React from "react";
import { Clock, MapPin, DollarSign, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface BuyingRequestsProps {
  currentLanguage?: Language;
}

const BuyingRequests = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
}: BuyingRequestsProps) => {
  const translations = {
    en: {
      title: "Latest Buying Requests",
      subtitle: "Submit your best offers to potential buyers",
      submitOffer: "Submit Offer",
      viewDetails: "View Details",
      quantity: "Quantity",
      budget: "Budget",
      deadline: "Deadline",
      location: "Location",
      daysAgo: "days ago",
      urgent: "Urgent",
    },
    fa: {
      title: "آخرین درخواست های خرید",
      subtitle: "بهترین پیشنهادات خود را به خریداران بالقوه ارائه دهید",
      submitOffer: "ارسال پیشنهاد",
      viewDetails: "مشاهده جزئیات",
      quantity: "مقدار",
      budget: "بودجه",
      deadline: "مهلت زمانی",
      location: "موقعیت",
      daysAgo: "روز پیش",
      urgent: "فوری",
    },
    ar: {
      title: "أحدث طلبات الشراء",
      subtitle: "قدم أفضل عروضك للمشترين المحتملين",
      submitOffer: "تقديم عرض",
      viewDetails: "عرض التفاصيل",
      quantity: "الكمية",
      budget: "الميزانية",
      deadline: "الموعد النهائي",
      location: "الموقع",
      daysAgo: "أيام مضت",
      urgent: "عاجل",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const buyingRequests = [
    {
      id: 1,
      title: "High-Quality LED Display Panels",
      description:
        "Looking for 55-inch 4K LED display panels for retail stores. Need reliable supplier with warranty support.",
      quantity: "500 units",
      budget: "$50,000 - $75,000",
      deadline: "15 days",
      location: "Dubai, UAE",
      postedDays: 2,
      category: "Electronics",
      urgent: true,
    },
    {
      id: 2,
      title: "Organic Cotton Fabric Rolls",
      description:
        "Seeking premium organic cotton fabric for fashion brand. GOTS certified preferred.",
      quantity: "2000 meters",
      budget: "$15,000 - $20,000",
      deadline: "30 days",
      location: "Los Angeles, USA",
      postedDays: 1,
      category: "Textiles",
      urgent: false,
    },
    {
      id: 3,
      title: "Industrial Packaging Machines",
      description:
        "Need automatic packaging machines for food processing plant. Must meet FDA standards.",
      quantity: "3 units",
      budget: "$80,000 - $120,000",
      deadline: "45 days",
      location: "São Paulo, Brazil",
      postedDays: 3,
      category: "Machinery",
      urgent: false,
    },
    {
      id: 4,
      title: "Premium Coffee Beans",
      description:
        "Looking for Arabica coffee beans, single origin, for specialty coffee shop chain.",
      quantity: "1000 kg",
      budget: "$8,000 - $12,000",
      deadline: "20 days",
      location: "London, UK",
      postedDays: 1,
      category: "Food & Beverages",
      urgent: true,
    },
    {
      id: 5,
      title: "Solar Panel Systems",
      description:
        "Seeking monocrystalline solar panels for residential installation project.",
      quantity: "200 panels",
      budget: "$25,000 - $35,000",
      deadline: "25 days",
      location: "Sydney, Australia",
      postedDays: 4,
      category: "Energy",
      urgent: false,
    },
    {
      id: 6,
      title: "Medical Equipment Supplies",
      description:
        "Hospital needs surgical instruments and medical devices. CE certification required.",
      quantity: "Various",
      budget: "$40,000 - $60,000",
      deadline: "10 days",
      location: "Berlin, Germany",
      postedDays: 1,
      category: "Medical",
      urgent: true,
    },
  ];

  return (
    <div
      className={`bg-white py-16 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <a href="/buying-requests">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              {currentLanguage.code === "fa"
                ? "مشاهده همه درخواست‌ها"
                : "View All Requests"}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyingRequests.map((request) => (
            <Card
              key={request.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg"
            >
              <CardHeader className="pb-3">
                <div
                  className={`flex items-start justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {request.title}
                    </CardTitle>
                    <div
                      className={`flex items-center text-sm text-gray-500 ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                    >
                      <Clock
                        className={`w-4 h-4 ${currentLanguage.direction === "rtl" ? "ml-1" : "mr-1"}`}
                      />
                      <span>
                        {request.postedDays} {t.daysAgo}
                      </span>
                    </div>
                  </div>
                  {request.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {t.urgent}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {request.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div
                    className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <Package
                      className={`w-4 h-4 text-blue-600 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                    />
                    <span className="text-sm">
                      <span className="font-medium">{t.quantity}:</span>{" "}
                      {request.quantity}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <DollarSign
                      className={`w-4 h-4 text-green-600 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                    />
                    <span className="text-sm">
                      <span className="font-medium">{t.budget}:</span>{" "}
                      {request.budget}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <Clock
                      className={`w-4 h-4 text-orange-600 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                    />
                    <span className="text-sm">
                      <span className="font-medium">{t.deadline}:</span>{" "}
                      {request.deadline}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <MapPin
                      className={`w-4 h-4 text-purple-600 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
                    />
                    <span className="text-sm">
                      <span className="font-medium">{t.location}:</span>{" "}
                      {request.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {t.submitOffer}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {t.viewDetails}
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

export default BuyingRequests;

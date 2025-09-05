import React, { useState } from "react";
import { Clock, MapPin, DollarSign, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
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

interface BuyingRequestsProps {
  currentLanguage?: Language;
  selectedLocation?: Location;
  onLocationChange?: (location: Location) => void;
}
const locations = [
  "شهر من",
  "محله من",
  "استان من",
  "کشور من",
  "قاره من",
  "جهان",
];
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
    subtitle: "پیشنهادات خود را به خریداران بالقوه ارائه دهید",
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
const BuyingRequests = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
  onLocationChange = () => {},
}: BuyingRequestsProps) => {
 /* const [selectedLocation, setSelectedLocation] = useState("شهر من");*/

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  // Location-based buying requests data
  const allBuyingRequests = {
    shiraz: [
      {
        id: 1,
        title: "پنل‌های نمایشگر LED با کیفیت بالا",
        description:
          "به دنبال پنل‌های نمایشگر LED 55 اینچی 4K برای فروشگاه‌های خرده‌فروشی. نیاز به تامین‌کننده قابل اعتماد با پشتیبانی گارانتی.",
        quantity: "500 واحد",
        budget: "2,000,000,000 - 3,000,000,000 تومان",
        deadline: "15 روز",
        location: "شیراز، ایران",
        locationId: "shiraz",
        postedDays: 2,
        category: "الکترونیک",
        urgent: true,
      },
      {
        id: 2,
        title: "رول‌های پارچه نخی ارگانیک",
        description:
          "به دنبال پارچه نخی ارگانیک ممتاز برای برند مد. ترجیحاً دارای گواهی GOTS.",
        quantity: "2000 متر",
        budget: "600,000,000 - 800,000,000 تومان",
        deadline: "30 روز",
        location: "شیراز، ایران",
        locationId: "shiraz",
        postedDays: 1,
        category: "نساجی",
        urgent: false,
      },
    ],
    "tehran-city": [
      {
        id: 3,
        title: "ماشین‌آلات بسته‌بندی صنعتی",
        description:
          "نیاز به ماشین‌آلات بسته‌بندی اتوماتیک برای کارخانه فرآوری مواد غذایی.",
        quantity: "3 واحد",
        budget: "3,200,000,000 - 4,800,000,000 تومان",
        deadline: "45 روز",
        location: "تهران، ایران",
        locationId: "tehran-city",
        postedDays: 3,
        category: "ماشین‌آلات",
        urgent: false,
      },
    ],
    "dubai-city": [
      {
        id: 4,
        title: "Premium Coffee Beans",
        description:
          "Looking for Arabica coffee beans, single origin, for specialty coffee shop chain.",
        quantity: "1000 kg",
        budget: "$8,000 - $12,000",
        deadline: "20 days",
        location: "Dubai, UAE",
        locationId: "dubai-city",
        postedDays: 1,
        category: "Food & Beverages",
        urgent: true,
      },
    ],
    global: [
      {
        id: 5,
        title: "Solar Panel Systems",
        description:
          "Seeking monocrystalline solar panels for residential installation project.",
        quantity: "200 panels",
        budget: "$25,000 - $35,000",
        deadline: "25 days",
        location: "Sydney, Australia",
        locationId: "global",
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
        locationId: "global",
        postedDays: 1,
        category: "Medical",
        urgent: true,
      },
    ],
  };

  const getBuyingRequestsForLocation = () => {
    const locationRequests =
      allBuyingRequests[
        selectedLocation.id as keyof typeof allBuyingRequests
      ] || [];

    // If no requests for specific location, show global requests
    if (locationRequests.length === 0) {
      return allBuyingRequests.global || [];
    }

    return locationRequests;
  };

  const buyingRequests = getBuyingRequestsForLocation();

  return (
    <div
      className={`bg-white py-16 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentLanguage.code === "fa"
              ? `آخرین درخواست‌های خرید ${selectedLocation.name}`
              : `Latest Buying Requests in ${selectedLocation.name}`}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <div className="flex justify-center mt-8">
            <button className="w-60 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
              {currentLanguage.code === "fa"
                ? "مشاهده همه درخواست‌ها"
                : "View All Requests"}
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/*<Tabs
            defaultValue="All"
            value={selectedLocation}
            onValueChange={setSelectedLocation}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              {locations.map((industry) => (
                <TabsTrigger
                  key={industry}
                  value={industry}
                  className="px-4 py-2"
                >
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>*/}
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
                      className={`w-4 h-4 text-orange-600 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
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

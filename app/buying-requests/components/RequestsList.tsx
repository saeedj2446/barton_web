"use client";

import React, { useMemo } from "react";
import {
  Clock,
  MapPin,
  DollarSign,
  Package,
  User,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface FilterState {
  category: string;
  buyerType: string;
  location: string;
  volume: string;
  dateRange: string;
  status: string;
  urgency: string;
}

interface RequestsListProps {
  searchQuery: string;
  filters: FilterState;
  currentLanguage: Language;
}

interface BuyingRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  buyerType: string;
  quantity: string;
  budget: string;
  deadline: string;
  location: string;
  postedDays: number;
  urgent: boolean;
  status: string;
  buyerName: string;
  buyerRating: number;
}

const RequestsList = ({
  searchQuery,
  filters,
  currentLanguage,
}: RequestsListProps) => {
  const translations = {
    en: {
      quantity: "Quantity",
      budget: "Budget",
      deadline: "Deadline",
      location: "Location",
      buyer: "Buyer",
      daysAgo: "days ago",
      urgent: "Urgent",
      submitOffer: "Submit Offer",
      viewDetails: "View Details",
      noResults: "No buying requests found",
      noResultsDesc: "Try adjusting your search or filters",
      resultsFound: "results found",
      active: "Active",
      pending: "Pending",
      closed: "Closed",
    },
    fa: {
      quantity: "مقدار",
      budget: "بودجه",
      deadline: "مهلت زمانی",
      location: "موقعیت",
      buyer: "خریدار",
      daysAgo: "روز پیش",
      urgent: "فوری",
      submitOffer: "ارسال پیشنهاد",
      viewDetails: "مشاهده جزئیات",
      noResults: "درخواست خریدی یافت نشد",
      noResultsDesc: "جستجو یا فیلترهای خود را تغییر دهید",
      resultsFound: "نتیجه یافت شد",
      active: "فعال",
      pending: "در انتظار",
      closed: "بسته شده",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const rtl = currentLanguage.direction === "rtl";
  const rowDir = rtl ? "flex-row-reverse" : "";
  const iconGap = rtl ? "ml-2" : "mr-2";
  const clockGap = rtl ? "ml-1" : "mr-1";

  // Mock data for buying requests
  const mockRequests: BuyingRequest[] = [
    {
      id: 1,
      title: "پنل‌های نمایشگر LED با کیفیت بالا",
      description:
        "به دنبال پنل‌های نمایشگر LED 55 اینچی 4K برای فروشگاه‌های خرده‌فروشی. نیاز به تامین‌کننده قابل اعتماد با پشتیبانی گارانتی.",
      category: "electronics",
      buyerType: "retailer",
      quantity: "500 واحد",
      budget: "50,000 - 75,000 دلار",
      deadline: "15 روز",
      location: "tehran",
      postedDays: 2,
      urgent: true,
      status: "active",
      buyerName: "شرکت تجارت الکترونیک پارس",
      buyerRating: 4.8,
    },
    {
      id: 2,
      title: "رول‌های پارچه پنبه ارگانیک",
      description:
        "به دنبال پارچه پنبه ارگانیک درجه یک برای برند مد. ترجیحاً دارای گواهی GOTS.",
      category: "textiles",
      buyerType: "manufacturer",
      quantity: "2000 متر",
      budget: "15,000 - 20,000 دلار",
      deadline: "30 روز",
      location: "isfahan",
      postedDays: 1,
      urgent: false,
      status: "active",
      buyerName: "کارخانه نساجی کویر",
      buyerRating: 4.5,
    },
    {
      id: 3,
      title: "ماشین‌آلات بسته‌بندی صنعتی",
      description:
        "نیاز به دستگاه‌های بسته‌بندی اتوماتیک برای کارخانه فرآوری مواد غذایی. باید استانداردهای FDA را داشته باشد.",
      category: "machinery",
      buyerType: "manufacturer",
      quantity: "3 واحد",
      budget: "80,000 - 120,000 دلار",
      deadline: "45 روز",
      location: "shiraz",
      postedDays: 3,
      urgent: false,
      status: "pending",
      buyerName: "صنایع غذایی زرین",
      buyerRating: 4.2,
    },
    {
      id: 4,
      title: "دانه‌های قهوه درجه یک",
      description:
        "به دنبال دانه‌های قهوه عربیکا تک‌منشأ برای زنجیره کافی‌شاپ تخصصی.",
      category: "food",
      buyerType: "retailer",
      quantity: "1000 کیلوگرم",
      budget: "8,000 - 12,000 دلار",
      deadline: "20 روز",
      location: "tehran",
      postedDays: 1,
      urgent: true,
      status: "active",
      buyerName: "کافه‌های طلایی",
      buyerRating: 4.7,
    },
    {
      id: 5,
      title: "سیستم‌های پنل خورشیدی",
      description:
        "به دنبال پنل‌های خورشیدی مونوکریستال برای پروژه نصب مسکونی.",
      category: "electronics",
      buyerType: "distributor",
      quantity: "200 پنل",
      budget: "25,000 - 35,000 دلار",
      deadline: "25 روز",
      location: "mashhad",
      postedDays: 4,
      urgent: false,
      status: "active",
      buyerName: "انرژی پاک خراسان",
      buyerRating: 4.3,
    },
    {
      id: 6,
      title: "تجهیزات پزشکی و ابزار جراحی",
      description:
        "بیمارستان نیاز به ابزار جراحی و تجهیزات پزشکی دارد. گواهی CE الزامی است.",
      category: "medical",
      buyerType: "wholesaler",
      quantity: "متنوع",
      budget: "40,000 - 60,000 دلار",
      deadline: "10 روز",
      location: "tehran",
      postedDays: 1,
      urgent: true,
      status: "active",
      buyerName: "بیمارستان امید",
      buyerRating: 4.9,
    },
  ];

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    let filtered = mockRequests;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (request) =>
          request.title.toLowerCase().includes(q) ||
          request.description.toLowerCase().includes(q) ||
          request.buyerName.toLowerCase().includes(q),
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (request) => request.category === filters.category,
      );
    }

    if (filters.buyerType) {
      filtered = filtered.filter(
        (request) => request.buyerType === filters.buyerType,
      );
    }

    if (filters.location) {
      filtered = filtered.filter(
        (request) => request.location === filters.location,
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (request) => request.status === filters.status,
      );
    }

    if (filters.urgency === "urgent") {
      filtered = filtered.filter((request) => request.urgent);
    } else if (filters.urgency === "normal") {
      filtered = filtered.filter((request) => !request.urgent);
    }

    if (filters.dateRange) {
      filtered = filtered.filter((request) => {
        switch (filters.dateRange) {
          case "today":
            return request.postedDays === 0;
          case "week":
            return request.postedDays <= 7;
          case "month":
            return request.postedDays <= 30;
          case "3months":
            return request.postedDays <= 90;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t.active;
      case "pending":
        return t.pending;
      case "closed":
        return t.closed;
      default:
        return status;
    }
  };

  const locationLabel = (loc: string) => {
    if (currentLanguage.code === "fa") {
      switch (loc) {
        case "tehran":
          return "تهران";
        case "isfahan":
          return "اصفهان";
        case "shiraz":
          return "شیراز";
        case "mashhad":
          return "مشهد";
        default:
          return loc;
      }
    }
    // en or fallback
    return loc;
  };

  if (filteredRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {t.noResults}
        </h3>
        <p className="text-gray-500">{t.noResultsDesc}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredRequests.length} {t.resultsFound}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <Card
            key={request.id}
            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className={`flex items-start justify-between ${rowDir}`}>
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {request.title}
                  </CardTitle>
                  <div
                    className={`flex items-center text-sm text-gray-500 mb-2 ${rowDir}`}
                  >
                    <Clock className={`w-4 h-4 ${clockGap}`} />
                    <span>
                      {request.postedDays} {t.daysAgo}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {request.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {t.urgent}
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(request.status)}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {request.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className={`flex items-center ${rowDir}`}>
                  <User className={`w-4 h-4 text-blue-600 ${iconGap}`} />
                  <span className="text-sm">
                    <span className="font-medium">{t.buyer}:</span>{" "}
                    {request.buyerName}
                  </span>
                </div>

                <div className={`flex items-center ${rowDir}`}>
                  <Package className={`w-4 h-4 text-purple-600 ${iconGap}`} />
                  <span className="text-sm">
                    <span className="font-medium">{t.quantity}:</span>{" "}
                    {request.quantity}
                  </span>
                </div>

                <div className={`flex items-center ${rowDir}`}>
                  <DollarSign className={`w-4 h-4 text-green-600 ${iconGap}`} />
                  <span className="text-sm">
                    <span className="font-medium">{t.budget}:</span>{" "}
                    {request.budget}
                  </span>
                </div>

                <div className={`flex items-center ${rowDir}`}>
                  <Calendar className={`w-4 h-4 text-orange-600 ${iconGap}`} />
                  <span className="text-sm">
                    <span className="font-medium">{t.deadline}:</span>{" "}
                    {request.deadline}
                  </span>
                </div>

                <div className={`flex items-center ${rowDir}`}>
                  <MapPin className={`w-4 h-4 text-red-600 ${iconGap}`} />
                  <span className="text-sm">
                    <span className="font-medium">{t.location}:</span>{" "}
                    {locationLabel(request.location)}
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
  );
};

export default RequestsList;

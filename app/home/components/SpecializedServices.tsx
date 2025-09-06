import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Gem,
  ShoppingCart,
  Car,
  Shirt,
  Utensils,
  Smartphone,
  Home,
  Stethoscope,
  ArrowRight,
  Plus,
  Send,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface SpecializedService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  supplierCount: number;
  retailerCount: number;
}

interface SpecializedServicesProps {
  currentLanguage?: Language;
  selectedLocation?: {
    id: string;
    name: string;
    type: "city" | "province" | "country" | "continent" | "global";
    parentId?: string;
  };
}

const SpecializedServices = ({
  currentLanguage = { name: "فارسی", code: "fa", direction: "rtl" },
  selectedLocation = {
    id: "shiraz",
    name: "شیراز",
    type: "city",
    parentId: "fars",
  },
}: SpecializedServicesProps) => {
  const [isRequestServiceModalOpen, setIsRequestServiceModalOpen] =
    React.useState(false);
  const [newServiceRequest, setNewServiceRequest] = React.useState({
    title: "",
    supplierTypes: "",
    buyerTypes: "",
    description: "",
  });
  const translations = {
    en: {
      title: "Specialized Services",
      subtitle: "Connect with industry-specific suppliers and retailers",
      viewService: "View Service",
      suppliers: "Suppliers",
      retailers: "Retailers",
    },
    fa: {
      title: `سرویسهای تخصصی پخش در ${selectedLocation.name}`,
      subtitle: "اتصال تامین‌کنندگان و خرده‌فروشان در صنایع تخصصی",
      viewService: "مشاهده سرویس",
      suppliers: "تامین‌کننده",
      retailers: "خرده‌فروش",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const services: SpecializedService[] = [
    {
      id: "jewelry",
      name: `پخش طلا و جواهرات ${selectedLocation.name}`,
      description: "اتصال تولیدکنندگان طلا و جواهرات به طلافروشی‌ها",
      icon: <Gem className="w-8 h-8" />,
      color: "text-yellow-600",
      supplierCount: 245,
      retailerCount: 1200,
    },
    {
      id: "supermarket",
      name: `پخش سوپرمارکت و مواد غذایی ${selectedLocation.name}`,
      description:
        "اتصال شرکت‌های پخش به سوپرمارکت‌ها و فروشگاه‌های مواد غذایی",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "text-green-600",
      supplierCount: 180,
      retailerCount: 850,
    },
    {
      id: "automotive",
      name: `پخش قطعات خودرو ${selectedLocation.name}`,
      description: "اتصال تولیدکنندگان قطعات خودرو به فروشگاه‌های قطعه‌فروشی",
      icon: <Car className="w-8 h-8" />,
      color: "text-blue-600",
      supplierCount: 320,
      retailerCount: 950,
    },
    {
      id: "cosmetics",
      name: `پخش لوازم آرایشی ${selectedLocation.name}`,
      description:
        "اتصال برندهای آرایشی به آرایشگاه‌ها، خرده‌فروشان و سایر اصناف",
      icon: <Shirt className="w-8 h-8" />,
      color: "text-pink-600",
      supplierCount: 150,
      retailerCount: 680,
    },
    {
      id: "restaurant",
      name: `پخش رستوران و تجهیزات ${selectedLocation.name}`,
      description: "اتصال تامین‌کنندگان مواد غذایی و تجهیزات به رستوران‌ها",
      icon: <Utensils className="w-8 h-8" />,
      color: "text-orange-600",
      supplierCount: 200,
      retailerCount: 750,
    },
    {
      id: "electronics",
      name: `پخش الکترونیک و موبایل ${selectedLocation.name}`,
      description:
        "اتصال وارد‌کنندگان الکترونیک به فروشگاه‌های موبایل و لپ‌تاپ",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-purple-600",
      supplierCount: 280,
      retailerCount: 1100,
    },
    {
      id: "home-appliances",
      name: `پخش لوازم خانگی ${selectedLocation.name}`,
      description: "اتصال تولیدکنندگان لوازم خانگی به نمایندگی‌ها و فروشگاه‌ها",
      icon: <Home className="w-8 h-8" />,
      color: "text-indigo-600",
      supplierCount: 190,
      retailerCount: 620,
    },
    {
      id: "medical",
      name: `پخش تجهیزات پزشکی ${selectedLocation.name}`,
      description:
        "اتصال تامین‌کنندگان تجهیزات پزشکی به داروخانه‌ها و کلینیک‌ها",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "text-red-600",
      supplierCount: 120,
      retailerCount: 450,
    },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const handleServiceRequestSubmit = () => {
    console.log("New service request:", newServiceRequest);
    setIsRequestServiceModalOpen(false);
    setNewServiceRequest({
      title: "",
      supplierTypes: "",
      buyerTypes: "",
      description: "",
    });
  };

  return (
    <section
      className={`py-16 bg-gradient-to-b from-white to-gray-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
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
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300 ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div
                    className={`flex justify-between items-center ${
                      currentLanguage.direction === "rtl"
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <span className="text-gray-600">{t.suppliers}</span>
                    <span className="font-semibold text-blue-600">
                      {formatNumber(service.supplierCount)}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between items-center ${
                      currentLanguage.direction === "rtl"
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <span className="text-gray-600">{t.retailers}</span>
                    <span className="font-semibold text-green-600">
                      {formatNumber(service.retailerCount)}
                    </span>
                  </div>
                </div>

                <Link href={`/services/${service.id}`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group-hover:bg-orange-700 transition-colors">
                    {t.viewService}
                    <ArrowRight
                      className={`w-4 h-4 ${
                        currentLanguage.direction === "rtl"
                          ? "mr-2 rotate-180"
                          : "ml-2"
                      }`}
                    />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services">
              <Button
                variant="outline"
                className="px-8 py-3 border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                مشاهده همه سرویس‌ها
              </Button>
            </Link>

            <Dialog
              open={isRequestServiceModalOpen}
              onOpenChange={setIsRequestServiceModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 ml-2" />
                  درخواست سرویس تخصصی
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-green-500" />
                    درخواست سرویس تخصصی جدید
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    اگر به سرویس جدیدی نیاز دارید درخواست دهید تا به سرویس‌های
                    تخصصی ما اضافه شود.
                  </p>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عنوان سرویس</label>
                    <Input
                      placeholder="نام سرویس مورد نظر خود را وارد کنید"
                      value={newServiceRequest.title}
                      onChange={(e) =>
                        setNewServiceRequest({
                          ...newServiceRequest,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      صنف‌های تامین‌کننده
                    </label>
                    <Input
                      placeholder="مثال: تولیدکنندگان، واردکنندگان، پخش‌کنندگان"
                      value={newServiceRequest.supplierTypes}
                      onChange={(e) =>
                        setNewServiceRequest({
                          ...newServiceRequest,
                          supplierTypes: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      صنف‌های خریدار
                    </label>
                    <Input
                      placeholder="مثال: خرده‌فروشان، فروشگاه‌ها، نمایندگی‌ها"
                      value={newServiceRequest.buyerTypes}
                      onChange={(e) =>
                        setNewServiceRequest({
                          ...newServiceRequest,
                          buyerTypes: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">توضیحات</label>
                    <Textarea
                      placeholder="توضیح کاملی از سرویس مورد نظر و نیاز بازار ارائه دهید..."
                      rows={4}
                      value={newServiceRequest.description}
                      onChange={(e) =>
                        setNewServiceRequest({
                          ...newServiceRequest,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleServiceRequestSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      ارسال درخواست
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsRequestServiceModalOpen(false)}
                      className="flex-1"
                    >
                      انصراف
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedServices;

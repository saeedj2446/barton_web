import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Users, Building, Globe, TrendingUp } from "lucide-react";

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface StatsSectionProps {
  currentLanguage?: Language;
}

const StatsSection = ({
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
}: StatsSectionProps) => {
  const translations = {
    en: {
      title: "Trusted by Businesses Worldwide",
      subtitle: "Join thousands of companies that rely on our platform",
      verifiedSuppliers: "Verified Suppliers",
      activeBuyers: "Active Buyers",
      countriesServed: "Countries Served",
      monthlyTransactions: "Monthly Transactions",
    },
    fa: {
      title: "مورد اعتماد کسب و کارهای جهانی",
      subtitle: "به هزاران شرکتی که به پلتفرم ما اعتماد دارند بپیوندید",
      verifiedSuppliers: "تامین کنندگان تایید شده",
      activeBuyers: "خریداران فعال",
      countriesServed: "کشورهای تحت پوشش",
      monthlyTransactions: "تراکنش های ماهانه",
    },
    ar: {
      title: "موثوق من قبل الشركات في جميع أنحاء العالم",
      subtitle: "انضم إلى آلاف الشركات التي تعتمد على منصتنا",
      verifiedSuppliers: "الموردون المعتمدون",
      activeBuyers: "المشترون النشطون",
      countriesServed: "البلدان المخدومة",
      monthlyTransactions: "المعاملات الشهرية",
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  const stats = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      value: "10,000+",
      label: t.verifiedSuppliers,
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      value: "25,000+",
      label: t.activeBuyers,
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      value: "150+",
      label: t.countriesServed,
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      value: "$500M+",
      label: t.monthlyTransactions,
    },
  ];

  return (
    <section
      className={`py-16 bg-white ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
            >
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

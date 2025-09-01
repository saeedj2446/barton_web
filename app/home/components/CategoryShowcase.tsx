import React from "react";
import {
  Package,
  Cpu,
  Home,
  Hammer,
  Truck,
  Users,
  Heart,
  Box,
  Activity,
  Gift,
  Star,
  Archive,
  Watch,
  Building,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Language {
  name: string;
  code: string;
  direction: "ltr" | "rtl";
}

interface CategoryShowcaseProps {
  categories?: Category[];
  currentLanguage?: Language;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
                                                             categories = [
                                                               { id: "1", name: "Environment", count: 1240 },
                                                               { id: "2", name: "Consumer Electronics", count: 890 },
                                                               { id: "3", name: "Home & Garden", count: 750 },
                                                               { id: "4", name: "Commercial Equipment & Supplies", count: 680 },
                                                               { id: "5", name: "Vehicle Parts & Accessories", count: 520 },
                                                               { id: "6", name: "Tools & Hardware", count: 430 },
                                                               { id: "7", name: "Mother, Kids & Toys", count: 380 },
                                                               { id: "8", name: "Furniture", count: 320 },
                                                               { id: "9", name: "Business Services", count: 290 },
                                                               { id: "10", name: "Apparel & Accessories", count: 250 },
                                                               { id: "11", name: "Sports & Entertainment", count: 220 },
                                                               { id: "12", name: "Beauty", count: 200 },
                                                               { id: "13", name: "Packaging & Printing", count: 180 },
                                                               { id: "14", name: "Jewelry, Eyewear, Watches & Accessories", count: 160 },
                                                               { id: "15", name: "Industrial Machinery", count: 140 },
                                                               { id: "16", name: "Construction & Real Estate", count: 120 },
                                                             ],
                                                             currentLanguage = { name: "English", code: "en", direction: "ltr" },
                                                           }) => {

  const translations = {
    en: {
      title: "Popular Categories",
      subtitle: "Explore our wide range of wholesale categories",
      categoryNames: {
        Environment: "Environment",
        "Consumer Electronics": "Consumer Electronics",
        "Home & Garden": "Home & Garden",
        "Commercial Equipment & Supplies": "Commercial Equipment & Supplies",
        "Vehicle Parts & Accessories": "Vehicle Parts & Accessories",
        "Tools & Hardware": "Tools & Hardware",
        "Mother, Kids & Toys": "Mother, Kids & Toys",
        Furniture: "Furniture",
        "Business Services": "Business Services",
        "Apparel & Accessories": "Apparel & Accessories",
        "Sports & Entertainment": "Sports & Entertainment",
        Beauty: "Beauty",
        "Packaging & Printing": "Packaging & Printing",
        "Jewelry, Eyewear, Watches & Accessories": "Jewelry, Eyewear, Watches & Accessories",
        "Industrial Machinery": "Industrial Machinery",
        "Construction & Real Estate": "Construction & Real Estate",
      },
    },
    fa: {
      title: "دسته‌بندی‌های محبوب",
      subtitle: "گستره وسیعی از دسته‌بندی‌های عمده‌فروشی را بررسی کنید",
      categoryNames: {
        Environment: "محیط زیست",
        "Consumer Electronics": "الکترونیک مصرفی",
        "Home & Garden": "خانه و باغ",
        "Commercial Equipment & Supplies": "تجهیزات و لوازم تجاری",
        "Vehicle Parts & Accessories": "قطعات و لوازم جانبی خودرو",
        "Tools & Hardware": "ابزار و سخت افزار",
        "Mother, Kids & Toys": "مادر، کودک و اسباب بازی",
        Furniture: "مبلمان",
        "Business Services": "خدمات تجاری",
        "Apparel & Accessories": "پوشاک و لوازم جانبی",
        "Sports & Entertainment": "ورزش و سرگرمی",
        Beauty: "زیبایی",
        "Packaging & Printing": "بسته بندی و چاپ",
        "Jewelry, Eyewear, Watches & Accessories": "جواهرات، عینک، ساعت و لوازم جانبی",
        "Industrial Machinery": "ماشین آلات صنعتی",
        "Construction & Real Estate": "ساخت و ساز و املاک",
      },
    },
    ar: {
      title: "الفئات الشهيرة",
      subtitle: "استكشف مجموعة واسعة من الفئات بالجملة",
      categoryNames: {
        Environment: "البيئة",
        "Consumer Electronics": "الإلكترونيات الاستهلاكية",
        "Home & Garden": "المنزل والحديقة",
        "Commercial Equipment & Supplies": "المعدات واللوازم التجارية",
        "Vehicle Parts & Accessories": "قطع غيار ومستلزمات المركبات",
        "Tools & Hardware": "الأدوات والأجهزة",
        "Mother, Kids & Toys": "الأم والأطفال والألعاب",
        Furniture: "الأثاث",
        "Business Services": "الخدمات التجارية",
        "Apparel & Accessories": "الملابس والإكسسوارات",
        "Sports & Entertainment": "الرياضة والترفيه",
        Beauty: "الجمال",
        "Packaging & Printing": "التعبئة والطباعة",
        "Jewelry, Eyewear, Watches & Accessories": "المجوهرات والنظارات والساعات والإكسسوارات",
        "Industrial Machinery": "الآلات الصناعية",
        "Construction & Real Estate": "البناء والعقارات",
      },
    },
  };

  const t = translations[currentLanguage.code as keyof typeof translations] || translations.en;

  const categoryIcons: Record<string, JSX.Element> = {
    Environment: <Package className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Consumer Electronics": <Cpu className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Home & Garden": <Home className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Commercial Equipment & Supplies": <Hammer className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Vehicle Parts & Accessories": <Truck className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Tools & Hardware": <Hammer className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Mother, Kids & Toys": <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    Furniture: <Box className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Business Services": <Activity className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Apparel & Accessories": <Heart className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Sports & Entertainment": <Cpu className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    Beauty: <Star className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Packaging & Printing": <Archive className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Jewelry, Eyewear, Watches & Accessories": <Watch className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Industrial Machinery": <Cpu className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
    "Construction & Real Estate": <Building className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />,
  };

  return (
      <section
          className={`py-16 px-4 md:px-8 bg-gray-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
          dir={currentLanguage.direction}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t.title}</h2>
         {/* <p className="text-gray-600 mb-12">{t.subtitle}</p>*/}

          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-4 md:gap-6 max-w-6xl mx-auto">
            {categories.slice(0, 16).map((category) => (
                <a
                    key={category.id}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group cursor-pointer block text-center"
                >
                  <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-2 md:mb-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200 flex items-center justify-center border border-gray-100">
                    {categoryIcons[category.name] || <Box className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />}
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
                    {t.categoryNames[category.name as keyof typeof t.categoryNames]}
                  </h3>
                </a>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="w-60 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
             همه دسته بندیها
            </button>
          </div>
        </div>
      </section>
  );
};

export default CategoryShowcase;

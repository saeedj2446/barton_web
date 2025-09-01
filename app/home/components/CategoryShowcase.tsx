import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

interface Category {
  id: string;
  name: string;
  image: string;
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
    {
      id: "1",
      name: "Environment",
      image:
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&q=80",
      count: 1240,
    },
    {
      id: "2",
      name: "Consumer Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80",
      count: 890,
    },
    {
      id: "3",
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
      count: 750,
    },
    {
      id: "4",
      name: "Commercial Equipment & Supplies",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
      count: 680,
    },
    {
      id: "5",
      name: "Vehicle Parts & Accessories",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
      count: 520,
    },
    {
      id: "6",
      name: "Tools & Hardware",
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
      count: 430,
    },
    {
      id: "7",
      name: "Mother, Kids & Toys",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      count: 380,
    },
    {
      id: "8",
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      count: 320,
    },
    {
      id: "9",
      name: "Business Services",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      count: 290,
    },
    {
      id: "10",
      name: "Apparel & Accessories",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      count: 250,
    },
    {
      id: "11",
      name: "Sports & Entertainment",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      count: 220,
    },
    {
      id: "12",
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      count: 200,
    },
    {
      id: "13",
      name: "Packaging & Printing",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      count: 180,
    },
    {
      id: "14",
      name: "Jewelry, Eyewear, Watches & Accessories",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      count: 160,
    },
    {
      id: "15",
      name: "Industrial Machinery",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      count: 140,
    },
    {
      id: "16",
      name: "Construction & Real Estate",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
      count: 120,
    },
  ],
  currentLanguage = { name: "English", code: "en", direction: "ltr" },
}) => {
  // ترجمه ها
  const translations = {
    en: {
      title: "Popular Categories",
      subtitle: "Explore our wide range of wholesale categories",
      products: "products",
      viewAll: "View All Categories",
      categoryNames: {
        Electronics: "Electronics",
        Apparel: "Apparel",
        "Home & Garden": "Home & Garden",
        "Beauty & Health": "Beauty & Health",
        Automotive: "Automotive",
        "Food & Beverage": "Food & Beverage",
      },
    },
    fa: {
      title: "دسته‌بندی‌های محبوب",
      subtitle: "گستره وسیعی از دسته‌بندی‌های عمده‌فروشی را بررسی کنید",
      products: "محصول",
      viewAll: "نمایش همه دسته‌بندی‌ها",
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
        "Jewelry, Eyewear, Watches & Accessories":
          "جواهرات، عینک، ساعت و لوازم جانبی",
        "Industrial Machinery": "ماشین آلات صنعتی",
        "Construction & Real Estate": "ساخت و ساز و املاک",
      },
    },
    ar: {
      title: "الفئات الشهيرة",
      subtitle: "استكشف مجموعة واسعة من الفئات بالجملة",
      products: "منتجات",
      viewAll: "عرض جميع الفئات",
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
        "Jewelry, Eyewear, Watches & Accessories":
          "المجوهرات والنظارات والساعات والإكسسوارات",
        "Industrial Machinery": "الآلات الصناعية",
        "Construction & Real Estate": "البناء والعقارات",
      },
    },
  };

  const t =
    translations[currentLanguage.code as keyof typeof translations] ||
    translations.en;

  return (
    <section
      className={`py-16 px-4 md:px-8 bg-gray-50 ${
        currentLanguage.direction === "rtl" ? "rtl" : "ltr"
      }`}
      dir={currentLanguage.direction}
    >
      <div className="container mx-auto">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore millions of offerings tailored to your business needs
          </h2>
          <div
            className={`flex justify-center items-center gap-8 mb-8 ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">200M+</div>
              <div className="text-sm text-gray-600">products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">200K+</div>
              <div className="text-sm text-gray-600">suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">5,900</div>
              <div className="text-sm text-gray-600">product categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">200+</div>
              <div className="text-sm text-gray-600">countries and regions</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.slice(0, 16).map((category, index) => (
            <a
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group cursor-pointer block text-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200 flex items-center justify-center border border-gray-100">
                <img
                  src={category.image}
                  alt={
                    t.categoryNames[
                      category.name as keyof typeof t.categoryNames
                    ]
                  }
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <h3 className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
                {t.categoryNames[category.name as keyof typeof t.categoryNames]}
              </h3>
            </a>
          ))}
        </div>

        {/* Navigation Arrow */}
        <div className="flex justify-center mt-8">
          <button className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

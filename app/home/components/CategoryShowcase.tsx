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
                                                               { id: "1", name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80", count: 1240 },
                                                               { id: "2", name: "Apparel", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80", count: 890 },
                                                               { id: "3", name: "Home & Garden", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80", count: 750 },
                                                               { id: "4", name: "Beauty & Health", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80", count: 680 },
                                                               { id: "5", name: "Automotive", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", count: 520 },
                                                               { id: "6", name: "Food & Beverage", image: "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=600&q=80", count: 430 },
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
        "Electronics": "Electronics",
        "Apparel": "Apparel",
        "Home & Garden": "Home & Garden",
        "Beauty & Health": "Beauty & Health",
        "Automotive": "Automotive",
        "Food & Beverage": "Food & Beverage",
      },
    },
    fa: {
      title: "دسته‌بندی‌های محبوب",
      subtitle: "گستره وسیعی از دسته‌بندی‌های عمده‌فروشی را بررسی کنید",
      products: "محصول",
      viewAll: "نمایش همه دسته‌بندی‌ها",
      categoryNames: {
        "Electronics": "الکترونیک",
        "Apparel": "پوشاک",
        "Home & Garden": "خانه و باغ",
        "Beauty & Health": "زیبایی و سلامت",
        "Automotive": "خودرو",
        "Food & Beverage": "خوراکی و نوشیدنی",
      },
    },
    ar: {
      title: "الفئات الشهيرة",
      subtitle: "استكشف مجموعة واسعة من الفئات بالجملة",
      products: "منتجات",
      viewAll: "عرض جميع الفئات",
      categoryNames: {
        "Electronics": "الإلكترونات",
        "Apparel": "الملابس",
        "Home & Garden": "المنزل والحديقة",
        "Beauty & Health": "الجمال والصحة",
        "Automotive": "السيارات",
        "Food & Beverage": "الطعام والشراب",
      },
    },
  };

  const t =
      translations[currentLanguage.code as keyof typeof translations] ||
      translations.en;

  return (
      <section
          className={`py-10 px-4 md:px-8 bg-white ${
              currentLanguage.direction === "rtl" ? "rtl" : "ltr"
          }`}
          dir={currentLanguage.direction}
      >
        <div className="container mx-auto">
          {/* عنوان */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.title}</h2>
            {/*<p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>*/}
          </div>

          {/* کارت‌ها */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
                <a
                    key={category.id}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 block"
                >
                  <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                          src={category.image}
                          alt={t.categoryNames[category.name as keyof typeof t.categoryNames]}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 text-center bg-white">
                      <h3 className="font-medium text-gray-800">
                        {t.categoryNames[category.name as keyof typeof t.categoryNames]}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.count.toLocaleString()} {t.products}
                      </p>
                    </CardContent>
                  </Card>
                </a>
            ))}
          </div>

          {/* دکمه نمایش همه */}
          <div className="mt-10 text-center">
            <button className="px-6 py-2 bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300">
              {t.viewAll}
            </button>
          </div>
        </div>
      </section>
  );
};

export default CategoryShowcase;

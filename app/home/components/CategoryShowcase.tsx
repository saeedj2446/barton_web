import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface CategoryShowcaseProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categories = [
    {
      id: "1",
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80",
      count: 1240,
    },
    {
      id: "2",
      name: "Apparel",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
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
      name: "Beauty & Health",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      count: 680,
    },
    {
      id: "5",
      name: "Automotive",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
      count: 520,
    },
    {
      id: "6",
      name: "Food & Beverage",
      image:
        "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=600&q=80",
      count: 430,
    },
  ],
  title = "Popular Categories",
  subtitle = "Explore our wide range of wholesale categories",
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

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
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center bg-white">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.count.toLocaleString()} products
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-2 bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

"use client";

import React from "react";
import { Star, MapPin, Truck, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductFilters {
  category: string;
  subcategory: string;
  sellerType: string;
  province: string;
  city: string;
  priceRange: { min: number; max: number };
}

interface ProductListProps {
  viewMode: "grid" | "list";
  sortBy: string;
  filters: ProductFilters;
  onCompareProduct: (productId: string) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: {
    name: string;
    type: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  features: {
    fastShipping: boolean;
    acceptsCheck: boolean;
    minOrder: number;
  };
  discount?: number;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "گوشی موبایل سامسونگ Galaxy A54",
    price: 8500000,
    originalPrice: 9200000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    seller: {
      name: "فروشگاه کسری",
      type: "عمده‌فروش",
      rating: 4.8,
      location: "تهران",
      verified: true,
    },
    features: {
      fastShipping: true,
      acceptsCheck: true,
      minOrder: 10,
    },
    discount: 8,
  },
  {
    id: "2",
    name: "لپ‌تاپ ایسوس VivoBook 15",
    price: 15200000,
    originalPrice: 16800000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    seller: {
      name: "شرکت پخش آرمان",
      type: "شرکت پخش",
      rating: 4.6,
      location: "اصفهان",
      verified: true,
    },
    features: {
      fastShipping: false,
      acceptsCheck: true,
      minOrder: 5,
    },
    discount: 10,
  },
  {
    id: "3",
    name: "تبلت اپل iPad Air",
    price: 22500000,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    seller: {
      name: "فروشگاه امید",
      type: "لید کننده",
      rating: 4.9,
      location: "تهران",
      verified: false,
    },
    features: {
      fastShipping: true,
      acceptsCheck: false,
      minOrder: 3,
    },
  },
  {
    id: "4",
    name: "هدفون بی‌سیم سونی WH-1000XM4",
    price: 4200000,
    originalPrice: 4800000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    seller: {
      name: "تک‌دیجیتال",
      type: "تولیدکننده",
      rating: 4.7,
      location: "شیراز",
      verified: true,
    },
    features: {
      fastShipping: true,
      acceptsCheck: true,
      minOrder: 20,
    },
    discount: 12,
  },
  {
    id: "5",
    name: "ساعت هوشمند اپل Watch Series 8",
    price: 12800000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
    seller: {
      name: "گجت استور",
      type: "عمده‌فروش",
      rating: 4.5,
      location: "مشهد",
      verified: true,
    },
    features: {
      fastShipping: false,
      acceptsCheck: true,
      minOrder: 8,
    },
  },
  {
    id: "6",
    name: "دوربین کانن EOS R6",
    price: 35600000,
    originalPrice: 38200000,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
    seller: {
      name: "عکاسی پرو",
      type: "شرکت پخش",
      rating: 4.8,
      location: "تبریز",
      verified: true,
    },
    features: {
      fastShipping: true,
      acceptsCheck: false,
      minOrder: 2,
    },
    discount: 7,
  },
];

export default function ProductList({
  viewMode,
  sortBy,
  filters,
  onCompareProduct,
}: ProductListProps) {
  // Filter products based on filters
  const filteredProducts = mockProducts.filter((product) => {
    if (filters.subcategory) {
      // Simple name matching - in real app, you'd have proper category matching
      const subcategoryKeywords = {
        موبایل: ["گوشی", "موبایل"],
        لپ‌تاپ: ["لپ‌تاپ", "لپتاپ"],
        تبلت: ["تبلت"],
        هدفون: ["هدفون"],
        "ساعت هوشمند": ["ساعت"],
        دوربین: ["دوربین"],
      };

      const keywords =
        subcategoryKeywords[
          filters.subcategory as keyof typeof subcategoryKeywords
        ] || [];
      if (!keywords.some((keyword) => product.name.includes(keyword))) {
        return false;
      }
    }

    if (filters.sellerType && product.seller.type !== filters.sellerType) {
      return false;
    }

    if (
      filters.province &&
      !product.seller.location.includes(filters.province)
    ) {
      return false;
    }

    if (filters.priceRange.min > 0 && product.price < filters.priceRange.min) {
      return false;
    }

    if (
      filters.priceRange.max < 10000000 &&
      product.price > filters.priceRange.max
    ) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.seller.rating - a.seller.rating;
      case "discount":
        return (b.discount || 0) - (a.discount || 0);
      default: // newest
        return 0;
    }
  });

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            {product.discount}% تخفیف
          </Badge>
        )}
        {product.seller.verified && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
            تایید شده
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">
                {product.price.toLocaleString()} تومان
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-600">
            حداقل سفارش: {product.features.minOrder} عدد
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="font-medium">{product.seller.name}</span>
            <span className="text-gray-500">({product.seller.type})</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.seller.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{product.seller.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {product.features.fastShipping && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Truck className="w-3 h-3" />
              <span>ارسال سریع</span>
            </div>
          )}
          {product.features.acceptsCheck && (
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <CreditCard className="w-3 h-3" />
              <span>چک</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 h-8 text-xs" asChild>
            <a href={`/products/${product.id}`}>مشاهده جزئیات</a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCompareProduct(product.id)}
            className="h-8 w-8 p-0"
          >
            <BarChart3 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {product.discount && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                {product.discount}%
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm line-clamp-2 flex-1">
                {product.name}
              </h3>
              <div className="text-right ml-4">
                <div className="text-lg font-bold text-primary">
                  {product.price.toLocaleString()} تومان
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium">{product.seller.name}</span>
                <span className="text-gray-500">({product.seller.type})</span>
                {product.seller.verified && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    تایید شده
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{product.seller.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{product.seller.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-600">
                  حداقل: {product.features.minOrder} عدد
                </span>
                {product.features.fastShipping && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Truck className="w-3 h-3" />
                    <span>ارسال سریع</span>
                  </div>
                )}
                {product.features.acceptsCheck && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <CreditCard className="w-3 h-3" />
                    <span>پذیرش چک</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs px-3" asChild>
                  <a href={`/products/${product.id}`}>مشاهده جزئیات</a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCompareProduct(product.id)}
                  className="h-7 w-7 p-0"
                >
                  <BarChart3 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-2">محصولی با این فیلترها یافت نشد</div>
        <div className="text-sm text-gray-400">
          لطفاً فیلترهای خود را تغییر دهید
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "space-y-4"
      }
    >
      {sortedProducts.map((product) =>
        viewMode === "grid" ? (
          <ProductCard key={product.id} product={product} />
        ) : (
          <ProductListItem key={product.id} product={product} />
        ),
      )}
    </div>
  );
}

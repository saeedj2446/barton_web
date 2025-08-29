"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import { AddProductModal } from "./AddProductModal";
import { BulkPriceUpdateModal } from "./BulkPriceUpdateModal";
import type { Product, ProductFilters } from "@/lib/types";

interface ProductManagementProps {
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
  translations: any;
}

export default function ProductManagement({
  currentLanguage,
  translations: t,
}: ProductManagementProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showBulkPriceUpdate, setShowBulkPriceUpdate] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    status: "all",
    category: "all",
    priceRange: { min: 0, max: 1000000 },
    stockStatus: "all",
    searchQuery: "",
  });

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "گوشی موبایل سامسونگ Galaxy S24",
      description: "گوشی هوشمند پرچمدار سامسونگ با دوربین 200 مگاپیکسل",
      price: 25000000,
      originalPrice: 28000000,
      category: "موبایل",
      subcategory: "گوشی هوشمند",
      brand: "سامسونگ",
      sku: "SAM-S24-256",
      stock: 15,
      minStock: 5,
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
      ],
      tags: ["پرچمدار", "5G", "دوربین حرفه‌ای"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      lastPriceUpdate: "2024-01-18",
    },
    {
      id: "2",
      name: "لپ‌تاپ ایسوس ROG Strix",
      description: "لپ‌تاپ گیمینگ قدرتمند با کارت گرافیک RTX 4060",
      price: 45000000,
      category: "لپ‌تاپ",
      subcategory: "گیمینگ",
      brand: "ایسوس",
      sku: "ASUS-ROG-15",
      stock: 3,
      minStock: 5,
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
      ],
      tags: ["گیمینگ", "RTX 4060", "RGB"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15",
    },
    {
      id: "3",
      name: "هدفون بی‌سیم سونی WH-1000XM5",
      description: "هدفون بی‌سیم با قابلیت حذف نویز فعال",
      price: 0,
      category: "صوتی",
      subcategory: "هدفون",
      brand: "سونی",
      sku: "SONY-WH1000XM5",
      stock: 8,
      minStock: 3,
      status: "draft",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      ],
      tags: ["بی‌سیم", "نویز کنسلینگ"],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
    },
    {
      id: "4",
      name: "ساعت هوشمند اپل واچ Series 9",
      description: "ساعت هوشمند اپل با سنسورهای پیشرفته سلامت",
      price: 18000000,
      category: "پوشیدنی",
      subcategory: "ساعت هوشمند",
      brand: "اپل",
      sku: "APPLE-WATCH-S9",
      stock: 0,
      minStock: 2,
      status: "out_of_stock",
      images: [
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80",
      ],
      tags: ["سلامت", "فیتنس", "GPS"],
      createdAt: "2024-01-08",
      updatedAt: "2024-01-19",
    },
    {
      id: "5",
      name: "تبلت آیپد Air M2",
      description: "تبلت قدرتمند اپل با چیپ M2 و صفحه نمایش Liquid Retina",
      price: 32000000,
      category: "تبلت",
      brand: "اپل",
      sku: "IPAD-AIR-M2",
      stock: 12,
      minStock: 4,
      status: "inactive",
      images: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
      ],
      tags: ["M2", "طراحی", "تولید محتوا"],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-14",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        filters.searchQuery &&
        !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && product.status !== filters.status) {
        return false;
      }

      // Stock status filter
      if (filters.stockStatus !== "all") {
        if (filters.stockStatus === "out_of_stock" && product.stock > 0)
          return false;
        if (
          filters.stockStatus === "low_stock" &&
          (product.stock === 0 || product.stock > product.minStock)
        )
          return false;
        if (
          filters.stockStatus === "in_stock" &&
          product.stock <= product.minStock
        )
          return false;
      }

      return true;
    });
  }, [products, filters]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "active").length;
    const inactive = products.filter((p) => p.status === "inactive").length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const lowStock = products.filter(
      (p) => p.stock > 0 && p.stock <= p.minStock,
    ).length;
    const withoutPrice = products.filter((p) => p.price === 0).length;
    const needsUpdate = products.filter((p) => {
      if (!p.lastPriceUpdate) return true;
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(p.lastPriceUpdate).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return daysSinceUpdate > 30;
    }).length;

    return {
      total,
      active,
      inactive,
      outOfStock,
      lowStock,
      withoutPrice,
      needsUpdate,
    };
  }, [products]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            مدیریت کالاها
          </h1>
          <p className="text-muted-foreground text-lg">
            مدیریت محصولات، قیمت‌ها و موجودی انبار
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">کل محصولات</span>
              </div>
              <div className="text-2xl font-bold text-blue-500">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">فعال</span>
              </div>
              <div className="text-2xl font-bold text-green-500">
                {stats.active}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <EyeOff className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">غیرفعال</span>
              </div>
              <div className="text-2xl font-bold text-gray-500">
                {stats.inactive}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">ناموجود</span>
              </div>
              <div className="text-2xl font-bold text-red-500">
                {stats.outOfStock}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">کم موجود</span>
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {stats.lowStock}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">بدون قیمت</span>
              </div>
              <div className="text-2xl font-bold text-purple-500">
                {stats.withoutPrice}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">نیاز به بروزرسانی</span>
              </div>
              <div className="text-2xl font-bold text-amber-500">
                {stats.needsUpdate}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="bg-card rounded-lg border p-4 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-primary hover:bg-primary/90 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                محصول جدید
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowBulkPriceUpdate(true)}
                disabled={selectedProducts.length === 0}
                className="transition-all duration-200"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                ویرایش گروهی قیمت ({selectedProducts.length})
              </Button>

              <Button variant="outline" className="transition-all duration-200">
                <Package className="h-4 w-4 mr-2" />
                بروزرسانی موجودی
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="جستجو در محصولات..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="pr-10 w-full sm:w-64 transition-all duration-200"
                />
              </div>

              <Select
                value={filters.status}
                onValueChange={(value: any) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیرفعال</SelectItem>
                  <SelectItem value="draft">پیش‌نویس</SelectItem>
                  <SelectItem value="out_of_stock">ناموجود</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.stockStatus}
                onValueChange={(value: any) =>
                  setFilters((prev) => ({ ...prev, stockStatus: value }))
                }
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="موجودی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="in_stock">موجود</SelectItem>
                  <SelectItem value="low_stock">کم موجود</SelectItem>
                  <SelectItem value="out_of_stock">ناموجود</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {selectedProducts.length} محصول انتخاب شده
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleSelectAll}>
                    انتخاب همه
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProducts([])}
                  >
                    لغو انتخاب
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
          {filteredProducts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  محصولی یافت نشد
                </h3>
                <p className="text-muted-foreground">
                  {filters.searchQuery
                    ? "محصولی با این جستجو یافت نشد"
                    : "هنوز محصولی اضافه نکرده‌اید"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onSelect={() => handleSelectProduct(product.id)}
                  currentLanguage={currentLanguage}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddProductModal
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
        currentLanguage={currentLanguage}
      />

      <BulkPriceUpdateModal
        open={showBulkPriceUpdate}
        onOpenChange={setShowBulkPriceUpdate}
        selectedProducts={selectedProducts}
        products={products.filter((p) => selectedProducts.includes(p.id))}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

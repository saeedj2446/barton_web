"use client";

import React, { useState } from "react";
import { ArrowRight, Grid3X3, List, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductFilterBar from "./components/ProductFilterBar";
import ProductList from "./components/ProductList";
import SortDropdown from "./components/SortDropdown";
import VendorComparisonTable from "./components/VendorComparisonTable";

interface ProductFilters {
  category: string;
  subcategory: string;
  sellerType: string;
  province: string;
  city: string;
  priceRange: { min: number; max: number };
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showComparison, setShowComparison] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    category: "الکترونیک",
    subcategory: "",
    sellerType: "",
    province: "",
    city: "",
    priceRange: { min: 0, max: 10000000 },
  });

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleCompareProduct = (productId: string) => {
    setSelectedProduct(productId);
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>خانه</span>
            <ArrowRight className="w-4 h-4" />
            <span>دسته‌بندی‌ها</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-primary font-medium">{filters.category}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            محصولات {filters.category}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              isMobile={false}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Bar */}
            <div className="lg:hidden mb-4">
              <ProductFilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                isMobile={true}
              />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">۱۲۳ محصول یافت شد</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <SortDropdown value={sortBy} onChange={setSortBy} />

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Compare Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  مقایسه
                </Button>
              </div>
            </div>

            {/* Product List */}
            <ProductList
              viewMode={viewMode}
              sortBy={sortBy}
              filters={filters}
              onCompareProduct={handleCompareProduct}
            />

            {/* Vendor Comparison Table */}
            {showComparison && (
              <div className="mt-8">
                <Card className="p-6">
                  <VendorComparisonTable productId={selectedProduct} />
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

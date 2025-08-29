"use client";

import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
}

export function ProductCard({
  product,
  isSelected,
  onSelect,
  currentLanguage,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getStatusBadge = (status: Product["status"]) => {
    const statusConfig = {
      active: {
        label: "فعال",
        variant: "default" as const,
        className: "bg-green-500 hover:bg-green-600",
      },
      inactive: {
        label: "غیرفعال",
        variant: "secondary" as const,
        className: "bg-gray-500 hover:bg-gray-600",
      },
      out_of_stock: {
        label: "ناموجود",
        variant: "destructive" as const,
        className: "bg-red-500 hover:bg-red-600",
      },
      draft: {
        label: "پیش‌نویس",
        variant: "outline" as const,
        className: "border-orange-500 text-orange-600",
      },
    };

    const config = statusConfig[status];
    return (
      <Badge
        variant={config.variant}
        className={cn("text-xs", config.className)}
      >
        {config.label}
      </Badge>
    );
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { icon: AlertTriangle, color: "text-red-500", label: "ناموجود" };
    } else if (product.stock <= product.minStock) {
      return {
        icon: AlertTriangle,
        color: "text-orange-500",
        label: "کم موجود",
      };
    } else {
      return { icon: Package, color: "text-green-500", label: "موجود" };
    }
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-0 shadow-md overflow-hidden",
        "hover:scale-[1.02] hover:border-primary/20",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isSelected && "ring-2 ring-primary/50 border-primary/30",
      )}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Selection Checkbox */}
          <div className="absolute top-3 left-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className="bg-white/90 border-white shadow-sm"
            />
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {getStatusBadge(product.status)}
          </div>

          {/* Price Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-red-500 hover:bg-red-600 text-white">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % تخفیف
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] leading-6">
            {product.name}
          </h3>

          {/* SKU and Brand */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
              {product.sku}
            </span>
            {product.brand && <span className="text-xs">{product.brand}</span>}
          </div>

          {/* Price */}
          <div className="mb-3">
            {product.price > 0 ? (
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">قیمت تعیین نشده</span>
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                stockStatus.color,
              )}
            >
              <StockIcon className="h-4 w-4" />
              <span>{stockStatus.label}</span>
            </div>
            <span className="text-sm text-gray-600">
              موجودی: {product.stock}
            </span>
          </div>

          {/* Category */}
          <div className="mb-4">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-8 hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Edit className="h-3 w-3 mr-1" />
              ویرایش
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              {product.status === "active" ? (
                <EyeOff className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

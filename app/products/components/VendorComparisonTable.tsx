"use client";

import React from "react";
import {
  Star,
  MapPin,
  Truck,
  CreditCard,
  Check,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VendorComparisonTableProps {
  productId: string | null;
}

interface Vendor {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: number;
  originalPrice?: number;
  acceptsCheck: boolean;
  fastShipping: boolean;
  distance: string;
  minOrder: number;
  stock: number;
  paymentTerms: string;
  shippingCost: number;
  deliveryTime: string;
  verified: boolean;
  responseTime: string;
  location: string;
}

// Mock vendor data
const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "فروشگاه کسری",
    type: "عمده‌فروش",
    rating: 4.8,
    price: 8500000,
    originalPrice: 9200000,
    acceptsCheck: true,
    fastShipping: true,
    distance: "5 کیلومتر",
    minOrder: 10,
    stock: 150,
    paymentTerms: "نقد / چک ۳۰ روزه",
    shippingCost: 0,
    deliveryTime: "۲۴ ساعت",
    verified: true,
    responseTime: "کمتر از ۱ ساعت",
    location: "تهران، میدان ولیعصر",
  },
  {
    id: "2",
    name: "فروشگاه امید",
    type: "لید کننده",
    rating: 4.9,
    price: 8750000,
    acceptsCheck: false,
    fastShipping: true,
    distance: "8 کیلومتر",
    minOrder: 5,
    stock: 80,
    paymentTerms: "نقد / کارت",
    shippingCost: 50000,
    deliveryTime: "۴۸ ساعت",
    verified: false,
    responseTime: "۲-۳ ساعت",
    location: "تهران، بازار موبایل علاءالدین",
  },
  {
    id: "3",
    name: "شرکت پخش آرمان",
    type: "شرکت پخش",
    rating: 4.6,
    price: 8300000,
    originalPrice: 8900000,
    acceptsCheck: true,
    fastShipping: false,
    distance: "12 کیلومتر",
    minOrder: 20,
    stock: 300,
    paymentTerms: "نقد / چک ۶۰ روزه",
    shippingCost: 100000,
    deliveryTime: "۳-۵ روز",
    verified: true,
    responseTime: "۱-۲ ساعت",
    location: "کرج، شهرک صنعتی",
  },
  {
    id: "4",
    name: "تک‌دیجیتال",
    type: "تولیدکننده",
    rating: 4.7,
    price: 8200000,
    acceptsCheck: true,
    fastShipping: true,
    distance: "15 کیلومتر",
    minOrder: 50,
    stock: 500,
    paymentTerms: "نقد / چک ۹۰ روزه",
    shippingCost: 0,
    deliveryTime: "۱-۲ روز",
    verified: true,
    responseTime: "کمتر از ۳۰ دقیقه",
    location: "تهران، شهرک غرب",
  },
];

export default function VendorComparisonTable({
  productId,
}: VendorComparisonTableProps) {
  // Find the best vendor for each criteria
  const bestPrice = Math.min(...mockVendors.map((v) => v.price));
  const bestRating = Math.max(...mockVendors.map((v) => v.rating));
  const bestStock = Math.max(...mockVendors.map((v) => v.stock));
  const lowestMinOrder = Math.min(...mockVendors.map((v) => v.minOrder));

  const getBestBadge = (condition: boolean) => {
    if (!condition) return null;
    return (
      <Badge className="bg-green-100 text-green-800 text-xs px-1 py-0 ml-1">
        بهترین
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">مقایسه فروشندگان</h3>
        <Badge variant="outline" className="text-xs">
          {mockVendors.length} فروشنده
        </Badge>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        مقایسه قیمت و شرایط فروش برای{" "}
        <span className="font-medium">گوشی موبایل سامسونگ Galaxy A54</span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-right">
                فروشنده
              </TableHead>
              <TableHead className="font-semibold text-center">قیمت</TableHead>
              <TableHead className="font-semibold text-center">
                امتیاز
              </TableHead>
              <TableHead className="font-semibold text-center">
                شرایط پرداخت
              </TableHead>
              <TableHead className="font-semibold text-center">ارسال</TableHead>
              <TableHead className="font-semibold text-center">فاصله</TableHead>
              <TableHead className="font-semibold text-center">
                حداقل سفارش
              </TableHead>
              <TableHead className="font-semibold text-center">
                موجودی
              </TableHead>
              <TableHead className="font-semibold text-center">
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVendors.map((vendor) => (
              <TableRow key={vendor.id} className="hover:bg-gray-50">
                {/* Vendor Info */}
                <TableCell className="min-w-[200px]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{vendor.name}</span>
                      {vendor.verified && (
                        <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{vendor.type}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {vendor.location}
                    </div>
                    <div className="text-xs text-gray-500">
                      پاسخ: {vendor.responseTime}
                    </div>
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold text-primary text-sm">
                        {vendor.price.toLocaleString()}
                      </span>
                      {getBestBadge(vendor.price === bestPrice)}
                    </div>
                    {vendor.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        {vendor.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-xs text-gray-600">تومان</div>
                  </div>
                </TableCell>

                {/* Rating */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                    {getBestBadge(vendor.rating === bestRating)}
                  </div>
                </TableCell>

                {/* Payment Terms */}
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="text-xs">{vendor.paymentTerms}</div>
                    <div className="flex items-center justify-center gap-2">
                      {vendor.acceptsCheck ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="w-3 h-3" />
                          <span className="text-xs">چک</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500">
                          <X className="w-3 h-3" />
                          <span className="text-xs">چک</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Shipping */}
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      {vendor.fastShipping ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Truck className="w-3 h-3" />
                          <span className="text-xs">سریع</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Truck className="w-3 h-3" />
                          <span className="text-xs">عادی</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {vendor.deliveryTime}
                    </div>
                    {vendor.shippingCost > 0 ? (
                      <div className="text-xs text-red-600">
                        هزینه: {vendor.shippingCost.toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-xs text-green-600">رایگان</div>
                    )}
                  </div>
                </TableCell>

                {/* Distance */}
                <TableCell className="text-center">
                  <div className="text-xs">{vendor.distance}</div>
                </TableCell>

                {/* Min Order */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm">{vendor.minOrder} عدد</span>
                    {getBestBadge(vendor.minOrder === lowestMinOrder)}
                  </div>
                </TableCell>

                {/* Stock */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-medium">{vendor.stock}</span>
                    {getBestBadge(vendor.stock === bestStock)}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="flex flex-col gap-1">
                    <Button size="sm" className="h-7 text-xs px-2">
                      تماس
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs px-2"
                    >
                      پیام
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">خلاصه مقایسه:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-green-600">💰</span>
            <span>
              بهترین قیمت: <strong>تک‌دیجیتال</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span>
              بالاترین امتیاز: <strong>فروشگاه امید</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🚚</span>
            <span>
              نزدیک‌ترین: <strong>فروشگاه کسری</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-600">📦</span>
            <span>
              بیشترین موجودی: <strong>تک‌دیجیتال</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

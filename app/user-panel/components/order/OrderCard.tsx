"use client";

import React from "react";
import {
  Eye,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
  translations: any;
}

export function OrderCard({
  order,
  currentLanguage,
  translations: t,
}: OrderCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "returned":
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "returned":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار";
      case "confirmed":
        return "تایید شده";
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "delivered":
        return "تحویل داده شده";
      case "cancelled":
        return "لغو شده";
      case "returned":
        return "مرجوع شده";
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "پرداخت شده";
      case "pending":
        return "در انتظار پرداخت";
      case "failed":
        return "پرداخت ناموفق";
      case "refunded":
        return "بازگردانده شده";
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Order Info */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">شماره سفارش</p>
                <p className="text-lg font-bold text-gray-900">
                  {order.orderNumber}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getStatusColor(order.status)} border`}>
                  {getStatusIcon(order.status)}
                  <span className="mr-1">{getStatusText(order.status)}</span>
                </Badge>
                <Badge
                  className={`${getPaymentStatusColor(order.paymentStatus)} border`}
                >
                  {getPaymentStatusText(order.paymentStatus)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">مشتری</p>
                <p className="font-semibold text-gray-900">
                  {order.customerName}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-3 w-3" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{order.customerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  جزئیات سفارش
                </p>
                <p className="text-sm text-gray-700">
                  {order.items.length} کالا • {formatPrice(order.total)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">تاریخ ثبت</p>
                <p className="text-sm text-gray-700">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              {order.trackingNumber && (
                <div>
                  <p className="text-sm font-medium text-gray-600">کد رهگیری</p>
                  <p className="text-sm font-mono text-blue-600">
                    {order.trackingNumber}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-all duration-200 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                مشاهده جزئیات
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-all duration-200 hover:bg-green-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                ویرایش سفارش
              </Button>
              {order.shippingAddress && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start transition-all duration-200 hover:bg-purple-50"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  آدرس تحویل
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        {order.items.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-3">
              کالاهای سفارش:
            </p>
            <div className="flex flex-wrap gap-3">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 min-w-0"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-600">
                      تعداد: {item.quantity} • {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center bg-gray-100 rounded-lg p-3 min-w-[100px]">
                  <span className="text-sm text-gray-600">
                    +{order.items.length - 3} کالای دیگر
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {order.notes && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 mb-1">یادداشت:</p>
            <p className="text-sm text-yellow-700">{order.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

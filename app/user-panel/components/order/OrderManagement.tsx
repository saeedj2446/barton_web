"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
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
import { OrderCard } from "./OrderCard";
import { OrderStats } from "./OrderStats";
import type { Order, OrderFilters } from "@/lib/types";

interface OrderManagementProps {
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
  translations: any;
}

export function OrderManagement({
  currentLanguage,
  translations: t,
}: OrderManagementProps) {
  const [filters, setFilters] = useState<OrderFilters>({
    status: "all",
    paymentStatus: "all",
    dateRange: {
      from: "",
      to: "",
    },
    searchQuery: "",
  });

  // Sample orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customerId: "cust-1",
      customerName: "احمد محمدی",
      customerEmail: "ahmad@example.com",
      customerPhone: "09123456789",
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "card",
      items: [
        {
          id: "item-1",
          productId: "prod-1",
          productName: "گوشی موبایل سامسونگ Galaxy S24",
          productImage:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
          sku: "SAM-S24-256",
          quantity: 1,
          unitPrice: 25000000,
          totalPrice: 25000000,
        },
      ],
      subtotal: 25000000,
      tax: 2250000,
      shipping: 500000,
      discount: 0,
      total: 27750000,
      shippingAddress: {
        street: "خیابان ولیعصر، پلاک 123",
        city: "تهران",
        state: "تهران",
        postalCode: "1234567890",
        country: "ایران",
      },
      createdAt: "2024-01-20T10:30:00Z",
      updatedAt: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customerId: "cust-2",
      customerName: "فاطمه احمدی",
      customerEmail: "fateme@example.com",
      customerPhone: "09187654321",
      status: "processing",
      paymentStatus: "paid",
      paymentMethod: "bank_transfer",
      items: [
        {
          id: "item-2",
          productId: "prod-2",
          productName: "لپ‌تاپ ایسوس ROG Strix",
          productImage:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
          sku: "ASUS-ROG-15",
          quantity: 1,
          unitPrice: 45000000,
          totalPrice: 45000000,
        },
      ],
      subtotal: 45000000,
      tax: 4050000,
      shipping: 0,
      discount: 2000000,
      total: 47050000,
      shippingAddress: {
        street: "خیابان آزادی، کوچه 15",
        city: "اصفهان",
        state: "اصفهان",
        postalCode: "9876543210",
        country: "ایران",
      },
      createdAt: "2024-01-19T14:15:00Z",
      updatedAt: "2024-01-20T09:00:00Z",
      trackingNumber: "TRK-123456789",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customerId: "cust-3",
      customerName: "علی رضایی",
      customerEmail: "ali@example.com",
      customerPhone: "09112345678",
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "cash",
      items: [
        {
          id: "item-3",
          productId: "prod-3",
          productName: "هدفون بی‌سیم سونی WH-1000XM5",
          productImage:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
          sku: "SONY-WH1000XM5",
          quantity: 2,
          unitPrice: 8500000,
          totalPrice: 17000000,
        },
      ],
      subtotal: 17000000,
      tax: 1530000,
      shipping: 300000,
      discount: 500000,
      total: 18330000,
      shippingAddress: {
        street: "خیابان امام خمینی، پلاک 456",
        city: "شیراز",
        state: "فارس",
        postalCode: "5555666677",
        country: "ایران",
      },
      createdAt: "2024-01-18T16:45:00Z",
      updatedAt: "2024-01-20T11:30:00Z",
      estimatedDelivery: "2024-01-22T12:00:00Z",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      customerId: "cust-4",
      customerName: "مریم کریمی",
      customerEmail: "maryam@example.com",
      customerPhone: "09198765432",
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "card",
      items: [
        {
          id: "item-4",
          productId: "prod-4",
          productName: "ساعت هوشمند اپل واچ Series 9",
          productImage:
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80",
          sku: "APPLE-WATCH-S9",
          quantity: 1,
          unitPrice: 18000000,
          totalPrice: 18000000,
        },
      ],
      subtotal: 18000000,
      tax: 1620000,
      shipping: 400000,
      discount: 0,
      total: 20020000,
      shippingAddress: {
        street: "خیابان فردوسی، کوچه 8",
        city: "مشهد",
        state: "خراسان رضوی",
        postalCode: "7777888899",
        country: "ایران",
      },
      notes: "لغو به درخواست مشتری",
      createdAt: "2024-01-17T12:20:00Z",
      updatedAt: "2024-01-18T10:15:00Z",
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      customerId: "cust-5",
      customerName: "حسن موسوی",
      customerEmail: "hassan@example.com",
      customerPhone: "09156789012",
      status: "shipped",
      paymentStatus: "paid",
      paymentMethod: "wallet",
      items: [
        {
          id: "item-5",
          productId: "prod-5",
          productName: "تبلت آیپد Air M2",
          productImage:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
          sku: "IPAD-AIR-M2",
          quantity: 1,
          unitPrice: 32000000,
          totalPrice: 32000000,
        },
      ],
      subtotal: 32000000,
      tax: 2880000,
      shipping: 600000,
      discount: 1500000,
      total: 33980000,
      shippingAddress: {
        street: "خیابان انقلاب، پلاک 789",
        city: "تبریز",
        state: "آذربایجان شرقی",
        postalCode: "3333444455",
        country: "ایران",
      },
      createdAt: "2024-01-16T08:30:00Z",
      updatedAt: "2024-01-19T15:45:00Z",
      trackingNumber: "TRK-987654321",
      estimatedDelivery: "2024-01-21T14:00:00Z",
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter
      if (
        filters.searchQuery &&
        !order.orderNumber
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !order.customerName
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && order.status !== filters.status) {
        return false;
      }

      // Payment status filter
      if (
        filters.paymentStatus !== "all" &&
        order.paymentStatus !== filters.paymentStatus
      ) {
        return false;
      }

      return true;
    });
  }, [orders, filters]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const processing = orders.filter((o) => o.status === "processing").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const returned = orders.filter((o) => o.status === "returned").length;

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.total, 0);

    const averageOrder =
      totalRevenue /
      Math.max(orders.filter((o) => o.paymentStatus === "paid").length, 1);

    const today = new Date().toISOString().split("T")[0];
    const todayOrders = orders.filter((o) =>
      o.createdAt.startsWith(today),
    ).length;

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      returned,
      totalRevenue,
      averageOrder,
      todayOrders,
    };
  }, [orders]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
          {t.orderManagement}
        </h1>
        <p className="text-muted-foreground text-lg">
          مدیریت و پیگیری سفارشات مشتریان
        </p>
      </div>

      {/* Statistics */}
      <OrderStats stats={stats} translations={t} />

      {/* Filters */}
      <div className="bg-card rounded-lg border p-4 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
        <div
          className={`flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between ${currentLanguage.direction === "rtl" ? "lg:flex-row-reverse" : ""}`}
        >
          <div
            className={`flex flex-col sm:flex-row gap-3 flex-1 ${currentLanguage.direction === "rtl" ? "sm:flex-row-reverse" : ""}`}
          >
            <div className="relative">
              <Search
                className={`absolute ${currentLanguage.direction === "rtl" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
              />
              <Input
                placeholder={t.search}
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                className={`${currentLanguage.direction === "rtl" ? "pr-10" : "pl-10"} w-full sm:w-64 transition-all duration-200`}
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
                <SelectItem value="pending">{t.pending}</SelectItem>
                <SelectItem value="confirmed">{t.confirmed}</SelectItem>
                <SelectItem value="processing">{t.processing}</SelectItem>
                <SelectItem value="shipped">{t.shipped}</SelectItem>
                <SelectItem value="delivered">{t.delivered}</SelectItem>
                <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                <SelectItem value="returned">{t.returned}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.paymentStatus}
              onValueChange={(value: any) =>
                setFilters((prev) => ({ ...prev, paymentStatus: value }))
              }
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="وضعیت پرداخت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="pending">در انتظار</SelectItem>
                <SelectItem value="paid">پرداخت شده</SelectItem>
                <SelectItem value="failed">ناموفق</SelectItem>
                <SelectItem value="refunded">بازگردانده شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {t.noOrders}
              </h3>
              <p className="text-muted-foreground">
                {filters.searchQuery
                  ? "سفارشی با این جستجو یافت نشد"
                  : "هنوز سفارشی ثبت نشده است"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                currentLanguage={currentLanguage}
                translations={t}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

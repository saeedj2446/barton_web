"use client";

import React from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  TrendingUp,
  DollarSign,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OrderStatsProps {
  stats: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    returned: number;
    totalRevenue: number;
    averageOrder: number;
    todayOrders: number;
  };
  translations: any;
}

export function OrderStats({ stats, translations: t }: OrderStatsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const StatCard = ({ icon, title, value, subtitle, color }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4 mb-8 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
      <StatCard
        icon={<Package className="h-5 w-5 text-blue-600" />}
        title="کل سفارشات"
        value={stats.total}
        color="bg-blue-100"
      />

      <StatCard
        icon={<Clock className="h-5 w-5 text-yellow-600" />}
        title="در انتظار"
        value={stats.pending}
        color="bg-yellow-100"
      />

      <StatCard
        icon={<Package className="h-5 w-5 text-purple-600" />}
        title="در حال پردازش"
        value={stats.processing}
        color="bg-purple-100"
      />

      <StatCard
        icon={<Truck className="h-5 w-5 text-indigo-600" />}
        title="ارسال شده"
        value={stats.shipped}
        color="bg-indigo-100"
      />

      <StatCard
        icon={<CheckCircle className="h-5 w-5 text-green-600" />}
        title="تحویل داده شده"
        value={stats.delivered}
        color="bg-green-100"
      />

      <StatCard
        icon={<XCircle className="h-5 w-5 text-red-600" />}
        title="لغو شده"
        value={stats.cancelled}
        color="bg-red-100"
      />

      <StatCard
        icon={<RotateCcw className="h-5 w-5 text-orange-600" />}
        title="مرجوع شده"
        value={stats.returned}
        color="bg-orange-100"
      />

      <StatCard
        icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
        title="کل درآمد"
        value={formatPrice(stats.totalRevenue)}
        color="bg-emerald-100"
      />

      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-cyan-600" />}
        title="میانگین سفارش"
        value={formatPrice(stats.averageOrder)}
        color="bg-cyan-100"
      />
    </div>
  );
}

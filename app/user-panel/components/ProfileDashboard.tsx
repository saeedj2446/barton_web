"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  ShoppingCart,
  Package,
  FileText,
  TrendingUp,
  Plus,
} from "lucide-react";

interface Profile {
  id: string;
  name: string;
  type: "personal" | "business";
  avatar: string;
  stats: {
    purchases: number;
    sales: number;
    ads: number;
    products: number;
    orders: number;
  };
}

interface ProfileDashboardProps {
  selectedProfile: Profile | null;
  currentLanguage: { direction: "ltr" | "rtl"; code: string };
  translations: any;
  onCreateSellAd?: () => void;
  onCreateBuyRequest?: () => void;
}

export default function ProfileDashboard({
  selectedProfile,
  currentLanguage,
  translations: t,
  onCreateSellAd,
  onCreateBuyRequest,
}: ProfileDashboardProps) {
  const StatCard = ({ icon, title, value, subtitle }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
      <CardContent className="p-6">
        <div
          className={`flex items-center justify-between ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ icon, title, description, onClick }: any) => (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );

  if (!selectedProfile) {
    return (
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.selectProfile}
          </h3>
          <p className="text-gray-600">{t.createFirstProfile}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Dashboard Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedProfile.name}
        </h2>
        <p className="text-gray-600">
          {selectedProfile.type === "business"
            ? t.businessProfile
            : t.personalProfile}{" "}
          {t.dashboard}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          title={t.purchases}
          value={selectedProfile.stats.purchases}
          subtitle={`${t.thisMonth}: 3`}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          title={t.sales}
          value={selectedProfile.stats.sales}
          subtitle={`${t.totalValue}: $12,500`}
        />
        <StatCard
          icon={<FileText className="w-6 h-6 text-purple-600" />}
          title={t.ads}
          value={selectedProfile.stats.ads}
          subtitle={`${t.active}: ${selectedProfile.stats.ads - 1}`}
        />
        <StatCard
          icon={<Package className="w-6 h-6 text-orange-600" />}
          title={t.products}
          value={selectedProfile.stats.products}
          subtitle={`${t.active}: ${selectedProfile.stats.products - 2}`}
        />
        <StatCard
          icon={<FileText className="w-6 h-6 text-red-600" />}
          title={t.orders}
          value={selectedProfile.stats.orders}
          subtitle={`${t.pending}: 3`}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t.quickActions}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
            icon={<Plus className="w-6 h-6 text-green-600" />}
            title={t.createSellAd}
            description="ثبت آگهی فروش محصولات"
            onClick={onCreateSellAd}
          />
          <QuickActionCard
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
            title={t.createBuyRequest}
            description="ثبت درخواست خرید کالا"
            onClick={onCreateBuyRequest}
          />
          <QuickActionCard
            icon={<Package className="w-6 h-6 text-purple-600" />}
            title={t.manageProducts}
            description="مدیریت کالاها و موجودی"
            onClick={() => (window.location.href = "/user-panel/products")}
          />
          <QuickActionCard
            icon={<FileText className="w-6 h-6 text-orange-600" />}
            title={t.viewOrders}
            description="مشاهده و پیگیری سفارش‌ها"
            onClick={() => (window.location.href = "/user-panel/orders")}
          />
        </div>
      </div>
    </div>
  );
}

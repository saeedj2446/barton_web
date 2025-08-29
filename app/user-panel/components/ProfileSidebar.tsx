"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, Plus } from "lucide-react";

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

interface ProfileSidebarProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onProfileSelect: (profile: Profile) => void;
  onCreateProfile: () => void;
  currentLanguage: { direction: "ltr" | "rtl" };
  translations: any;
}

export default function ProfileSidebar({
  profiles,
  selectedProfile,
  onProfileSelect,
  onCreateProfile,
  currentLanguage,
  translations: t,
}: ProfileSidebarProps) {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle
          className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <User
            className={`w-5 h-5 ${currentLanguage.direction === "rtl" ? "ml-2" : "mr-2"}`}
          />
          {t.myProfiles}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profiles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{t.noProfilesYet}</p>
            <p className="text-sm text-gray-400 mb-4">{t.createFirstProfile}</p>
          </div>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedProfile?.id === profile.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => onProfileSelect(profile)}
            >
              <div
                className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full bg-gray-100"
                />
                <div
                  className={`${currentLanguage.direction === "rtl" ? "mr-3" : "ml-3"}`}
                >
                  <h3 className="font-semibold text-gray-900">
                    {profile.name}
                  </h3>
                  <div
                    className={`flex items-center ${currentLanguage.direction === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    {profile.type === "business" ? (
                      <Building2 className="w-4 h-4 text-blue-600" />
                    ) : (
                      <User className="w-4 h-4 text-green-600" />
                    )}
                    <span
                      className={`text-sm text-gray-600 ${currentLanguage.direction === "rtl" ? "mr-1" : "ml-1"}`}
                    >
                      {profile.type === "business"
                        ? t.businessProfile
                        : t.personalProfile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onCreateProfile}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.createProfile}
        </Button>
      </CardContent>
    </Card>
  );
}

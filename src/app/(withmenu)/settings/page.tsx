"use client";

import { useState } from "react";
import {
  BellIcon,
  ChevronRightIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const menuItems = [
    { label: "Paramètres du Profil", path: "/settings/profile" },
    { label: "Préférences du Compte", path: "/settings/account" },
    { label: "Notifications", path: "/settings/notifications" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      {/* Menu List */}
      <div className="bg-white border rounded-lg shadow-sm divide-y divide-gray-200">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-gray-900 font-medium">{item.label}</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfileSettingsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <ArrowLeftIcon
          className="h-6 w-6 text-gray-600 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-bold">Paramètres du Profil</h1>
      </div>

      {/* Content */}
      <div className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Modifier les informations de profil
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              type="email"
              placeholder="example@company.com"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

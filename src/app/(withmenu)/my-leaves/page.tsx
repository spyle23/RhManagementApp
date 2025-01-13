"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Role } from "@/types/user";
import { CalendarIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import RequestLeaveForm from "./components/RequestLeaveForm";

type Leave = {
  id: string;
  type: "Congé payé" | "Maladie" | "RTT" | "Autre";
  startDate: string;
  endDate: string;
  status: "En attente" | "Approuvé" | "Refusé";
  reason: string;
  duration: number;
};

export default function MyLeavesPage() {
  const [role] = useState<Role>("Manager");
  const [showForm, setShowForm] = useState(false);
  const [leaves] = useState<Leave[]>([
    {
      id: "1",
      type: "Congé payé",
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      status: "Approuvé",
      reason: "Vacances d'été",
      duration: 11,
    },
    {
      id: "2",
      type: "RTT",
      startDate: "2024-03-10",
      endDate: "2024-03-10",
      status: "En attente",
      reason: "RTT",
      duration: 1,
    },
  ]);

  return (
    <>
      {showForm && <RequestLeaveForm onClose={() => setShowForm(false)} />}
      <DashboardLayout role={role}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mes Congés</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nouvelle demande
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Congés Restants
                  </p>
                  <p className="text-2xl font-semibold">18 jours</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    RTT Restants
                  </p>
                  <p className="text-2xl font-semibold">5 jours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leaves List */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Période
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raison
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {leave.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {leave.startDate} - {leave.endDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.duration} jour{leave.duration > 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            leave.status === "Approuvé"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "En attente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

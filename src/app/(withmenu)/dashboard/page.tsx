"use client";

import { useEffect, useState } from "react";
import {
  UsersIcon,
  BriefcaseIcon,
  CalendarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Role } from "@/types/user";
import { useApplication } from "@/store/useApplication";
import GetStats from "@/api/stats/GetStats";

// Types pour les statistiques
type StatCard = {
  id: string;
  name: string;
  value: string;
  icon: any;
  change: string;
  trend: "up" | "down";
};

// Types pour les activités récentes
type Activity = {
  id: string;
  user: string;
  type: string;
  date: string;
  description: string;
};

export default function DashboardPage() {
  const { user } = useApplication();
  const [stats, setStats] = useState<StatCard[]>([]);
  useEffect(() => {
    const getStats = async () => {
      if (user) {
        const getStatistic = new GetStats(user.token);
        const stats = await getStatistic.execute();
        setStats([
          {
            id: "1",
            name: "Employés Total",
            value: stats.currentMonthEmployeeCount.toString(),
            icon: UsersIcon,
            change: `${stats.employeeGrowthRate} %`,
            trend: stats.employeeGrowthRate >= 0 ? "up" : "down",
          },
          {
            id: "2",
            name: "Congés en Attente",
            value: `${stats.currentPendingLeavesCount}`,
            icon: CalendarIcon,
            change: `${stats.pendingLeavesRate} %`,
            trend: stats.pendingLeavesRate >= 0 ? "up" : "down",
          },
        ]);
      }
    };
    getStats();
  }, [user]);

  const [recentActivity] = useState<Activity[]>([
    {
      id: "1",
      user: "Marie Laurent",
      type: "Congé",
      date: "2 heures",
      description: "A soumis une demande de congés",
    },
    {
      id: "2",
      user: "Thomas Martin",
      type: "Recrutement",
      date: "5 heures",
      description: "Nouveau développeur recruté",
    },
    {
      id: "3",
      user: "Sophie Dubois",
      type: "Formation",
      date: "1 jour",
      description: "Formation RGPD complétée",
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de Bord RH</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <stat.icon className="h-6 w-6 text-primary-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500"> vs mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activités Récentes */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Activités Récentes
        </h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {activity.type}
                    </span>
                  </div>
                  <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                    Il y a {activity.date}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

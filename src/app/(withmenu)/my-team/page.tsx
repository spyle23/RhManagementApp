"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Role } from "@/types/user";
import { UsersIcon, UserGroupIcon, BriefcaseIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
// import { Users, BarChart } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  email: string;
  status: "Available" | "In Meeting" | "On Leave" | "Busy";
  currentTask: string;
};

type Team = {
  id: string;
  name: string;
  speciality: string;
  membersCount: number;
  manager: string;
};

export default function TeamPage() {
  const [role] = useState<Role>("Manager");
  const [team] = useState<Team>({
    id: "1",
    name: "Frontend Team",
    speciality: "React, NextJS, TypeScript",
    membersCount: 8,
    manager: "Sophie Dubois"
  });

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sophie Dubois",
      position: "Developer",
      email: "sophie.dubois@company.com",
      status: "Available",
      currentTask: "Feature Development",
    },
    {
      id: "2",
      name: "Lucas Bernard",
      position: "Designer",
      email: "lucas.bernard@company.com",
      status: "In Meeting",
      currentTask: "UI Design Review",
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion d'Équipe</h1>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <HomeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Nom de l'équipe</p>
              <p className="text-2xl font-semibold">{team.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Spécialité</p>
              <p className="text-2xl font-semibold">{team.speciality}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Membres d'équipe</p>
              <p className="text-2xl font-semibold">{team.membersCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-700">Manager d'équipe</p>
            <p>{team.manager}</p>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tâche Actuelle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-blue-700 font-medium">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : member.status === "In Meeting"
                          ? "bg-yellow-100 text-yellow-800"
                          : member.status === "On Leave"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.currentTask}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

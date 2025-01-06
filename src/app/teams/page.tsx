"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

type Team = {
  id: string;
  name: string;
  speciality: string;
  manager: string;
  managerEmail: string;
  createdDate: string;
  membersCount: number;
};

export default function TeamsListPage() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [teams] = useState<Team[]>([
    {
      id: "1",
      name: "Frontend Team",
      speciality: "React, NextJS, TypeScript",
      manager: "Sophie Dubois",
      managerEmail: "sophie.dubois@company.com",
      createdDate: "2023-06-15",
      membersCount: 8,
    },
    {
      id: "2",
      name: "Backend Team",
      speciality: "Node.js, Python, AWS",
      manager: "Thomas Martin",
      managerEmail: "thomas.martin@company.com",
      createdDate: "2023-04-20",
      membersCount: 6,
    },
    {
      id: "3",
      name: "Design Team",
      speciality: "UI/UX, Figma, Design Systems",
      manager: "Marie Laurent",
      managerEmail: "marie.laurent@company.com",
      createdDate: "2023-08-01",
      membersCount: 5,
    },
    {
      id: "4",
      name: "Data Science Team",
      speciality: "ML, AI, Data Analytics",
      manager: "Lucas Bernard",
      managerEmail: "lucas.bernard@company.com",
      createdDate: "2023-09-10",
      membersCount: 7,
    },
  ]);

  const handleAction = (action: string, teamId: string) => {
    console.log(`Action ${action} on team ${teamId}`);
    setOpenMenuId(null);
  };

  return (
    <DashboardLayout role="Manager">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Équipes</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Nouvelle équipe
          </button>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header with name and menu */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {team.name}
                  </h3>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === team.id ? null : team.id)
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === team.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction("edit", team.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <PencilSquareIcon className="h-4 w-4 mr-2" />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleAction("delete", team.id)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Details */}
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Spécialité</p>
                    <p>{team.speciality}</p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Manager</p>
                    <p>{team.manager}</p>
                    <p className="text-xs">{team.managerEmail}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="h-5 w-5 mr-2 text-blue-600" />
                      <span>{team.membersCount} membres</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Créée le{" "}
                      {new Date(team.createdDate).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

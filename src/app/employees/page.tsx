"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Role } from "@/types/user";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  status: "Active" | "On Leave" | "Inactive";
};

export default function EmployeesPage() {
  const [role] = useState<Role>("RH");
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Marie Laurent",
      email: "marie.laurent@company.com",
      department: "Engineering",
      position: "Senior Developer",
      startDate: "2022-03-15",
      status: "Active",
    },
    {
      id: "2",
      name: "Thomas Martin",
      email: "thomas.martin@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      startDate: "2021-06-20",
      status: "On Leave",
    },
  ]);

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Employés</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusIcon className="h-5 w-5 mr-2" />
            Ajouter un employé
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employé
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Département
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'entrée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <span className="text-blue-700 font-medium">
                              {employee.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
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
  );
}

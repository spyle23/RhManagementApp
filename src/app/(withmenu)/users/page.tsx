"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { PlusIcon } from "@heroicons/react/24/outline";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const roles = ["Admin", "Manager", "Employee", "RH"];

const getRoleClass = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800";
    case "Manager":
      return "bg-yellow-100 text-yellow-800";
    case "Employee":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRoleEmoji = (role: string) => {
  switch (role) {
    case "Admin":
      return "👑"; // Crown emoji for Admin
    case "Manager":
      return "👔"; // Necktie emoji for Manager
    case "Employee":
      return "👤"; // Person emoji for Employee
    case "RH":
      return "🧑‍💼"; // Office worker emoji for RH
    default:
      return "❓"; // Question mark emoji for unknown roles
  }
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Marie Laurent",
      email: "marie.laurent@company.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Thomas Martin",
      email: "thomas.martin@company.com",
      role: "Manager",
    },
    {
      id: "3",
      name: "Sophie Dubois",
      email: "sophie.dubois@company.com",
      role: "Employee",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: roles[0],
  });

  const handleCreateUser = () => {
    const newUserData = {
      id: (users.length + 1).toString(),
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role,
    };
    setUsers([...users, newUserData]);
    setShowModal(false);
    setNewUser({ firstName: "", lastName: "", email: "", role: roles[0] });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* Users List */}
      <div className="mt-5 bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-blue-700 font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(
                        user.role
                      )}`}
                    >
                      {getRoleEmoji(user.role)} {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for creating a new user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Nouvel Utilisateur</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom de famille
                </label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rôle
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 block px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

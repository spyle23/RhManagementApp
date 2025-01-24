"use client";

import { ChangeEvent, useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { BaseAction, UserFilters } from "@/types/query";
import { UserHandler } from "@/utils/UserHandler";
import { useGenericFilters } from "@/hook/useGenericFilters";
import GetUsersByFilters from "@/api/auth/GetUsersByFilters";
import { UserRoles } from "@/types/user";
import { BasePagination } from "@/components/pagination/BasePagination";
import { AddUserModal } from "./components/AddUserModal";
import { roles } from "@/constants/roles";

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

const reducerFilters = (state: UserFilters, action: BaseAction) =>
  UserHandler[action.type] ? UserHandler[action.type](state, action) : state;

const initialState: UserFilters = {
  pageNumber: 1,
  pageSize: 10,
};

export default function UsersPage() {
  const { data, loading, dispatchFilters, stateFilters, addItem, updateItem } =
    useGenericFilters<UserFilters, UserRoles, GetUsersByFilters>(
      reducerFilters,
      initialState,
      GetUsersByFilters
    );

  const [showModal, setShowModal] = useState(false);
  const [currUser, setCurrUser] = useState<UserRoles>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilters({ type: "searchUser", value: e.target.value });
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterRole", value: e.target.value });
  };

  const showUpdate = (user: UserRoles) => {
    setCurrUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrUser(undefined);
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

      <div className="mt-5 flex items-center">
        <input
          type="text"
          placeholder="Rechercher par nom ou email"
          value={stateFilters.searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 mr-2 w-full max-w-xs"
        />
        <select
          value={stateFilters.role}
          onChange={handleRoleChange}
          className="border rounded-md p-2 mr-2"
        >
          <option value={""}>Filtre rôle</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {/* <button
          onClick={() => {
            dispatchFilters({ type: "applyFilters", value: undefined });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Appliquer les filtres
        </button> */}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="mt-5">Loading...</div> // Replace with a skeleton component if available
      ) : (
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
                    Cin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.datas.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                            {user.picture ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${user.picture}`}
                                alt="avatar"
                                className="w-full rounded-full"
                              />
                            ) : (
                              <span className="text-blue-700 font-medium">
                                {user.firstName.charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.cin}</td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(
                          user.role
                        )}`}
                      >
                        {getRoleEmoji(user.role)} {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role !== "Admin" && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => showUpdate(user)}
                            className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            // onClick={}
                            className="p-1 rounded-full hover:bg-gray-100 text-red-600"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <BasePagination
            currPage={stateFilters.pageNumber}
            onGoToSpecificPage={(v) =>
              dispatchFilters({ type: "goSpecificPage", value: v })
            }
            onNext={() => dispatchFilters({ type: "goNext", value: undefined })}
            onPrev={() => dispatchFilters({ type: "goPrev", value: undefined })}
            totalPage={data.totalPage}
          />
        </div>
      )}

      {/* Modal for creating a new user */}
      {showModal && (
        <AddUserModal
          onClose={handleClose}
          onCreateUser={currUser ? updateItem : addItem}
          user={currUser}
        />
      )}
    </div>
  );
}

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
import { useTeamFilters } from "@/hook/team/useTeamFilters";
import { TeamCardSkeleton } from "@/components/Skeleton/TeamCardSkeleton";
import { CreateTeamModal } from "./components/CreateTeamModal";
import { TeamWithManagerDetails } from "@/types/team";
import GetManagerList from "@/api/team/GetManagerList";
import { useApplication } from "@/store/useApplication";
import { UserHeader } from "@/types/user";
import CreateTeam from "@/api/team/CreateTeam";
import UpdateTeam from "@/api/team/UpdateTeam";
import { DeleteTeamModal } from "./components/DeleteTeamModal";
import { AddMembersModal } from "./components/AddMembersModal";
import AddEmployeesToTeam from "@/api/team/AddEmployeesToTeam";

export default function TeamsListPage() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currTeam, setCurrTeam] = useState<TeamWithManagerDetails>();
  const [managers, setManagers] = useState<UserHeader[]>([]);
  const { data, loading, addItem, updateItem, deleteItem, addMembers } =
    useTeamFilters();
  const { user } = useApplication();
  const [deleteModal, setDeleteModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);

  const handleManage = async (team?: TeamWithManagerDetails) => {
    const getManagerList = new GetManagerList(user?.token);
    const vals = await getManagerList.execute();
    if (team) {
      setCurrTeam(team);
    }
    setManagers(vals);
    setShowCreateModal(true);
    setOpenMenuId(null);
  };

  const handleClose = () => {
    setCurrTeam(undefined);
    setShowCreateModal(false);
  };

  const handleProceed = async (val: any) => {
    const proceedFn = currTeam
      ? new UpdateTeam(user?.token)
      : new CreateTeam(user?.token);
    const newVal = await proceedFn.execute(
      currTeam ? { ...val, id: currTeam.id } : val
    );
    if (newVal) {
      currTeam ? updateItem(newVal) : addItem(newVal);
    }
  };

  const confirmDelete = (team: TeamWithManagerDetails) => {
    setCurrTeam(team);
    setDeleteModal(true);
    setOpenMenuId(null);
  };

  const handleAddMembers = async (teamId: number, employeeIds: number[]) => {
    try {
      const addEmployees = new AddEmployeesToTeam(user?.token);
      await addEmployees.execute({ teamId, employeeIds });
      addMembers(teamId, employeeIds);
      // console.log(result.message);
    } catch (error) {
      console.error("Error adding employees:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Team Modal */}
      {showCreateModal && (
        <CreateTeamModal
          onProceed={handleProceed}
          onClose={handleClose}
          managers={managers}
          currTeam={currTeam}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Équipes</h1>
        <button
          onClick={() => handleManage()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Nouvelle équipe
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TeamCardSkeleton key={index} />
          ))
        ) : data.datas.length === 0 ? (
          <div className="text-center text-gray-500">Aucune équipe trouvée</div>
        ) : (
          data.datas.map((team) => (
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
                        setOpenMenuId(
                          openMenuId === `${team.id}` ? null : `${team.id}`
                        )
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === team.id.toString() && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleManage(team)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <PencilSquareIcon className="h-4 w-4 mr-2" />
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              setCurrTeam(team);
                              setShowAddMembersModal(true);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Ajouter des membres
                          </button>
                          <button
                            onClick={() => confirmDelete(team)}
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
                    <p>{team.specialty}</p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Manager</p>
                    <p>{`${team.managerFirstName} ${team.managerLastName}`}</p>
                    <p className="text-xs">{team.managerEmail}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="h-5 w-5 mr-2 text-blue-600" />
                      <span>{team.memberCount} membres</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Créée le{" "}
                      {new Date(team.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteModal && currTeam && (
        <DeleteTeamModal
          onClose={() => setDeleteModal(false)}
          onDelete={(team) => {
            // Add your delete logic here
            deleteItem(team);
            setDeleteModal(false);
          }}
          team={currTeam}
        />
      )}

      {showAddMembersModal && currTeam && (
        <AddMembersModal
          onClose={() => setShowAddMembersModal(false)}
          onAddMembers={(employeeIds) =>
            handleAddMembers(currTeam.id, employeeIds)
          }
          teamId={currTeam.id}
        />
      )}
    </div>
  );
}

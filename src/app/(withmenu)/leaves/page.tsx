"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { RequestLeaveForm } from "@/app/(withmenu)/my-leaves/components/RequestLeaveForm";
import {
  LeaveDetails,
  LeaveForm,
  LeaveResult,
  LeaveStatus,
  LeaveType,
  SoldLeave,
} from "@/types/leave";
import { useApplication } from "@/store/useApplication";
import { useLeaveFilter } from "@/hook/leave/useLeaveFilter";
import { calculDuration } from "@/utils/duration";
import CreateLeave from "@/api/leaves/CreateLeave";
import { DeleteLeaveModal } from "@/app/(withmenu)/my-leaves/components/DeleteLeaveModal";
import { BasePagination } from "@/components/pagination/BasePagination";
import { useAdminLeaveFilter } from "@/hook/leave/useAdminLeaveFilters";
import { ValidateLeaveModal } from "./components/ValidateLeaveModal";
import ValidateAdminLeave from "@/api/leaves/ValidateAdminLeave";
import GetDetailsLeave from "@/api/leaves/GetDetailsLeave";
import { ViewLeaveModal } from "./components/ViewLeaveModal";

type IActionModal = {
  value: boolean;
  type: "validate" | "reject";
};

export default function LeavesPage() {
  const [currLeave, setCurrLeave] = useState<LeaveResult>();
  const [actionModal, setActionModal] = useState<IActionModal>();
  const { user } = useApplication();
  const [actionLoading, setActionLoading] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetails>();
  const [viewModal, setViewModal] = useState(false);

  const {
    data,
    loading,
    stateFilters,
    dispatchFilters,
    changeStatusAfterAction,
  } = useAdminLeaveFilter();

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterStatus", value: e.target.value });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterType", value: e.target.value });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilters({ type: "search", value: e.target.value });
  };

  const handleApprove = (leave: LeaveResult) => {
    // Add your approval logic here
    setCurrLeave(leave);
    setActionModal({ type: "validate", value: true });
  };

  const handleReject = (leave: LeaveResult) => {
    // Add your rejection logic here
    setCurrLeave(leave);
    setActionModal({ type: "reject", value: true });
  };

  const handleAction = async () => {
    try {
      setActionLoading(true);
      if (user?.token && currLeave) {
        const validateLeaveAdmin = new ValidateAdminLeave(user.token);
        const leave = await validateLeaveAdmin.execute({
          id: currLeave.id,
          status:
            actionModal?.type === "validate"
              ? LeaveStatus.Approved
              : LeaveStatus.Rejected,
        });
        if (leave) {
          changeStatusAfterAction(leave);
        }
      }
    } catch (error) {
    } finally {
      setActionLoading(false);
      closeActionModal();
    }
  };

  const closeActionModal = () => {
    setCurrLeave(undefined);
    setActionModal(undefined);
  };

  const handleView = async (leave: LeaveResult) => {
    try {
      if (user?.token) {
        const getDetails = new GetDetailsLeave(user.token);
        const details = await getDetails.execute(leave.id);
        setLeaveDetails(details);
        setViewModal(true);
      }
    } catch (error) {
      console.error("Error fetching leave details:", error);
    }
  };

  return (
    <>
      {actionModal?.value && currLeave && (
        <ValidateLeaveModal
          onClose={closeActionModal}
          type={actionModal.type}
          onAction={handleAction}
          leave={currLeave}
          actionLoading={actionLoading}
        />
      )}
      {viewModal && leaveDetails && (
        <ViewLeaveModal
          onClose={() => {
            setViewModal(false);
            setLeaveDetails(undefined);
          }}
          leave={leaveDetails}
        />
      )}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Congés</h1>
        </div>

        {/* Filters */}
        <div className="mt-5 flex items-center">
          <input
            type="text"
            value={stateFilters.searchTerm || ""}
            onChange={handleSearchChange}
            placeholder="Rechercher un employé..."
            className="border rounded-md p-2 mr-2 w-64"
          />
          <select
            value={stateFilters.status}
            onChange={handleStatusChange}
            className="border rounded-md p-2 mr-2"
          >
            <option value={""}>Filtre status</option>
            {[
              LeaveStatus.Approved,
              LeaveStatus.Pending,
              LeaveStatus.Rejected,
            ].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            value={stateFilters.type}
            onChange={handleTypeChange}
            className="border rounded-md p-2 mr-2"
          >
            <option value={""}>Filtre type</option>
            {[LeaveType.holiday, LeaveType.permission].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Leaves List */}
        {loading ? (
          <div className="mt-5">Loading...</div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type de congé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de départ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de retour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raison
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom de l'employé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.datas.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {leave.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(leave.startDate).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(leave.endDate).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculDuration(
                          new Date(leave.startDate),
                          new Date(leave.endDate)
                        )}{" "}
                        jours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.firstName} {leave.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            leave.status === LeaveStatus.Approved
                              ? "bg-green-100 text-green-800"
                              : leave.status === LeaveStatus.Pending
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {leave.status === LeaveStatus.Pending && (
                            <>
                              <button
                                onClick={() => handleApprove(leave)}
                                className="p-1 rounded-full hover:bg-gray-100 text-green-600"
                                title="Approve"
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleReject(leave)}
                                className="p-1 rounded-full hover:bg-gray-100 text-red-600"
                                title="Reject"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleView(leave)}
                            className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                            title="View Details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <BasePagination
              currPage={stateFilters.pageNumber}
              onGoToSpecificPage={(v) =>
                dispatchFilters({ type: "goSpecificPage", value: v })
              }
              onNext={() =>
                dispatchFilters({ type: "goNext", value: undefined })
              }
              onPrev={() =>
                dispatchFilters({ type: "goPrev", value: undefined })
              }
              totalPage={data.totalPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

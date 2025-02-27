"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { RequestLeaveForm } from "./components/RequestLeaveForm";
import {
  LeaveForm,
  LeaveResult,
  LeaveStatus,
  LeaveType,
  SoldLeave,
} from "@/types/leave";
import { useApplication } from "@/store/useApplication";
import GetSoldLeave from "@/api/leaves/GetSoldLeave";
import { useLeaveFilter } from "@/hook/leave/useLeaveFilter";
import { calculDuration } from "@/utils/duration";
import CreateLeave from "@/api/leaves/CreateLeave";
import { DeleteLeaveModal } from "./components/DeleteLeaveModal";
import { BasePagination } from "@/components/pagination/BasePagination";
import { LeavesSkeleton } from "@/components/Skeleton/LeavesSkeleton";

export default function MyLeavesPage() {
  const [sold, setSold] = useState<SoldLeave>({
    balancePermission: 0,
    holidayBalance: 0,
  });
  const [currLeave, setCurrLeave] = useState<LeaveResult>();
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { user } = useApplication();

  const {
    data,
    addItem,
    updateItem,
    deleteItem,
    loading,
    stateFilters,
    dispatchFilters,
  } = useLeaveFilter();

  useEffect(() => {
    const getSoldLeave = async () => {
      if (user?.token) {
        const getSold = new GetSoldLeave(user.token);
        const soldLeave = await getSold.execute();
        setSold(soldLeave);
      }
    };
    getSoldLeave();
  }, [user]);

  const showUpdate = (leave: LeaveResult) => {
    setUpdateModal(true);
    setCurrLeave(leave);
  };

  const showDelete = (leave: LeaveResult) => {
    setDeleteModal(true);
    setCurrLeave(leave);
  };

  const handleSubmit = async (val: LeaveForm) => {
    try {
      // voir si la durée ne dépasse pas le solde de congé en fonction du type de congé
      const duration = calculDuration(
        new Date(val.startDate!),
        new Date(val.endDate!)
      );

      const condition =
        val.type === LeaveType.holiday
          ? sold.holidayBalance - duration
          : sold.balancePermission - duration;
      if (condition < 0) {
        alert(`Les soldes sont inssufisants`);
        return;
      }

      const submitFn = new CreateLeave(user?.token);
      const createdLeave = await submitFn.execute({
        ...val,
        id: currLeave ? currLeave.id : null,
        adminId: Number(val.adminId),
        employeeId: user!.userId,
      });

      setSold((curr) => ({
        balancePermission:
          val.type === LeaveType.permission
            ? condition
            : curr.balancePermission,
        holidayBalance:
          val.type === LeaveType.holiday ? condition : curr.holidayBalance,
      }));

      currLeave ? updateItem(createdLeave) : addItem(createdLeave);
    } catch (error) {
      alert((error as any).message);
    }
  };

  const handleClose = () => {
    setCurrLeave(undefined);
    setUpdateModal(false);
  };

  const closeDeleteModal = () => {
    setCurrLeave(undefined);
    setDeleteModal(false);
  };

  const handleDeleteLeave = (leave: LeaveResult) => {
    const duration = calculDuration(
      new Date(leave.startDate!),
      new Date(leave.endDate!)
    );
    setSold((curr) => ({
      balancePermission:
        leave.type === LeaveType.permission
          ? curr.balancePermission + duration
          : curr.balancePermission,
      holidayBalance:
        leave.type === LeaveType.holiday
          ? curr.holidayBalance + duration
          : curr.holidayBalance,
    }));
    deleteItem(leave);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterStatus", value: e.target.value });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterType", value: e.target.value });
  };
  return (
    <>
      {updateModal && (
        <RequestLeaveForm
          currLeave={currLeave}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
      {deleteModal && currLeave && (
        <DeleteLeaveModal
          onClose={closeDeleteModal}
          onDelete={handleDeleteLeave}
          leave={currLeave}
        />
      )}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mes Congés</h1>
          <button
            onClick={() => setUpdateModal(true)}
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
                <p className="text-2xl font-semibold">
                  {sold.holidayBalance} jours
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Permissions Restantes
                </p>
                <p className="text-2xl font-semibold">
                  {sold.balancePermission} jours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex items-center">
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
          {/* <button
          onClick={() => {
            dispatchFilters({ type: "applyFilters", value: undefined });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Appliquer les filtres
        </button> */}
        </div>

        {/* Leaves List */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            {loading ? (
              <LeavesSkeleton />
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
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
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {new Date(leave.startDate).toLocaleDateString(
                              ["fr"],
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {new Date(leave.endDate).toLocaleDateString(
                              ["fr"],
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
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
                        {leave.rhStatus === LeaveStatus.Pending && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => showUpdate(leave)}
                              className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => showDelete(leave)}
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
            )}
          </div>
        </div>
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
    </>
  );
}

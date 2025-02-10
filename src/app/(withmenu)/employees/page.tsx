"use client";

import GetEmployeeList from "@/api/employee/GetEmployeeList";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApplication } from "@/store/useApplication";
import { Role, UserHeader } from "@/types/user";
import {
  PlusIcon,
  DocumentArrowDownIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useState, ChangeEvent } from "react";
import { EmployeeRecordForm } from "./components/EmployeeRecordForm";
import {
  CreateEmployeeRecordDto,
  EmployeeRecordDto,
  EmployeeStatus,
} from "@/types/employeeRecord";
import { useEmployeeRecordFilters } from "@/hook/employeeRecord/useEmployeeRecord";
import CreateEmployeeRecord from "@/api/employee/CreateEmployeeRecord";
import UpdateEmployeeRecord from "@/api/employee/UpdateEmployeeRecord";
import DownloadEmployeeRecord from "@/api/employee/DownloadEmployeeRecord";
import DownloadEmployeeCV from "@/api/employee/DownloadEmployeeCV";
import GetEmployeeRecordId from "@/api/employee/GetEmployeeRecordId";
import { EmployeesSkeleton } from "@/components/Skeleton/EmployeesSkeleton";
import { BasePagination } from "@/components/pagination/BasePagination";

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
  const [employees, setEmployees] = useState<UserHeader[]>([]);
  const [manageModal, setManageModal] = useState<boolean>(false);
  const [currEmployee, setCurrEmployee] = useState<EmployeeRecordDto>();
  const { user } = useApplication();

  const { data, loading, addItem, updateItem, stateFilters, dispatchFilters } =
    useEmployeeRecordFilters();

  const handleManageEmployee = async () => {
    if (user?.token) {
      const getEmployees = new GetEmployeeList(user.token);
      const values = await getEmployees.execute();
      setEmployees(values);
      setManageModal(true);
    }
  };

  const handleClose = () => {
    setManageModal(false);
    setCurrEmployee(undefined);
  };

  const handleSubmit = async (
    data: CreateEmployeeRecordDto & { file: File | null }
  ) => {
    if (user) {
      const createEmployeeRecord = new CreateEmployeeRecord(user.token);
      const updateEmployeeRecord = new UpdateEmployeeRecord(user.token);

      const valEmployee = currEmployee
        ? await updateEmployeeRecord.execute({ id: currEmployee.id, data })
        : await createEmployeeRecord.execute(data);

      currEmployee ? updateItem(valEmployee) : addItem(valEmployee);
      handleClose();
    }
  };

  const handleDownloadRecord = async (employee: EmployeeRecordDto) => {
    try {
      if (user?.token) {
        const downloadRecord = new DownloadEmployeeRecord(user.token);
        const blob = await downloadRecord.execute(employee.id);

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `employee_record_${employee.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading record:", error);
    }
  };

  const handleDownloadCV = async (employee: EmployeeRecordDto) => {
    try {
      if (user?.token) {
        const downloadCV = new DownloadEmployeeCV(user.token);
        const blob = await downloadCV.execute(employee.cv);

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `employee_cv_${employee.employee.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };

  const handleUpdateRecord = async (employeeRecordId: number) => {
    const getEmployeeRecordId = new GetEmployeeRecordId(user?.token);
    const getEmployees = new GetEmployeeList(user?.token);
    const [employeeRecord, values] = await Promise.all([
      getEmployeeRecordId.execute(employeeRecordId),
      getEmployees.execute(),
    ]);
    setCurrEmployee(employeeRecord);
    setEmployees(values);
    setManageModal(true);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({ type: "filterStatus", value: e.target.value });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilters({ type: "search", value: e.target.value });
  };

  return (
    <>
      {manageModal && (
        <EmployeeRecordForm
          employees={employees}
          onClose={handleClose}
          onSubmit={handleSubmit}
          employee={currEmployee}
        />
      )}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {["Admin", "RH"].includes(user?.role as string)
              ? "Gestion des Employés"
              : "Liste des collaborateurs"}
          </h1>
          {["Admin", "RH"].includes(user?.role as string) && (
            <button
              onClick={handleManageEmployee}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter une fiche employée
            </button>
          )}
        </div>

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
            <option value="">Filtre status</option>
            {Object.values(EmployeeStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            {loading ? (
              <EmployeesSkeleton />
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Poste
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de naissance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    {["Admin", "RH"].includes(user?.role as string) && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.datas.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                              {employee.employee.picture ? (
                                <img
                                  src={new URL(
                                    employee.employee.picture,
                                    process.env.NEXT_PUBLIC_IMAGE_URI
                                  ).toString()}
                                  alt="avatar"
                                  className="w-full rounded-full"
                                />
                              ) : (
                                <span className="text-blue-700 font-medium">
                                  {employee.employee.firstName.charAt(0)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.employee.firstName}{" "}
                              {employee.employee.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.telephone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.adresse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.profil}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.poste}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.birthday).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            employee.status === EmployeeStatus.active
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      {["Admin", "RH"].includes(user?.role as string) && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDownloadRecord(employee)}
                              className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                              title="Télécharger la fiche employée"
                            >
                              <DocumentArrowDownIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleUpdateRecord(employee.id)}
                              className="p-1 rounded-full hover:bg-gray-100 text-green-600"
                              title="Modifier la fiche employée"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDownloadCV(employee)}
                              className="p-1 rounded-full hover:bg-gray-100 text-purple-600"
                              title="Télécharger le CV"
                            >
                              <DocumentTextIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      )}
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

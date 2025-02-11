"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserHeader } from "@/types/user";
import GetEmployeeList from "@/api/employee/GetEmployeeList";
import { useApplication } from "@/store/useApplication";
import GetOnlyEmployees from "@/api/employee/GetOnlyEmployees";

type AddMembersModalProps = {
  onClose: () => void;
  onAddMembers: (employeeIds: number[]) => void;
  teamId: number;
};

export function AddMembersModal({
  onClose,
  onAddMembers,
  teamId,
}: AddMembersModalProps) {
  const { user } = useApplication();
  const [employees, setEmployees] = useState<UserHeader[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    if (user?.token) {
      const getEmployees = new GetOnlyEmployees(user.token);
      const data = await getEmployees.execute({ search });
      setEmployees(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [user]);

  const handleCheckboxChange = (employeeId: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleAddMembers = () => {
    onAddMembers(selectedEmployees);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Ajouter des membres</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Rechercher des employés..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={() => fetchEmployees()}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div>Chargement...</div>
            ) : (
              employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center p-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      {employee.picture ? (
                        <img
                          src={new URL(
                            employee.picture,
                            process.env.NEXT_PUBLIC_IMAGE_URI
                          ).toString()}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-700 font-medium">
                          {employee.firstName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            onClick={handleAddMembers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

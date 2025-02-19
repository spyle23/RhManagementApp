"use client";

import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LeaveDetails } from "@/types/leave";

type ViewLeaveModalProps = {
  onClose: () => void;
  leave: LeaveDetails;
};

export const ViewLeaveModal: FC<ViewLeaveModalProps> = ({ onClose, leave }) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Détails du congé</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Employé</h3>
            <p className="mt-1 text-sm text-gray-900">
              {leave.firstName} {leave.lastName}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Type de congé</h3>
            <p className="mt-1 text-sm text-gray-900">{leave.type}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Période</h3>
            <p className="mt-1 text-sm text-gray-900">
              Du {new Date(leave.startDate).toLocaleDateString("fr-FR")} au{" "}
              {new Date(leave.endDate).toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Statut</h3>
            <p className="mt-1 text-sm text-gray-900">{leave.status}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Motif</h3>
            <p className="mt-1 text-sm text-gray-900">{leave.reason}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Solde congé payé</h3>
            <p className="mt-1 text-sm text-gray-900">
              {leave.holidayBalance} jours
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Solde permission</h3>
            <p className="mt-1 text-sm text-gray-900">
              {leave.balancePermission} jours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 
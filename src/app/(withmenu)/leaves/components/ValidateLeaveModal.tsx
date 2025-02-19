"use client";

import { FC } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { LeaveResult } from "@/types/leave";

type ValidateModalProps = {
  onClose: () => void;
  onAction: () => Promise<void>;
  leave: LeaveResult;
  type: "validate" | "reject";
  actionLoading: boolean;
};

export const ValidateLeaveModal: FC<ValidateModalProps> = ({
  onClose,
  onAction,
  leave,
  type,
  actionLoading,
}) => {
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
        <div className="flex items-center justify-center mb-4">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            {type === "validate" ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {type === "validate" ? "Valider" : "Rejeter"} la demande de congé ?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Êtes-vous sûr de vouloir{" "}
            {type === "validate" ? "valider" : "rejeter"} la demande de congé de{" "}
            {leave.firstName} {leave.lastName} ?
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onAction}
            disabled={actionLoading}
            className={`px-4 py-2 text-white rounded-md text-sm font-medium ${
              actionLoading
                ? "bg-gray-400"
                : type === "validate"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } `}
          >
            {actionLoading
              ? "chargement..."
              : type === "validate"
              ? "Valider"
              : "Rejeter"}
          </button>
        </div>
      </div>
    </div>
  );
};

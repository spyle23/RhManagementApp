"use client";

import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type LeaveType = "Congé payé" | "Maladie" | "RTT" | "Autre";

export default function RequestLeaveForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    type: "Congé payé" as LeaveType,
    startDate: "",
    endDate: "",
    reason: "",
    halfDay: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Nouvelle Demande de Congé</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de congé
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as LeaveType })}
              className="w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="Congé payé">Congé payé</option>
              <option value="Maladie">Maladie</option>
              <option value="RTT">RTT</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
                <CalendarIcon className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
                <CalendarIcon className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motif
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Précisez le motif de votre demande..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="halfDay"
              checked={formData.halfDay}
              onChange={(e) => setFormData({ ...formData, halfDay: e.target.checked })}
              className="rounded border-gray-300 text-blue-600"
            />
            <label htmlFor="halfDay" className="ml-2 text-sm text-gray-600">
              Demi-journée
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Soumettre la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState, ChangeEvent } from "react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useApplication } from "@/store/useApplication";
import { usePayslipFilters } from "@/hook/payslip/usePayslipFilters";
import { BasePagination } from "@/components/pagination/BasePagination";
import { PayslipSkeleton } from "@/components/Skeleton/PayslipSkeleton";
import DownloadPayslip from "@/api/payslip/DownloadPayslip";

export default function PayslipPage() {
  const { user } = useApplication();
  const { data, loading, stateFilters, dispatchFilters } = usePayslipFilters();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilters({ type: "search", value: e.target.value });
  };

  const handleDownloadPayslip = async (id: number) => {
    try {
      if (user?.token) {
        const downloadPayslip = new DownloadPayslip(user.token);
        const blob = await downloadPayslip.execute(id);

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `payslip_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading payslip:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Bulletins de Paie</h1>

      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des bulletins..."
          className="border p-2 rounded"
          onChange={handleSearchChange}
        />
      </div> */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Mois
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Employé
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Salaire Brut
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Salaire Net
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Primes
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Heures Supp
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <PayslipSkeleton key={index} />
              ))
            ) : (
              data.datas.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {new Date(payslip.month).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {payslip.employeeName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {payslip.grossSalary.toFixed(2)} Ar
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {payslip.netSalary.toFixed(2)} Ar
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {payslip.bonuses.toFixed(2)} Ar
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {payslip.overtime} h
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      onClick={() => handleDownloadPayslip(payslip.id)}
                      className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                      title="Télécharger le bulletin"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
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
    </div>
  );
} 